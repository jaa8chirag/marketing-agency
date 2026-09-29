import Link from "next/link";
import { logout } from "../auth-actions";
import { getSession } from "@/lib/session";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/capabilities", label: "Capabilities" },
  { href: "/admin/industries", label: "Industries" },
  { href: "/admin/case-studies", label: "Case Studies" },
  { href: "/admin/insights", label: "Insights" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/client-logos", label: "Client Logos" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/newsletter", label: "Newsletter" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <div className="min-h-screen bg-surface text-fg flex">
      <aside className="w-60 shrink-0 border-r border-edge p-6 flex flex-col">
        <span className="font-mono text-[11px] uppercase tracking-superwide text-signal block mb-1">
          Cordinit Media
        </span>
        <span className="font-display text-lg font-bold tracking-tight block mb-8">Admin</span>

        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2.5 text-sm font-medium rounded hover:bg-surfaceMuted transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="pt-6 border-t border-edge mt-6">
          <p className="text-xs text-fgMuted mb-3 truncate">{session?.email}</p>
          <form action={logout}>
            <button
              type="submit"
              className="w-full px-3 py-2.5 text-sm font-medium border border-edge rounded hover:bg-surfaceMuted transition-colors text-left"
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 p-10 overflow-auto">{children}</main>
    </div>
  );
}
