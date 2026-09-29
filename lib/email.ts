import { Resend } from "resend";

// Falls back to Resend's shared testing domain (no DNS setup required) when
// no verified sending domain is configured yet — see docs/CLIENT_HANDOFF.md.
// Swap RESEND_FROM_EMAIL to a real address on a verified domain once one
// exists; nothing else in this file needs to change.
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Cordinit Media <onboarding@resend.dev>";
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL;

function getClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

/** Never throws — a missing/broken email config shouldn't fail the lead
 * submission itself, since the lead is already safely in Postgres by the
 * time this runs. Errors are logged, not surfaced to the visitor. */
async function send(params: { to: string; subject: string; html: string }) {
  const resend = getClient();
  if (!resend) {
    console.warn("RESEND_API_KEY not set — skipping email send:", params.subject);
    return;
  }
  try {
    await resend.emails.send({ from: FROM_EMAIL, to: params.to, subject: params.subject, html: params.html });
  } catch (err) {
    console.error("Failed to send email:", err);
  }
}

export async function sendEnquiryConfirmation(to: string, firstName: string) {
  await send({
    to,
    subject: "We've received your enquiry — Cordinit Media",
    html: `
      <p>Hi ${firstName},</p>
      <p>Thank you — we have received your enquiry. We will be in touch soon.</p>
      <p>— Cordinit Media</p>
    `,
  });
}

export async function sendBookingConfirmation(to: string, firstName: string, when?: string) {
  await send({
    to,
    subject: "You're booked — Cordinit Media",
    html: `
      <p>Hi ${firstName},</p>
      <p>You're booked${when ? ` for ${when}` : ""}. A calendar invitation was sent separately by our scheduling system.</p>
      <p>— Cordinit Media</p>
    `,
  });
}

export async function sendInternalLeadNotification(lead: {
  mode: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  interest: string;
  message: string;
}) {
  if (!NOTIFICATION_EMAIL) {
    console.warn("No NOTIFICATION_EMAIL/ADMIN_EMAIL set — skipping internal lead notification.");
    return;
  }
  await send({
    to: NOTIFICATION_EMAIL,
    subject: `New ${lead.mode === "BOOK_A_CALL" ? "booking" : "enquiry"} — ${lead.firstName} ${lead.lastName} (${lead.company})`,
    html: `
      <p><strong>${lead.firstName} ${lead.lastName}</strong> — ${lead.company}</p>
      <p>Email: ${lead.email}</p>
      <p>Interest: ${lead.interest}</p>
      <p>Message: ${lead.message}</p>
      <p>View in admin: /admin/leads</p>
    `,
  });
}
