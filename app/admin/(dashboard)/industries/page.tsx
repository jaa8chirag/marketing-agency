import Link from "next/link";
import { prisma } from "@/lib/db";
import { deleteIndustry } from "./actions";
import DeleteButton from "@/components/admin/DeleteButton";
import { buttonClass } from "@/components/admin/fields";

export default async function AdminIndustriesPage() {
  const industries = await prisma.industry.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl font-bold tracking-tight">Industries</h1>
        <Link href="/admin/industries/new" className={buttonClass}>
          + New Industry
        </Link>
      </div>

      <div className="border border-edge divide-y divide-edge">
        {industries.map((ind) => (
          <div key={ind.id} className="flex items-center justify-between px-5 py-4">
            <div>
              <span className="font-medium">{ind.name}</span>
              <span className="ml-2 text-xs text-fgMuted font-mono">/{ind.slug}</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/admin/industries/${ind.id}`} className="text-sm font-medium hover:text-signal">
                Edit
              </Link>
              <DeleteButton action={deleteIndustry.bind(null, ind.id)} />
            </div>
          </div>
        ))}
        {industries.length === 0 && <p className="px-5 py-8 text-center text-fgMuted text-sm">No industries yet.</p>}
      </div>
    </div>
  );
}
