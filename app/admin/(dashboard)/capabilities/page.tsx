import Link from "next/link";
import { prisma } from "@/lib/db";
import { deleteCapability } from "./actions";
import DeleteButton from "@/components/admin/DeleteButton";
import { buttonClass } from "@/components/admin/fields";

export default async function AdminCapabilitiesPage() {
  const capabilities = await prisma.capability.findMany({
    include: { _count: { select: { services: true } } },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl font-bold tracking-tight">Capabilities</h1>
        <Link href="/admin/capabilities/new" className={buttonClass}>
          + New Capability
        </Link>
      </div>

      <div className="border border-edge divide-y divide-edge">
        {capabilities.map((cap) => (
          <div key={cap.id} className="flex items-center justify-between px-5 py-4">
            <div>
              <span className="font-mono text-xs text-fgMuted mr-2">{cap.num}</span>
              <span className="font-medium">{cap.name}</span>
              <span className="ml-2 text-xs text-fgMuted">({cap._count.services} services)</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/admin/capabilities/${cap.id}`} className="text-sm font-medium hover:text-signal">
                Edit
              </Link>
              <DeleteButton action={deleteCapability.bind(null, cap.id)} />
            </div>
          </div>
        ))}
        {capabilities.length === 0 && (
          <p className="px-5 py-8 text-center text-fgMuted text-sm">No capabilities yet.</p>
        )}
      </div>
    </div>
  );
}
