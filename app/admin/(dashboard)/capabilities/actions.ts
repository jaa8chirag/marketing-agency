"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { linesToArray } from "@/components/admin/fields";

function fromForm(formData: FormData) {
  return {
    num: String(formData.get("num") ?? "").trim(),
    slug: String(formData.get("slug") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    shortName: String(formData.get("shortName") ?? "").trim(),
    clientNeed: String(formData.get("clientNeed") ?? "").trim(),
    tagline: String(formData.get("tagline") ?? "").trim(),
    summary: String(formData.get("summary") ?? "").trim(),
    heroDescription: String(formData.get("heroDescription") ?? "").trim(),
    imageUrl: String(formData.get("imageUrl") ?? "").trim() || null,
    overview: linesToArray(formData.get("overview")),
    problems: linesToArray(formData.get("problems")),
    deliverables: linesToArray(formData.get("deliverables")),
    industrySlugs: linesToArray(formData.get("industrySlugs")),
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  };
}

export async function createCapability(formData: FormData) {
  const cap = await prisma.capability.create({ data: fromForm(formData) });
  revalidatePath("/admin/capabilities");
  redirect(`/admin/capabilities/${cap.id}`);
}

export async function updateCapability(id: string, formData: FormData) {
  await prisma.capability.update({ where: { id }, data: fromForm(formData) });
  revalidatePath("/admin/capabilities");
  redirect("/admin/capabilities");
}

export async function deleteCapability(id: string) {
  await prisma.capability.delete({ where: { id } });
  revalidatePath("/admin/capabilities");
  redirect("/admin/capabilities");
}
