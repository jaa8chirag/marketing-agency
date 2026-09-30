import Link from "next/link";
import { prisma } from "@/lib/db";
import { deleteTeamMember } from "./actions";
import DeleteButton from "@/components/admin/DeleteButton";
import { buttonClass } from "@/components/admin/fields";

export default async function AdminTeamPage() {
  const members = await prisma.teamMember.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="flex items-center gap-2.5 font-display text-2xl font-bold tracking-tight">
          <span className="material-symbols-outlined text-signal text-[22px]">groups</span>
          Team
        </h1>
        <Link href="/admin/team/new" className={buttonClass}>
          + New Team Member
        </Link>
      </div>

      <div className="border border-edge divide-y divide-edge rounded-xl overflow-hidden">
        {members.map((m) => (
          <div key={m.id} className="flex items-center justify-between px-5 py-4 gap-4 hover:bg-surfaceMuted/50 transition-colors">
            <div className="min-w-0">
              <p className="text-sm font-medium truncate max-w-md">{m.name}</p>
              <span className="text-xs text-fgMuted">{m.role}</span>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <Link href={`/admin/team/${m.id}`} className="text-sm font-medium hover:text-signal">
                Edit
              </Link>
              <DeleteButton action={deleteTeamMember.bind(null, m.id)} />
            </div>
          </div>
        ))}
        {members.length === 0 && <p className="px-5 py-8 text-center text-fgMuted text-sm">No team members yet.</p>}
      </div>
    </div>
  );
}
