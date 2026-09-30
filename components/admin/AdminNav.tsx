"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = { href: string; label: string; icon: string };
type NavGroup = { label: string; items: NavItem[] };

const navGroups: NavGroup[] = [
  {
    label: "Overview",
    items: [{ href: "/admin", label: "Dashboard", icon: "dashboard" }],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/capabilities", label: "Capabilities", icon: "bolt" },
      { href: "/admin/industries", label: "Industries", icon: "domain" },
      { href: "/admin/case-studies", label: "Case Studies", icon: "cases" },
      { href: "/admin/insights", label: "Insights", icon: "lightbulb" },
    ],
  },
  {
    label: "Social proof",
    items: [
      { href: "/admin/testimonials", label: "Testimonials", icon: "format_quote" },
      { href: "/admin/client-logos", label: "Client Logos", icon: "workspace_premium" },
      { href: "/admin/team", label: "Team", icon: "groups" },
      { href: "/admin/cta-blocks", label: "CTA Blocks", icon: "campaign" },
    ],
  },
  {
    label: "Activity",
    items: [
      { href: "/admin/leads", label: "Leads", icon: "inbox" },
      { href: "/admin/newsletter", label: "Newsletter", icon: "mail" },
    ],
  },
  {
    label: "Site",
    items: [{ href: "/admin/settings", label: "Settings", icon: "settings" }],
  },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-6 flex-1 overflow-y-auto">
      {navGroups.map((group) => (
        <div key={group.label}>
          <span className="font-mono text-[10px] uppercase tracking-superwide text-fgMuted/70 block mb-2 px-3">
            {group.label}
          </span>
          <div className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    active ? "bg-ink text-paper" : "text-fg hover:bg-surfaceMuted"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-full bg-signal transition-opacity ${
                      active ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <span
                    className={`material-symbols-outlined text-[19px] ${active ? "text-signal" : "text-fgMuted group-hover:text-fg"}`}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
