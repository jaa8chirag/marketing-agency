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
    { label: "Capabilities", count: capabilities, href: "/admin/capabilities" },
    { label: "Industries", count: industries, href: "/admin/industries" },
    { label: "Case Studies", count: caseStudies, href: "/admin/case-studies" },
    { label: "Insights", count: insights, href: "/admin/insights" },
    { label: "Testimonials", count: testimonials, href: "/admin/testimonials" },
    { label: "Client Logos", count: clientLogos, href: "/admin/client-logos" },
    { label: "Leads", count: leads, href: "/admin/leads" },
    { label: "Newsletter Subscribers", count: subscribers, href: "/admin/newsletter" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold tracking-tight mb-8">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="border border-edge p-6 hover:border-signal transition-colors">
            <span className="font-display text-3xl font-bold block mb-1">{c.count}</span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-fgMuted">{c.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
