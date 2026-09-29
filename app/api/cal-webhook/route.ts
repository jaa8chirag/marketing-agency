import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { prisma } from "@/lib/db";
import { sendInternalLeadNotification } from "@/lib/email";

// Server-side backstop for Cal.com bookings. The primary path is the
// client-side `bookingSuccessful` event in ContactExperience.tsx calling
// /api/contact directly with the full qualification-form data — this
// webhook exists in case that call never fires (tab closed too fast,
// network blip). It only has whatever Cal.com's own payload includes
// (name/email/time), not our custom fields (company, job title, interest),
// so a lead created here may be missing those — upserting on calBookingUid
// means if the client-side call *does* also land, it fills those in.
function verifySignature(rawBody: string, signature: string | null): boolean {
  const secret = process.env.CAL_WEBHOOK_SECRET;
  if (!secret) return false; // refuse to process unsigned/unverifiable webhooks
  if (!signature) return false;
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  // Constant-time comparison — avoids leaking the expected signature via timing.
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-cal-signature-256");

  if (!verifySignature(rawBody, signature)) {
    return NextResponse.json({ ok: false, error: "Invalid signature." }, { status: 401 });
  }

  const event = JSON.parse(rawBody);
  if (event.triggerEvent !== "BOOKING_CREATED") {
    // Acknowledge everything else so Cal.com doesn't keep retrying events we don't handle.
    return NextResponse.json({ ok: true, skipped: event.triggerEvent });
  }

  const booking = event.payload;
  const attendee = booking?.attendees?.[0];
  if (!booking?.uid || !attendee?.email) {
    return NextResponse.json({ ok: false, error: "Missing booking uid or attendee email." }, { status: 400 });
  }

  const fullName: string = attendee.name || "Unknown";
  const [firstName, ...rest] = fullName.split(" ");
  const lastName = rest.join(" ") || "-";

  const leadData = {
    mode: "BOOK_A_CALL" as const,
    firstName,
    lastName,
    email: attendee.email,
    company: booking?.responses?.company?.value || "-",
    jobTitle: booking?.responses?.jobTitle?.value || null,
    interest: booking?.responses?.interest?.value || "Book a Call",
    message: booking?.responses?.notes?.value || booking?.title || "Booked via Cal.com",
    consent: true,
    bookingDate: booking.startTime,
    bookingTime: booking.startTime,
  };

  await prisma.lead.upsert({
    where: { calBookingUid: booking.uid },
    create: { ...leadData, calBookingUid: booking.uid },
    update: leadData,
  });

  await sendInternalLeadNotification(leadData);

  return NextResponse.json({ ok: true });
}
