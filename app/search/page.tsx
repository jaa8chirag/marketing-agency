import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { getCapabilities, getIndustries, getCaseStudies, getInsights } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Cordinit Media's capabilities, services, work and insights.",
  alternates: { canonical: "/search" },
  robots: { index: false, follow: true },
};

type Hit = { kind: string; title: string; summary: string; href: string };

function matches(q: string, ...fields: (string | undefined)[]) {
  const needle = q.toLowerCase();
  return fields.some((f) => f?.toLowerCase().includes(needle));
}

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = (searchParams.q ?? "").trim().slice(0, 80);
  let hits: Hit[] = [];

  if (q.length >= 2) {
    const [capabilities, industries, caseStudies, insights] = await Promise.all([
      getCapabilities(),
      getIndustries(),
      getCaseStudies(),
      getInsights(),
    ]);
    for (const cap of capabilities) {
      if (matches(q, cap.name, cap.summary, cap.tagline)) {
        hits.push({ kind: "Capability", title: cap.name, summary: cap.summary, href: `/capabilities/${cap.slug}` });
      }
      for (const svc of cap.services) {
        if (matches(q, svc.name, svc.definition, svc.hook)) {
          hits.push({ kind: `Service · ${cap.shortName}`, title: svc.name, summary: svc.definition, href: `/capabilities/${cap.slug}/${svc.slug}` });
        }
      }
    }
    for (const ind of industries) {
      if (matches(q, ind.name, ind.summary)) hits.push({ kind: "Industry", title: ind.name, summary: ind.summary, href: `/industries/${ind.slug}` });
    }
    for (const cs of caseStudies) {
      if (matches(q, cs.client, cs.title, cs.summary)) hits.push({ kind: "Work", title: `${cs.client} — ${cs.title}`, summary: cs.summary, href: `/work/${cs.slug}` });
    }
    for (const i of insights) {
      if (matches(q, i.title, i.summary)) hits.push({ kind: `Insight · ${i.type}`, title: i.title, summary: i.summary, href: `/insights/${i.slug}` });
    }
    hits = hits.slice(0, 60);
  }

  return (
    <div className="min-h-screen bg-surface text-fg flex flex-col">
      <Header />
      <main id="main-content" className="w-full">
        <PageHero
          eyebrow="Search"
          title={q ? `Results for “${q}”` : "Search the site"}
          description="Capabilities, services, work and insights in one place."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Search" }]}
          visualSeed="search"
        />
        <section className="py-16 md:py-24">
          <Container>
            <form action="/search" method="get" role="search" className="flex gap-3 max-w-2xl mb-12">
              <label htmlFor="site-search" className="sr-only">Search</label>
              <input
                id="site-search"
                name="q"
                defaultValue={q}
                minLength={2}
                maxLength={80}
                placeholder="e.g. video production, SEO, fintech"
                className="flex-1 border border-edge bg-transparent px-4 py-3 focus:border-signal outline-none"
              />
              <button type="submit" className="px-6 py-3 bg-signal text-ink font-mono text-[11px] font-bold uppercase tracking-widest hover:bg-lime transition-colors">
                Search
              </button>
            </form>

            {q.length >= 2 && hits.length === 0 && <p className="text-fgMuted">No results for “{q}”. Try a broader term.</p>}
            {q.length > 0 && q.length < 2 && <p className="text-fgMuted">Type at least 2 characters.</p>}

            <ul className="divide-y divide-edge border-y border-edge">
              {hits.map((h) => (
                <li key={`${h.kind}-${h.href}`}>
                  <Link href={h.href} className="block py-6 group">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-signal">{h.kind}</span>
                    <span className="block font-display text-xl font-bold mt-1 group-hover:text-signal transition-colors">{h.title}</span>
                    <span className="block text-fgMuted mt-1 line-clamp-2">{h.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
