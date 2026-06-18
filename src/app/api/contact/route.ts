import { NextResponse } from "next/server";

/**
 * Contact form endpoint.
 *
 * Sends a real email through Resend's HTTP API (Workers/edge compatible).
 *
 * Required environment variables (see README):
 *   RESEND_API_KEY   — API key from https://resend.com/api-keys
 *   CONTACT_TO_EMAIL — inbox that should receive messages
 *   CONTACT_FROM_EMAIL — verified sender, e.g. "Portfolio <hello@yourdomain.com>"
 *
 * If they are missing the endpoint returns 503 with a clear message instead of
 * pretending the message was delivered.
 */

export const runtime = "edge";

type Payload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

/** Best-effort in-memory rate limit (per isolate). */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(key, timestamps);
  if (hits.size > 500) {
    for (const [mapKey, values] of hits) {
      if (!values.some((t) => now - t < WINDOW_MS)) hits.delete(mapKey);
    }
  }
  return timestamps.length > MAX_REQUESTS;
}

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const name = clean(body.name, 100);
  const email = clean(body.email, 200);
  const subject = clean(body.subject, 160);
  const message = clean(body.message, 4000);

  if (
    name.length < 2 ||
    !EMAIL_PATTERN.test(email) ||
    subject.length < 3 ||
    message.length < 20
  ) {
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields and try again." },
      { status: 422 },
    );
  }

  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Too many messages from this connection. Try again shortly.",
      },
      { status: 429 },
    );
  }

  if (!apiKey || !to) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Email delivery is not configured. Set RESEND_API_KEY and CONTACT_TO_EMAIL (plus CONTACT_FROM_EMAIL) in the environment, then redeploy.",
      },
      { status: 503 },
    );
  }

  const text = [
    `New message from ${name} <${email}>`,
    "",
    `Subject: ${subject}`,
    "",
    message,
    "",
    "—",
    "Sent from your portfolio contact form.",
  ].join("\n");

  const html = `
    <div style="font-family:ui-sans-serif,system-ui,sans-serif;line-height:1.6;color:#16131f">
      <h2 style="margin:0 0 4px;font-size:18px">New portfolio message</h2>
      <p style="margin:0 0 16px;color:#6b6879;font-size:13px">${escapeHtml(
        name,
      )} &lt;${escapeHtml(email)}&gt;</p>
      <p style="margin:0 0 6px;font-size:13px;color:#6b6879">Subject</p>
      <p style="margin:0 0 18px;font-size:15px">${escapeHtml(subject)}</p>
      <p style="margin:0 0 6px;font-size:13px;color:#6b6879">Message</p>
      <p style="margin:0;white-space:pre-wrap;font-size:15px">${escapeHtml(
        message,
      )}</p>
    </div>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio · ${subject}`,
        text,
        html,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("[contact] Resend error", response.status, detail);
      return NextResponse.json(
        {
          ok: false,
          error: "The email service rejected the message. Please email me directly.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] send failed", error);
    return NextResponse.json(
      {
        ok: false,
        error: "The message could not be sent right now. Please email me directly.",
      },
      { status: 502 },
    );
  }
}
