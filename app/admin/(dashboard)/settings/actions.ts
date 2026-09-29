"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { linesToArray } from "@/components/admin/fields";

function fromForm(formData: FormData) {
  return {
    primaryNavLinks: linesToArray(formData.get("primaryNavLinks")),
    footerNavLinks: linesToArray(formData.get("footerNavLinks")),
    primaryCtaLabel: String(formData.get("primaryCtaLabel") ?? "").trim(),
    primaryCtaHref: String(formData.get("primaryCtaHref") ?? "").trim(),
    announcementText: String(formData.get("announcementText") ?? "").trim() || null,
    announcementHref: String(formData.get("announcementHref") ?? "").trim() || null,
    socialLinkedin: String(formData.get("socialLinkedin") ?? "").trim() || null,
    socialInstagram: String(formData.get("socialInstagram") ?? "").trim() || null,
    socialYoutube: String(formData.get("socialYoutube") ?? "").trim() || null,
    socialX: String(formData.get("socialX") ?? "").trim() || null,
    contactEmail: String(formData.get("contactEmail") ?? "").trim() || null,
    contactPhone: String(formData.get("contactPhone") ?? "").trim() || null,
    copyrightLine1: String(formData.get("copyrightLine1") ?? "").trim() || null,
    copyrightLine2: String(formData.get("copyrightLine2") ?? "").trim() || null,
    gaMeasurementId: String(formData.get("gaMeasurementId") ?? "").trim() || null,
  };
}

export async function updateSiteSettings(formData: FormData) {
  const data = fromForm(formData);
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    create: { id: "singleton", ...data },
    update: data,
  });
  // Every public page reads settings through the root layout (GA/JSON-LD)
  // and Header/Footer, so a blanket revalidate is the only way to be sure
  // the change shows up everywhere without listing every route by hand.
  revalidatePath("/", "layout");
  revalidatePath("/admin/settings");
}
