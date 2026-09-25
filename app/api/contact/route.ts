import { Resend } from "resend";
import { rateLimit, clientIp } from "@/lib/rate-limit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const v = value.trim();
  if (v.length === 0 || v.length > max) return null;
  return v;
}

export async function POST(request: Request) {
  // Blunt abuse: 5 notes per IP per hour.
  if (!rateLimit(`contact:${clientIp(request)}`, 5, 60 * 60 * 1000)) {
    return Response.json(
      { message: "Too many messages — please try again later." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ message: "Invalid request." }, { status: 400 });
  }

  const name = clean(body.name, 80);
  const email = clean(body.email, 120);
  const topic = clean(body.topic, 40);
  const message = clean(body.message, 3000);

  if (!name || !email || !EMAIL_RE.test(email) || !topic || !message) {
    return Response.json(
      { message: "Please complete every field with a valid email." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const inbox = process.env.CONTACT_INBOX || "atelier@oryenna.com";
  if (!apiKey) {
    console.error("Contact form: missing RESEND_API_KEY");
    return Response.json(
      { message: "The atelier desk is momentarily unreachable." },
      { status: 500 }
    );
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Oryenna Atelier <orders@resend.dev>",
      to: inbox,
      replyTo: email,
      subject: `[Contact · ${topic}] ${name}`,
      text: `From: ${name} <${email}>\nTopic: ${topic}\n\n${message}`,
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Contact form dispatch error:", err);
    return Response.json(
      { message: "Your note could not be sent — please email us directly." },
      { status: 500 }
    );
  }
}
