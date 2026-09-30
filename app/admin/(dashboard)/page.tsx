import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function AdminDashboard() {
  const [capabilities, industries, caseStudies, insights, testimonials, clientLogos, leads, subscribers] =
    await Promise.all([
      prisma.capability.count(),
      prisma.industry.count(),
      prisma.caseStudy.count(),
      prisma.insight.count(),
      prisma.testimonial.count(),
      prisma.clientLogo.count(),
      prisma.lead.count(),
      prisma.newsletterSubscriber.count(),
    ]);

  const cards = [
    { label: "Capabilities", count: capabilities, href: "/admin/capabilities", icon: "bolt" },
    { label: "Industries", count: industries, href: "/admin/industries", icon: "domain" },
    { label: "Case Studies", count: caseStudies, href: "/admin/case-studies", icon: "cases" },
    { label: "Insights", count: insights, href: "/admin/insights", icon: "lightbulb" },
    { label: "Testimonials", count: testimonials, href: "/admin/testimonials", icon: "format_quote" },
    { label: "Client Logos", count: clientLogos, href: "/admin/client-logos", icon: "workspace_premium" },
    { label: "Leads", count: leads, href: "/admin/leads", icon: "inbox" },
    { label: "Newsletter Subscribers", count: subscribers, href: "/admin/newsletter", icon: "mail" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold tracking-tight mb-1">Dashboard</h1>
      <p className="text-sm text-fgMuted mb-8">Everything editable from here shows up live on the site.</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group border border-edge rounded-xl p-6 hover:border-signal hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="material-symbols-outlined text-[22px] text-fgMuted group-hover:text-signal transition-colors">
                {c.icon}
              </span>
              <span className="material-symbols-outlined text-[16px] text-fgMuted/0 group-hover:text-fgMuted transition-colors">
                arrow_outward
              </span>
            </div>
            <span className="font-display text-3xl font-bold block mb-1">{c.count}</span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-fgMuted">{c.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
