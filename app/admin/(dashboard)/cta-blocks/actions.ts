"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

function fromForm(formData: FormData) {
  return {
    key: String(formData.get("key") ?? "").trim(),
    eyebrow: String(formData.get("eyebrow") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim() || null,
    primaryLabel: String(formData.get("primaryLabel") ?? "").trim(),
    primaryHref: String(formData.get("primaryHref") ?? "").trim(),
    secondaryLabel: String(formData.get("secondaryLabel") ?? "").trim() || null,
    secondaryHref: String(formData.get("secondaryHref") ?? "").trim() || null,
  };
}

// Revalidates every page that can render a CtaBlock by key, since a block's
// `key` (not its id) decides where it shows up and that's not knowable from
// this action alone — cheap blanket revalidate rather than tracking key ->
// page mappings by hand.
function revalidateCtaConsumers() {
  revalidatePath("/admin/cta-blocks");
  revalidatePath("/", "layout");
}

export async function createCtaBlock(formData: FormData) {
  await prisma.ctaBlock.create({ data: fromForm(formData) });
  revalidateCtaConsumers();
  redirect("/admin/cta-blocks");
}

export async function updateCtaBlock(id: string, formData: FormData) {
  await prisma.ctaBlock.update({ where: { id }, data: fromForm(formData) });
  revalidateCtaConsumers();
  redirect("/admin/cta-blocks");
}

export async function deleteCtaBlock(id: string) {
  await prisma.ctaBlock.delete({ where: { id } });
  revalidateCtaConsumers();
  redirect("/admin/cta-blocks");
}
