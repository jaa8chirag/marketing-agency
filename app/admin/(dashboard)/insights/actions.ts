"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { linesToArray, seoFromForm } from "@/components/admin/fields";
import type { InsightType } from "@/lib/generated/prisma/client";

function fromForm(formData: FormData) {
  const capabilityId = String(formData.get("capabilityId") ?? "");
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    type: String(formData.get("type") ?? "Article") as InsightType,
    summary: String(formData.get("summary") ?? "").trim(),
    body: linesToArray(formData.get("body")),
    author: String(formData.get("author") ?? "").trim(),
    date: String(formData.get("date") ?? "").trim(),
    readingTime: String(formData.get("readingTime") ?? "").trim(),
    industrySlug: String(formData.get("industrySlug") ?? "").trim() || null,
    capabilityId: capabilityId || null,
    sortOrder: Number(formData.get("sortOrder") ?? 0),
    ...seoFromForm(formData),
  };
}

export async function createInsight(formData: FormData) {
  await prisma.insight.create({ data: fromForm(formData) });
  revalidatePath("/admin/insights");
  redirect("/admin/insights");
}

export async function updateInsight(id: string, formData: FormData) {
  await prisma.insight.update({ where: { id }, data: fromForm(formData) });
  revalidatePath("/admin/insights");
  redirect("/admin/insights");
}

export async function deleteInsight(id: string) {
  await prisma.insight.delete({ where: { id } });
  revalidatePath("/admin/insights");
  redirect("/admin/insights");
}
