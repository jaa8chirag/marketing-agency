import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import InsightForm from "@/components/admin/InsightForm";
import { updateInsight } from "../actions";

export default async function EditInsightPage({ params }: { params: { id: string } }) {
  const [insight, capabilities] = await Promise.all([
    prisma.insight.findUnique({ where: { id: params.id } }),
    prisma.capability.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);
  if (!insight) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold tracking-tight mb-8">Edit Insight</h1>
      <InsightForm action={updateInsight.bind(null, insight.id)} initial={insight} capabilities={capabilities} />
    </div>
  );
}
