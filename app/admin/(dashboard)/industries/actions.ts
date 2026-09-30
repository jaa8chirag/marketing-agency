"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { linesToArray } from "@/components/admin/fields";

function fromForm(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    eyebrow: String(formData.get("eyebrow") ?? "").trim(),
    summary: String(formData.get("summary") ?? "").trim(),
    imageUrl: String(formData.get("imageUrl") ?? "").trim() || null,
    challenges: linesToArray(formData.get("challenges")),
    capabilitySlugs: linesToArray(formData.get("capabilitySlugs")),
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  };
}

export async function createIndustry(formData: FormData) {
  await prisma.industry.create({ data: fromForm(formData) });
  revalidatePath("/admin/industries");
  redirect("/admin/industries");
}

export async function updateIndustry(id: string, formData: FormData) {
  await prisma.industry.update({ where: { id }, data: fromForm(formData) });
  revalidatePath("/admin/industries");
  redirect("/admin/industries");
}

export async function deleteIndustry(id: string) {
  await prisma.industry.delete({ where: { id } });
  revalidatePath("/admin/industries");
  redirect("/admin/industries");
}
