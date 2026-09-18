import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { priceOrder } from "@/lib/server-pricing";
import { rateLimit, clientIp } from "@/lib/rate-limit";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

const PUBLIC_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "";

export async function POST(request: Request) {
  // Basic abuse protection: 20 order creations per IP per minute.
  if (!rateLimit(`rzp-create:${clientIp(request)}`, 20, 60_000)) {
    return NextResponse.json(
      { success: false, message: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const { lines, giftWrap, shipping } =
    (body as { lines?: unknown; giftWrap?: unknown; shipping?: unknown }) ?? {};

  // The payable total is recomputed server-side from the trusted catalogue.
  // Client-supplied amounts are never accepted.
  let paise: number;
  try {
    ({ paise } = await priceOrder({ lines, giftWrap, shipping }));
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid order.";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }

  if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return NextResponse.json(
      { success: false, message: "Payments are not configured." },
      { status: 503 }
    );
  }

  try {
    const order = await razorpay.orders.create({
      amount: paise,
      currency: "INR",
      receipt: `rcpt_${Date.now()}_${Math.floor(Math.random() * 1_000_000)}`,
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: PUBLIC_KEY_ID,
    });
  } catch (error) {
    console.error("Razorpay order creation failed:", error);
    // Fail closed: never hand out a fake order id.
    return NextResponse.json(
      { success: false, message: "Payment service unavailable. Please try again." },
      { status: 502 }
    );
  }
}
