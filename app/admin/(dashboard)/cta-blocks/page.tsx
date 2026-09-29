import Link from "next/link";
import { prisma } from "@/lib/db";
import { deleteCtaBlock } from "./actions";
import DeleteButton from "@/components/admin/DeleteButton";
import { buttonClass } from "@/components/admin/fields";

export default async function AdminCtaBlocksPage() {
  const blocks = await prisma.ctaBlock.findMany({ orderBy: { key: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl font-bold tracking-tight">CTA Blocks</h1>
        <Link href="/admin/cta-blocks/new" className={buttonClass}>
          + New CTA Block
        </Link>
      </div>
      <p className="text-sm text-fgMuted mb-6 max-w-2xl">
        Reusable call-to-action content, looked up by key in code (e.g. <code className="font-mono">default</code> is
        used on the Home and About pages). Most other page CTAs interpolate page-specific text and stay code-driven —
        this only covers the generic, reusable ones.
      </p>

      <div className="border border-edge divide-y divide-edge">
        {blocks.map((b) => (
          <div key={b.id} className="flex items-center justify-between px-5 py-4 gap-4">
            <div className="min-w-0">
              <p className="text-sm font-medium truncate max-w-md">
                <code className="font-mono text-signal">{b.key}</code> — {b.title}
              </p>
              <span className="text-xs text-fgMuted">{b.eyebrow}</span>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <Link href={`/admin/cta-blocks/${b.id}`} className="text-sm font-medium hover:text-signal">
                Edit
              </Link>
              <DeleteButton action={deleteCtaBlock.bind(null, b.id)} />
            </div>
          </div>
        ))}
        {blocks.length === 0 && <p className="px-5 py-8 text-center text-fgMuted text-sm">No CTA blocks yet.</p>}
      </div>
    </div>
  );
}
