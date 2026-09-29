import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { isRateLimited } from "@/lib/rateLimit";

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

  await prisma.lead.create({
    data: {
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
    },
  });

  return NextResponse.json({ ok: true });
}
