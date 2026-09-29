"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { linesToArray } from "@/components/admin/fields";

function scalarFields(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    hook: String(formData.get("hook") ?? "").trim(),
    definition: String(formData.get("definition") ?? "").trim(),
    forWhen: linesToArray(formData.get("forWhen")),
    deliverables: linesToArray(formData.get("deliverables")),
    outcomes: linesToArray(formData.get("outcomes")),
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  };
}

/** "Title | Description" per line -> [{title, description}] */
function parseApproachSteps(formData: FormData) {
  return String(formData.get("approach") ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [title, description] = line.split("|").map((s) => s.trim());
      return { title: title ?? "", description: description ?? "" };
    });
}

export async function createService(capabilityId: string, formData: FormData) {
  const service = await prisma.service.create({ data: { ...scalarFields(formData), capabilityId } });

  const steps = parseApproachSteps(formData);
  if (steps.length) {
    await prisma.serviceApproachStep.createMany({
      data: steps.map((s, i) => ({ ...s, serviceId: service.id, sortOrder: i })),
    });
  }

  revalidatePath(`/admin/capabilities/${capabilityId}`);
  redirect(`/admin/capabilities/${capabilityId}`);
}

export async function updateService(capabilityId: string, serviceId: string, formData: FormData) {
  await prisma.service.update({ where: { id: serviceId }, data: scalarFields(formData) });

  await prisma.serviceApproachStep.deleteMany({ where: { serviceId } });
  const steps = parseApproachSteps(formData);
  if (steps.length) {
    await prisma.serviceApproachStep.createMany({
      data: steps.map((s, i) => ({ ...s, serviceId, sortOrder: i })),
    });
  }

  revalidatePath(`/admin/capabilities/${capabilityId}`);
  redirect(`/admin/capabilities/${capabilityId}`);
}

export async function deleteService(capabilityId: string, serviceId: string) {
  await prisma.service.delete({ where: { id: serviceId } });
  revalidatePath(`/admin/capabilities/${capabilityId}`);
  redirect(`/admin/capabilities/${capabilityId}`);
}
