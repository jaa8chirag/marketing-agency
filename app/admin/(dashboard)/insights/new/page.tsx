import { prisma } from "@/lib/db";
import InsightForm from "@/components/admin/InsightForm";
import { createInsight } from "../actions";

export default async function NewInsightPage() {
  const capabilities = await prisma.capability.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <div>
      <h1 className="font-display text-2xl font-bold tracking-tight mb-8">New Insight</h1>
      <InsightForm action={createInsight} capabilities={capabilities} />
    </div>
  );
}
