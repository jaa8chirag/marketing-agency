import { prisma } from "@/lib/db";
import CaseStudyForm from "@/components/admin/CaseStudyForm";
import { createCaseStudy } from "../actions";

export default async function NewCaseStudyPage() {
  const [industries, capabilities] = await Promise.all([
    prisma.industry.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.capability.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold tracking-tight mb-8">New Case Study</h1>
      <CaseStudyForm action={createCaseStudy} industries={industries} capabilities={capabilities} />
    </div>
  );
}
