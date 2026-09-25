import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { Resend } from "resend";
import Razorpay from "razorpay";
import crypto from "crypto";
import { priceOrder } from "@/lib/server-pricing";
import { AMOUNT_TOLERANCE_PAISE } from "@/lib/pricing";
import { rateLimit, clientIp } from "@/lib/rate-limit";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Idempotency guard: a retried handler call for the same Razorpay payment
// must not archive twice or resend emails. Per-instance memory (same
// caveat as the rate limiter); signed-in users get a second layer via
// their archive below. For cross-instance guarantees, persist processed
// payment ids (e.g. a KV store).
const PROCESSED_TTL_MS = 60 * 60 * 1000;
const processedPayments = new Map<string, number>();

function pruneProcessed(now: number) {
  for (const [key, seen] of processedPayments) {
    if (now - seen > PROCESSED_TTL_MS) processedPayments.delete(key);
  }
  if (processedPayments.size > 5000) pruneProcessed(now);
}

const fail = (message: string, status: number) =>
  NextResponse.json({ success: false, message }, { status });

export async function POST(request: Request) {
  // Basic abuse protection: 30 verifications per IP per minute.
  if (!rateLimit(`rzp-verify:${clientIp(request)}`, 30, 60_000)) {
    return fail("Too many requests. Please try again shortly.", 429);
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail("Invalid request body.", 400);
  }

  const {
    orderId,
    paymentId,
    signature,
    userId,
    orderPayload,
    customerEmail,
    lines,
    giftWrap,
    shipping,
  } = (body ?? {}) as {
    orderId?: unknown;
    paymentId?: unknown;
    signature?: unknown;
    userId?: unknown;
    orderPayload?: unknown;
    customerEmail?: unknown;
    lines?: unknown;
    giftWrap?: unknown;
    shipping?: unknown;
  };

  if (
    typeof orderId !== "string" ||
    !orderId ||
    typeof paymentId !== "string" ||
    !paymentId ||
    typeof signature !== "string" ||
    !signature
  ) {
    return fail("Missing payment reference.", 400);
  }

  // Caller must be who they claim to be. Guests check out with no userId;
  // a signed-in caller may only ever write to their own archive.
  const { userId: callerId } = await auth();
  if (callerId && typeof userId === "string" && userId && userId !== callerId) {
    return fail("Account mismatch.", 403);
  }
  const effectiveUserId = callerId ?? null;

  const email =
    typeof customerEmail === "string" && EMAIL_RE.test(customerEmail.trim())
      ? customerEmail.trim()
      : null;

  // Strict HMAC verification — no environment bypasses. Fail closed.
  const secret = process.env.RAZORPAY_KEY_SECRET || "";
  const generatedSignature = crypto
    .createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  if (!secret || generatedSignature !== signature) {
    return fail("Payment verification failed. Please contact support.", 400);
  }

  // Recompute what should have been paid and reconcile against Razorpay's
  // own record of the order. Trust Razorpay, never the client.
  let fetchedStatus: unknown;
  let fetchedAmount: unknown;
  try {
    const fetched = await razorpay.orders.fetch(orderId);
    fetchedStatus = fetched.status;
    fetchedAmount = fetched.amount;
  } catch (err) {
    console.error("Razorpay order fetch failed:", err);
    return fail("Could not confirm payment. Please contact support.", 502);
  }

  if (fetchedStatus !== "paid") {
    return fail("Payment is not completed.", 402);
  }

  let expectedPaise: number;
  try {
    ({ paise: expectedPaise } = await priceOrder({ lines, giftWrap, shipping }));
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid order.";
    return fail(message, 400);
  }

  const paidPaise =
    typeof fetchedAmount === "number"
      ? fetchedAmount
      : typeof fetchedAmount === "string" && fetchedAmount !== ""
        ? Number(fetchedAmount)
        : NaN;
  if (!Number.isFinite(paidPaise) || Math.abs(paidPaise - expectedPaise) > AMOUNT_TOLERANCE_PAISE) {
    console.error(
      `Amount mismatch for order ${orderId}: paid ${String(fetchedAmount)}, expected ${expectedPaise}`
    );
    return fail("Paid amount does not match the order total.", 422);
  }

  const now = Date.now();
  const seenAt = processedPayments.get(paymentId);
  if (seenAt !== undefined && now - seenAt < PROCESSED_TTL_MS) {
    return NextResponse.json({ success: true, deduped: true });
  }

  const payload =
    orderPayload && typeof orderPayload === "object"
      ? (orderPayload as Record<string, unknown>)
      : {};

  // 1. Archive order & save address in Clerk user metadata (signed-in only).
  if (effectiveUserId) {
    try {
      const client = await clerkClient();
      const user = await client.users.getUser(effectiveUserId);
      const unsafeMeta = (user.unsafeMetadata || {}) as {
        o?: Array<[string, string, number, number, string, string]>;
        a?: Array<[string, string, string, string]>;
      };

      const existingOrders = unsafeMeta.o || [];
      const existingAddresses = unsafeMeta.a || [];

      // Second idempotency layer: this payment already archived.
      // Archive rows store the ORY reference (payload.id) with the
      // Razorpay orderId as fallback, so match against both.
      const ref = typeof payload.id === "string" ? payload.id : "";
      if (
        existingOrders.some((o) => o[0] === orderId || (ref !== "" && o[0] === ref))
      ) {
        processedPayments.set(paymentId, now);
        return NextResponse.json({ success: true, deduped: true });
      }

      const str = (v: unknown) => (typeof v === "string" ? v : "");
      const newOrder: [string, string, number, number, string, string] = [
        str(payload.id) || orderId,
        str(payload.date) ||
          new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
        0, // processing
        Math.round(expectedPaise / 100),
        str(payload.summary),
        str(payload.pin),
      ];

      const updatedOrders = [newOrder, ...existingOrders].slice(0, 15);
      let updatedAddresses = existingAddresses;

      if (payload.saveAddress === true && payload.address) {
        const newAddr: [string, string, string, string] = [
          str(payload.address),
          str(payload.city),
          str(payload.state) || "Region",
          str(payload.pin),
        ];
        const isDuplicate = existingAddresses.some(
          (a) => a[0].toLowerCase() === newAddr[0].toLowerCase() && a[3] === newAddr[3]
        );
        if (!isDuplicate && newAddr[0]) {
          updatedAddresses = [newAddr, ...existingAddresses].slice(0, 5);
        }
      }

      await client.users.updateUser(effectiveUserId, {
        unsafeMetadata: {
          ...unsafeMeta,
          o: updatedOrders,
          a: updatedAddresses,
        },
      });
    } catch (metaErr) {
      console.error("Failed to update Clerk user metadata on order verify:", metaErr);
    }
  }

  // 2. Dispatch transactional emails via Resend (best-effort: a mail
  // failure must never fail an already-verified payment).
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey && email) {
    try {
      const resend = new Resend(resendApiKey);
      const merchantEmail =
        process.env.MERCHANT_NOTIFICATION_EMAIL || "orders@oryenna.com";
      const summary =
        typeof payload.summary === "string" && payload.summary
          ? payload.summary
          : "Oryenna Atelier order";
      const orderRef =
        typeof payload.id === "string" && payload.id ? payload.id : orderId;
      const paidTotal = (expectedPaise / 100).toLocaleString("en-IN");

      await resend.emails.send({
        from: "Oryenna Atelier <orders@resend.dev>",
        to: email,
        subject: `Order Confirmed — ${orderRef} | Oryenna`,
        html: `
          <div style="font-family: Georgia, serif; background-color: #fcfbfa; color: #3d332a; padding: 40px; max-width: 600px; margin: 0 auto; border: 1px solid #e6e0da;">
            <h2 style="font-size: 24px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px;">Oryenna Atelier</h2>
            <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; color: #8c7a6b; margin-top: 0;">Grasse &bull; Provence</p>
            <hr style="border: none; border-top: 1px solid #e6e0da; margin: 20px 0;" />
            <h3 style="font-size: 18px; text-transform: uppercase; letter-spacing: 0.06em;">Your Order is Confirmed</h3>
            <p style="font-size: 14px; line-height: 1.6;">Thank you for choosing to slow down with us. Your hand-poured botanical creation is being prepared in our Provence studio.</p>
            <div style="background-color: #f3efe9; padding: 20px; margin: 24px 0; border-left: 2px solid #3d332a;">
              <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em;"><strong>Order Reference:</strong> ${orderRef}</p>
              <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em;"><strong>Estimated Dispatch:</strong> Within 24 hours</p>
              <p style="margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em;"><strong>Estimated Delivery:</strong> 3–5 Business Days</p>
            </div>
            <p style="font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em;">Order Summary:</p>
            <p style="font-size: 14px; color: #594a3c;">${summary}</p>
            <p style="font-size: 16px; font-family: serif; margin-top: 12px;"><strong>Total Paid: ₹${paidTotal}</strong></p>
            <p style="font-size: 12px; color: #8c7a6b; margin-top: 40px; border-top: 1px solid #e6e0da; pt: 20px;">You can review your order archive anytime by logging into your <a href="https://oryennaweb.vercel.app/account" style="color: #3d332a;">Atelier Account</a>.</p>
          </div>
        `,
      });

      await resend.emails.send({
        from: "Oryenna System <orders@resend.dev>",
        to: merchantEmail,
        subject: `🔔 New Order ${orderRef} — ₹${paidTotal}`,
        html: `
          <div style="font-family: monospace; padding: 20px; background: #fff; color: #000;">
            <h2>New Atelier Order Received!</h2>
            <p><strong>Order ID:</strong> ${orderRef}</p>
            <p><strong>Customer Email:</strong> ${email}</p>
            <p><strong>Items:</strong> ${summary}</p>
            <p><strong>Total:</strong> ₹${paidTotal}</p>
            <hr />
            <h3>Shipping Destination:</h3>
            <p>${typeof payload.address === "string" ? payload.address : ""}<br/>${typeof payload.city === "string" ? payload.city : ""}, ${typeof payload.state === "string" ? payload.state : ""} ${typeof payload.pin === "string" ? payload.pin : ""}</p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("Resend email dispatch error:", emailErr);
    }
  }

  processedPayments.set(paymentId, now);
  if (processedPayments.size > 5000) pruneProcessed(now);

  return NextResponse.json({
    success: true,
    message: "Payment verified, order archived, and confirmation emails dispatched",
  });
}
