"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

function fromForm(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    logoUrl: String(formData.get("logoUrl") ?? "").trim() || null,
    industry: String(formData.get("industry") ?? "").trim() || null,
    approved: formData.get("approved") === "on",
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  };
}

export async function createClientLogo(formData: FormData) {
  await prisma.clientLogo.create({ data: fromForm(formData) });
  revalidatePath("/admin/client-logos");
  redirect("/admin/client-logos");
}

export async function updateClientLogo(id: string, formData: FormData) {
  await prisma.clientLogo.update({ where: { id }, data: fromForm(formData) });
  revalidatePath("/admin/client-logos");
  redirect("/admin/client-logos");
}

export async function deleteClientLogo(id: string) {
  await prisma.clientLogo.delete({ where: { id } });
  revalidatePath("/admin/client-logos");
  redirect("/admin/client-logos");
}
