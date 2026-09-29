import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import CaseStudyForm from "@/components/admin/CaseStudyForm";
import { updateCaseStudy } from "../actions";

export default async function EditCaseStudyPage({ params }: { params: { id: string } }) {
  const [caseStudy, industries, capabilities] = await Promise.all([
    prisma.caseStudy.findUnique({
      where: { id: params.id },
      include: { results: { orderBy: { sortOrder: "asc" } }, capabilities: true },
    }),
    prisma.industry.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.capability.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);
  if (!caseStudy) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold tracking-tight mb-8">Edit Case Study</h1>
      <CaseStudyForm
        action={updateCaseStudy.bind(null, caseStudy.id)}
        initial={caseStudy}
        industries={industries}
        capabilities={capabilities}
      />
    </div>
  );
}
