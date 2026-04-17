import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.email(),
  company: z.string().max(200).optional(),
  budget: z.string().max(60).optional(),
  services: z.array(z.string().max(60)).min(1).max(10),
  message: z.string().min(10).max(4000),
});

// Very simple in-memory rate limit (per edge region / instance).
const bucket = new Map<string, { count: number; reset: number }>();
const LIMIT = 5;
const WINDOW_MS = 60_000;

function rateLimit(ip: string) {
  const now = Date.now();
  const entry = bucket.get(ip);
  if (!entry || entry.reset < now) {
    bucket.set(ip, { count: 1, reset: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= LIMIT) return false;
  entry.count += 1;
  return true;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid form data" },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Aureo <onboarding@resend.dev>";

  if (!apiKey || !to) {
    // Dev fallback — log rather than fail, so the form is usable before env setup.
    console.log("[contact] (no Resend configured) new submission:", data);
    return NextResponse.json({ ok: true, dev: true });
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `New Aureo enquiry — ${data.name}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Company: ${data.company ?? "—"}`,
        `Budget: ${data.budget ?? "—"}`,
        `Services: ${data.services.join(", ")}`,
        "",
        "Message:",
        data.message,
      ].join("\n"),
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[contact] resend error", e);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}
