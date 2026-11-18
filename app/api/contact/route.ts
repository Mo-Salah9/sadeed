import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema, type ContactData } from "@/lib/contact-schema";

export const runtime = "nodejs";

// Best-effort rate limit: 5 requests / 10 min per IP. On serverless this is per instance;
// use a shared store (e.g. Upstash Redis / Vercel KV) if you need a strict limit.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_REQUESTS;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function renderEmail(d: ContactData, locale: string) {
  const rows: [string, string][] = [
    ["Name", d.name],
    ["Email", d.email],
    ["Organization", d.organization || "-"],
    ["Service", d.service],
    ["Language", locale],
  ];
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMessage:\n${d.message}`;
  const html = `
    <div style="font-family:Arial,sans-serif;color:#0B1E3F;max-width:600px">
      <h2 style="margin:0 0 16px">New enquiry from sadeed website</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows.map(([k, v]) => `<tr><td style="color:#4a5a75">${k}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`).join("")}
      </table>
      <p style="margin:20px 0 6px;color:#4a5a75">Message</p>
      <div style="white-space:pre-wrap;border-inline-start:3px solid #00C2CB;padding:8px 12px;background:#f5f7fa">${escapeHtml(d.message)}</div>
    </div>`;
  return { text, html };
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const locale = (body as { locale?: unknown })?.locale === "en" ? "en" : "ar";
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "validation", issues: parsed.error.issues.map((i) => ({ path: i.path, message: i.message })) },
      { status: 422 },
    );
  }

  // Honeypot filled in: pretend success so bots don't retry
  if (parsed.data.website) return NextResponse.json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "Sadeed Studio Website <onboarding@resend.dev>";
  const { text, html } = renderEmail(parsed.data, locale);

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] RESEND_API_KEY/CONTACT_EMAIL not set; message logged instead of sent:\n" + text);
      return NextResponse.json({ ok: true, dev: true });
    }
    console.error("[contact] RESEND_API_KEY or CONTACT_EMAIL is missing");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: to.split(",").map((s) => s.trim()),
      replyTo: parsed.data.email,
      subject: `New enquiry: ${parsed.data.name}${parsed.data.organization ? ` (${parsed.data.organization})` : ""}`,
      text,
      html,
    });
    if (error) {
      console.error("[contact] Resend error", error);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 500 });
  }
}
