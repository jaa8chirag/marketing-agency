import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import CTASection from "@/components/ui/CTASection";
import InsightCard from "@/components/ui/InsightCard";
import { getInsights, getCapabilities, getIndustries } from "@/lib/queries";

const TYPES = ["Article", "Guide", "Report", "Perspective", "Video", "Whitepaper"] as const;

// A category is one of: a content type (guide, report…), a capability slug, or
// an industry slug — the three taxonomies brief §9.7 says Insights filters by.
async function resolveCategory(slug: string) {
  const type = TYPES.find((t) => t.toLowerCase() === slug);
  if (type) return { kind: "type" as const, label: `${type}s`, match: (i: { type: string }) => i.type === type };
  const [capabilities, industries] = await Promise.all([getCapabilities(), getIndustries()]);
  const cap = capabilities.find((c) => c.slug === slug);
  if (cap) return { kind: "capability" as const, label: cap.name, match: (i: { capability?: string }) => i.capability === cap.slug };
  const ind = industries.find((i) => i.slug === slug);
  if (ind) return { kind: "industry" as const, label: ind.name, match: (i: { industry?: string }) => i.industry === ind.slug };
  return null;
}

export async function generateStaticParams() {
  const [capabilities, industries] = await Promise.all([getCapabilities(), getIndustries()]);
  return [
    ...TYPES.map((t) => ({ category: t.toLowerCase() })),
    ...capabilities.map((c) => ({ category: c.slug })),
    ...industries.map((i) => ({ category: i.slug })),
  ];
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const cat = await resolveCategory(params.category);
  if (!cat) return {};
  return {
    title: `${cat.label} — Insights`,
    description: `Cordinit Media insights filed under ${cat.label}.`,
    alternates: { canonical: `/insights/category/${params.category}` },
  };
}

export default async function InsightCategoryPage({ params }: { params: { category: string } }) {
  const cat = await resolveCategory(params.category);
  if (!cat) notFound();
  const insights = (await getInsights()).filter(cat.match);

  return (
    <div className="min-h-screen bg-surface text-fg flex flex-col">
      <Header />
      <main id="main-content" className="w-full">
        <PageHero
          eyebrow={`Insights · ${cat.kind}`}
          title={cat.label}
          description={`Everything we've published under ${cat.label}.`}
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Insights", href: "/insights" }, { label: cat.label }]}
          visualSeed={`insights-${params.category}`}
        />
        <section className="py-20 md:py-28">
          <Container>
            {insights.length === 0 ? (
              <p className="text-fgMuted">Nothing published here yet — check back soon.</p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {insights.map((insight, i) => (
                  <InsightCard key={insight.slug} insight={insight} index={i} />
                ))}
              </div>
            )}
          </Container>
        </section>
        <CTASection eyebrow="Next step" title="Want this applied to your business?" description="Book a call and we'll talk through it." />
      </main>
      <Footer />
    </div>
  );
}
