import Link from "next/link";
import { prisma } from "@/lib/db";
import { deleteInsight } from "./actions";
import DeleteButton from "@/components/admin/DeleteButton";
import { buttonClass } from "@/components/admin/fields";

export default async function AdminInsightsPage() {
  const insights = await prisma.insight.findMany({
    include: { capability: { select: { name: true } } },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl font-bold tracking-tight">Insights</h1>
        <Link href="/admin/insights/new" className={buttonClass}>
          + New Insight
        </Link>
      </div>

      <div className="border border-edge divide-y divide-edge">
        {insights.map((i) => (
          <div key={i.id} className="flex items-center justify-between px-5 py-4">
            <div>
              <span className="font-medium">{i.title}</span>
              <span className="ml-2 text-xs text-fgMuted font-mono">
                {i.type}
                {i.capability ? ` · ${i.capability.name}` : ""}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/admin/insights/${i.id}`} className="text-sm font-medium hover:text-signal">
                Edit
              </Link>
              <DeleteButton action={deleteInsight.bind(null, i.id)} />
            </div>
          </div>
        ))}
        {insights.length === 0 && <p className="px-5 py-8 text-center text-fgMuted text-sm">No insights yet.</p>}
      </div>
    </div>
  );
}
