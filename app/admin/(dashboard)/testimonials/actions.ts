"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

function fromForm(formData: FormData) {
  return {
    quote: String(formData.get("quote") ?? "").trim(),
    person: String(formData.get("person") ?? "").trim(),
    role: String(formData.get("role") ?? "").trim() || null,
    company: String(formData.get("company") ?? "").trim(),
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  };
}

export async function createTestimonial(formData: FormData) {
  await prisma.testimonial.create({ data: fromForm(formData) });
  revalidatePath("/admin/testimonials");
  redirect("/admin/testimonials");
}

export async function updateTestimonial(id: string, formData: FormData) {
  await prisma.testimonial.update({ where: { id }, data: fromForm(formData) });
  revalidatePath("/admin/testimonials");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/admin/testimonials");
  redirect("/admin/testimonials");
}
