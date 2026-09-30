import { logout } from "../auth-actions";
import { getSession } from "@/lib/session";
import AdminNav from "@/components/admin/AdminNav";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <div className="min-h-screen bg-surface text-fg flex">
      <aside className="w-64 shrink-0 border-r border-edge p-5 flex flex-col bg-surfaceMuted/40">
        <div className="flex items-center gap-2.5 mb-8 px-1">
          <div className="w-8 h-8 bg-signal shrink-0 flex items-center justify-center text-ink font-mono font-bold text-sm rounded">
            C
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-sm font-bold tracking-tight">Cordinit Media</span>
            <span className="font-mono text-[10px] uppercase tracking-superwide text-fgMuted">Admin</span>
          </div>
        </div>

        <AdminNav />

        <div className="pt-4 border-t border-edge mt-4">
          <div className="flex items-center gap-2.5 px-3 py-2 mb-1">
            <span className="material-symbols-outlined text-[18px] text-fgMuted shrink-0">account_circle</span>
            <p className="text-xs text-fgMuted truncate">{session?.email}</p>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-surfaceMuted transition-colors text-left"
            >
              <span className="material-symbols-outlined text-[18px] text-fgMuted">logout</span>
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 p-10 overflow-auto">{children}</main>
    </div>
  );
}
