import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import CTASection from "@/components/ui/CTASection";
import Reveal from "@/components/ui/Reveal";
import { getCapabilities } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Solutions",
  description: "Start from what you want to achieve — build, grow, transform or connect — and we'll map it to the right capabilities and proof.",
  alternates: { canonical: "/solutions" },
};

// Outcome-led entry layer from the navigation workbook's mega-menu model:
// Solutions answers "what do you want to achieve", Capabilities answers "how
// can we help". Each solution points at real capabilities by slug.
const solutions = [
  {
    key: "build",
    name: "Build",
    outcome: "Create a brand and experience people remember.",
    problem: "I need a new or stronger brand, website or digital product.",
    capabilities: ["brand-creative", "digital-experiences"],
  },
  {
    key: "grow",
    name: "Grow",
    outcome: "Generate demand, leads and revenue you can measure.",
    problem: "I need more visibility, leads or sales.",
    capabilities: ["digital-marketing", "media", "performance-marketing", "commerce-growth"],
  },
  {
    key: "transform",
    name: "Transform",
    outcome: "Use automation and AI practically across marketing.",
    problem: "I want to automate work and use AI without the hype.",
    capabilities: ["automation-ai", "performance-marketing"],
  },
  {
    key: "connect",
    name: "Connect",
    outcome: "Reach audiences with content and creators that resonate.",
    problem: "I need content, video and creators that connect with people.",
    capabilities: ["content-production", "digital-marketing"],
  },
];

export default async function SolutionsPage() {
  const capabilities = await getCapabilities();
  const bySlug = new Map(capabilities.map((c) => [c.slug, c]));

  return (
    <div className="min-h-screen bg-surface text-fg flex flex-col">
      <Header />
      <main id="main-content" className="w-full">
        <PageHero
          eyebrow="Solutions"
          title="Start with what you want to achieve."
          description="Four ways in. Each connects to the capabilities, work and insights that prove it."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Solutions" }]}
          visualSeed="solutions"
        />
        <section className="py-20 md:py-28">
          <Container>
            <div className="grid gap-8 md:grid-cols-2">
              {solutions.map((s, i) => (
                <Reveal key={s.key}>
                  <article id={s.key} className="h-full border border-edge p-8 flex flex-col gap-5">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-signal">0{i + 1} · {s.name}</span>
                    <h2 className="font-display text-3xl font-bold tracking-tightest text-balance">{s.outcome}</h2>
                    <p className="text-fgMuted">“{s.problem}”</p>
                    <ul className="mt-auto flex flex-col gap-2">
                      {s.capabilities.map((slug) => {
                        const cap = bySlug.get(slug);
                        if (!cap) return null;
                        return (
                          <li key={slug}>
                            <Link href={`/capabilities/${slug}`} className="inline-flex items-center gap-2 font-bold hover:text-signal transition-colors">
                              {cap.name} <span aria-hidden="true">→</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
        <CTASection ctaKey="default" />
      </main>
      <Footer />
    </div>
  );
}
