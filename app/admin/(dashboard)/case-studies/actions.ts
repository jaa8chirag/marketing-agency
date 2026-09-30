"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

function scalarFields(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? "").trim(),
    client: String(formData.get("client") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    year: String(formData.get("year") ?? "").trim(),
    summary: String(formData.get("summary") ?? "").trim(),
    imageUrl: String(formData.get("imageUrl") ?? "").trim() || null,
    challenge: String(formData.get("challenge") ?? "").trim(),
    objective: String(formData.get("objective") ?? "").trim(),
    strategy: String(formData.get("strategy") ?? "").trim(),
    creative: String(formData.get("creative") ?? "").trim(),
    execution: String(formData.get("execution") ?? "").trim(),
    technology: String(formData.get("technology") ?? "").trim(),
    media: String(formData.get("media") ?? "").trim(),
    industryId: String(formData.get("industryId") ?? ""),
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  };
}

/** "Metric | Label" per line -> [{metric, label}] */
function parseResults(formData: FormData) {
  return String(formData.get("results") ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [metric, label] = line.split("|").map((s) => s.trim());
      return { metric: metric ?? "", label: label ?? "" };
    });
}

function parseCapabilityIds(formData: FormData) {
  return formData.getAll("capabilityIds").map(String);
}

export async function createCaseStudy(formData: FormData) {
  const caseStudy = await prisma.caseStudy.create({ data: scalarFields(formData) });

  const results = parseResults(formData);
  if (results.length) {
    await prisma.caseStudyResult.createMany({
      data: results.map((r, i) => ({ ...r, caseStudyId: caseStudy.id, sortOrder: i })),
    });
  }

  const capabilityIds = parseCapabilityIds(formData);
  if (capabilityIds.length) {
    await prisma.caseStudyCapability.createMany({
      data: capabilityIds.map((capabilityId) => ({ caseStudyId: caseStudy.id, capabilityId })),
    });
  }

  revalidatePath("/admin/case-studies");
  redirect("/admin/case-studies");
}

export async function updateCaseStudy(id: string, formData: FormData) {
  await prisma.caseStudy.update({ where: { id }, data: scalarFields(formData) });

  await prisma.caseStudyResult.deleteMany({ where: { caseStudyId: id } });
  const results = parseResults(formData);
  if (results.length) {
    await prisma.caseStudyResult.createMany({
      data: results.map((r, i) => ({ ...r, caseStudyId: id, sortOrder: i })),
    });
  }

  await prisma.caseStudyCapability.deleteMany({ where: { caseStudyId: id } });
  const capabilityIds = parseCapabilityIds(formData);
  if (capabilityIds.length) {
    await prisma.caseStudyCapability.createMany({
      data: capabilityIds.map((capabilityId) => ({ caseStudyId: id, capabilityId })),
    });
  }

  revalidatePath("/admin/case-studies");
  redirect("/admin/case-studies");
}

export async function deleteCaseStudy(id: string) {
  await prisma.caseStudy.delete({ where: { id } });
  revalidatePath("/admin/case-studies");
  redirect("/admin/case-studies");
}
