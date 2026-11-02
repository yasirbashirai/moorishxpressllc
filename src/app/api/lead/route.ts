import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Every field any site form can send, with the label used in the email
const FIELDS: Record<string, string> = {
  role: "I am a", service: "Service", truck: "Suggested truck", weight: "Weight (lbs)", pallets: "Pallets / pieces",
  liftgate: "Liftgate needed", from: "Pickup / home base", to: "Delivery", date: "Pickup date", goods: "Load details",
  equipment: "Equipment", authority: "Authority status", mc: "MC / DOT", rating: "Rating",
  name: "Name", company: "Company", email: "Email", phone: "Phone", notes: "Notes / message",
};

const SUBJECTS: Record<string, string> = {
  quote: "New quote request",
  dispatch: "New dispatch sign-up",
  review: "New customer review",
  contact: "New website message",
};

const clean = (v: unknown) => String(v ?? "").replace(/[<>]/g, "").trim().slice(0, 2000);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot filled in: pretend success so bots move on
  if (clean(body.website)) return NextResponse.json({ ok: true });

  const type = SUBJECTS[clean(body.type)] ? clean(body.type) : "contact";
  const lead = Object.fromEntries(Object.keys(FIELDS).map((k) => [k, clean(body[k])]));
  if (!lead.name || !/^\S+@\S+\.\S+$/.test(lead.email)) {
    return NextResponse.json({ error: "Name and a valid email are required" }, { status: 422 });
  }

  const lines = Object.entries(FIELDS).filter(([k]) => lead[k]).map(([k, label]) => `${label}: ${lead[k]}`);
  const route = lead.from && lead.to ? `: ${lead.from} to ${lead.to}` : lead.company ? `: ${lead.company}` : `: ${lead.name}`;
  const subject = `${SUBJECTS[type]}${route}`;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, LEADS_TO } = process.env;

  // Without SMTP settings, log the lead so nothing is lost during development
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.log(`[lead:${type}] ${subject}\n${lines.join("\n")}`);
    return NextResponse.json({ ok: true });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    await transporter.sendMail({
      from: `"Moorish Xpress Website" <${SMTP_USER}>`,
      to: LEADS_TO || "loads@moorishxpress.com",
      replyTo: lead.email,
      subject,
      text: lines.join("\n"),
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] email failed", err);
    return NextResponse.json({ error: "Could not send" }, { status: 500 });
  }
}
