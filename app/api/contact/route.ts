import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { isRateLimited } from "@/lib/rateLimit";
import { sendEnquiryConfirmation, sendBookingConfirmation, sendInternalLeadNotification } from "@/lib/email";

const contactSchema = z.object({
  mode: z.enum(["ENQUIRY", "BOOK_A_CALL"]),
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
  company: z.string().trim().min(1).max(200),
  jobTitle: z.string().trim().max(200).optional().or(z.literal("")),
  interest: z.string().trim().min(1).max(200),
  message: z.string().trim().min(1).max(4000),
  consent: z.literal(true),
  bookingDate: z.string().trim().max(100).optional(),
  bookingTime: z.string().trim().max(50).optional(),
  // Set when this submission follows a completed Cal.com booking (fired
  // client-side from the embed's bookingSuccessful event) — lets this be
  // upserted idempotently alongside the Cal.com webhook backstop.
  calBookingUid: z.string().trim().max(200).optional(),
  // Honeypot — real users never see or fill this field (hidden via CSS).
  website: z.string().max(0).optional().or(z.literal("")),
  // Hidden attribution data (brief's "Hidden Lead & Attribution Data")
  sourcePath: z.string().trim().max(500).optional(),
  ctaLocation: z.string().trim().max(200).optional(),
  utmSource: z.string().trim().max(200).optional(),
  utmMedium: z.string().trim().max(200).optional(),
  utmCampaign: z.string().trim().max(200).optional(),
  utmContent: z.string().trim().max(200).optional(),
  referrer: z.string().trim().max(500).optional(),
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(`contact:${ip}`)) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please try again later." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid submission." }, { status: 400 });
  }

  const data = parsed.data;
  // Honeypot tripped — pretend success so the bot doesn't learn anything, but write nothing.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const leadData = {
    mode: data.mode,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    company: data.company,
    jobTitle: data.jobTitle || null,
    interest: data.interest,
    message: data.message,
    consent: data.consent,
    bookingDate: data.bookingDate,
    bookingTime: data.bookingTime,
    sourcePath: data.sourcePath,
    ctaLocation: data.ctaLocation,
    utmSource: data.utmSource,
    utmMedium: data.utmMedium,
    utmCampaign: data.utmCampaign,
    utmContent: data.utmContent,
    referrer: data.referrer,
  };

  // With a calBookingUid, upsert instead of create: the Cal.com webhook
  // (app/api/cal-webhook/route.ts) may write the same booking as a backstop
  // if this client-side call fails to fire — dedupe on the booking's own
  // unique id rather than risk two rows for one real booking.
  if (data.calBookingUid) {
    await prisma.lead.upsert({
      where: { calBookingUid: data.calBookingUid },
      create: { ...leadData, calBookingUid: data.calBookingUid },
      update: leadData,
    });
  } else {
    await prisma.lead.create({ data: leadData });
  }

  // Awaited, not fire-and-forget: Vercel's serverless functions aren't
  // guaranteed to keep running after the response is sent, so an
  // un-awaited promise here could just never complete. sendEmail() itself
  // already swallows its own errors (see lib/email.ts), so this can't fail
  // the submission even though it's awaited.
  if (data.mode === "BOOK_A_CALL") {
    await sendBookingConfirmation(data.email, data.firstName, data.bookingDate);
  } else {
    await sendEnquiryConfirmation(data.email, data.firstName);
  }
  await sendInternalLeadNotification(leadData);

  return NextResponse.json({ ok: true });
}
