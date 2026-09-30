import Link from "next/link";
import { prisma } from "@/lib/db";
import { deleteCaseStudy } from "./actions";
import DeleteButton from "@/components/admin/DeleteButton";
import { buttonClass } from "@/components/admin/fields";

export default async function AdminCaseStudiesPage() {
  const caseStudies = await prisma.caseStudy.findMany({
    include: { industry: { select: { name: true } } },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="flex items-center gap-2.5 font-display text-2xl font-bold tracking-tight">
          <span className="material-symbols-outlined text-signal text-[22px]">cases</span>
          Case Studies
        </h1>
        <Link href="/admin/case-studies/new" className={buttonClass}>
          + New Case Study
        </Link>
      </div>

      <div className="border border-edge divide-y divide-edge rounded-xl overflow-hidden">
        {caseStudies.map((cs) => (
          <div key={cs.id} className="flex items-center justify-between px-5 py-4">
            <div>
              <span className="font-medium">
                {cs.client} — {cs.title}
              </span>
              <span className="ml-2 text-xs text-fgMuted font-mono">
                {cs.year} · {cs.industry.name}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/admin/case-studies/${cs.id}`} className="text-sm font-medium hover:text-signal">
                Edit
              </Link>
              <DeleteButton action={deleteCaseStudy.bind(null, cs.id)} />
            </div>
          </div>
        ))}
        {caseStudies.length === 0 && (
          <p className="px-5 py-8 text-center text-fgMuted text-sm">No case studies yet.</p>
        )}
      </div>
    </div>
  );
}
