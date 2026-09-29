import Link from "next/link";
import { prisma } from "@/lib/db";
import { deleteClientLogo } from "./actions";
import DeleteButton from "@/components/admin/DeleteButton";
import { buttonClass } from "@/components/admin/fields";

export default async function AdminClientLogosPage() {
  const logos = await prisma.clientLogo.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-2xl font-bold tracking-tight">Client Logos</h1>
        <Link href="/admin/client-logos/new" className={buttonClass}>
          + New Client Logo
        </Link>
      </div>

      <div className="border border-edge divide-y divide-edge">
        {logos.map((logo) => (
          <div key={logo.id} className="flex items-center justify-between px-5 py-4">
            <div>
              <span className="font-medium">{logo.name}</span>
              {!logo.approved && (
                <span className="ml-2 text-xs text-fgMuted font-mono uppercase">(hidden)</span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/admin/client-logos/${logo.id}`} className="text-sm font-medium hover:text-signal">
                Edit
              </Link>
              <DeleteButton action={deleteClientLogo.bind(null, logo.id)} />
            </div>
          </div>
        ))}
        {logos.length === 0 && <p className="px-5 py-8 text-center text-fgMuted text-sm">No client logos yet.</p>}
      </div>
    </div>
  );
}
