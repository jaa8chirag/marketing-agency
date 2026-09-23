import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import CTASection from "@/components/ui/CTASection";
import CaseStudyCard, { capabilityNamesFor } from "@/components/ui/CaseStudyCard";
import CaseStudyGallery from "@/components/sections/CaseStudyGallery";
import Link from "next/link";
import { caseStudies, getCaseStudy, capabilities, getIndustry, relatedCaseStudies } from "@/lib/content";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const cs = getCaseStudy(params.slug);
  if (!cs) return {};
  return { title: `${cs.client} — ${cs.title}`, description: cs.summary };
}

const narrative = (cs: NonNullable<ReturnType<typeof getCaseStudy>>) => [
  { label: "Challenge", index: "01", text: cs.challenge },
  { label: "Objective", index: "02", text: cs.objective },
  { label: "Strategy", index: "03", text: cs.strategy },
  { label: "Creative", index: "04", text: cs.creative },
  { label: "Execution", index: "05", text: cs.execution },
  { label: "Technology", index: "06", text: cs.technology },
  { label: "Media", index: "07", text: cs.media },
];

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const cs = getCaseStudy(params.slug);
  if (!cs) notFound();

  const capNames = capabilityNamesFor(cs, capabilities);
  const industry = getIndustry(cs.industry);
  const related = relatedCaseStudies({ capability: cs.capabilities[0], exclude: cs.slug });

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col">
      <Header />
      <main className="w-full">
        <section className="bg-ink text-paper pt-40 pb-20 md:pt-48 md:pb-24 border-b border-lineOnInk">
          <Container>
            <nav className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider mb-8 flex-wrap text-mutedOnInk">
              <Link href="/" className="hover:text-paper transition-colors">Home</Link>
              <span>/</span>
              <Link href="/work" className="hover:text-paper transition-colors">Work</Link>
              <span>/</span>
              <span className="text-paper">{cs.client}</span>
            </nav>

            <div className="flex flex-wrap gap-2 mb-6">
              {capNames.map((name) => (
                <span key={name} className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 border border-lineOnInk text-mutedOnInk">
                  {name}
                </span>
              ))}
              {industry && (
                <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 border border-signal text-signal">
                  {industry.name}
                </span>
              )}
            </div>

            <span className="font-mono text-sm uppercase tracking-widest text-signal block mb-4">{cs.client} &middot; {cs.year}</span>
            <h1 className="font-display text-[38px] sm:text-[56px] md:text-[68px] font-bold tracking-tightest leading-[0.98] max-w-4xl text-balance mb-10">
              {cs.title}
            </h1>
            <p className="max-w-2xl text-lg text-mutedOnInk leading-relaxed">{cs.summary}</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-14 pt-10 border-t border-lineOnInk">
              {cs.results.map((r) => (
                <div key={r.label}>
                  <span className="font-display text-3xl sm:text-4xl font-bold text-paper block mb-1">{r.metric}</span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-mutedOnInk">{r.label}</span>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-20 md:py-28 border-b border-line">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12">
              <div className="hidden lg:block">
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted sticky top-32 block">
                  The story
                </span>
              </div>
              <div className="flex flex-col">
                {narrative(cs).map((section) => (
                  <Reveal key={section.label}>
                    <div className="grid grid-cols-1 sm:grid-cols-[80px_1fr] gap-4 py-10 border-b border-line">
                      <span className="font-mono text-xs font-bold text-signal">{section.index}</span>
                      <div>
                        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                          {section.label}
                        </h2>
                        <p className="text-lg text-muted leading-relaxed max-w-2xl">{section.text}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <CaseStudyGallery slug={cs.slug} client={cs.client} />

        {related.length > 0 && (
          <section className="py-20 md:py-28 border-b border-line">
            <Container>
              <Reveal>
                <Eyebrow index="H">Related case studies</Eyebrow>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {related.map((r, idx) => (
                  <Reveal key={r.slug} delay={idx * 60}>
                    <CaseStudyCard caseStudy={r} capabilityNames={capabilityNamesFor(r, capabilities)} />
                  </Reveal>
                ))}
              </div>
            </Container>
          </section>
        )}

        <CTASection eyebrow="Start a project" title="Have a similar problem? Let's start with a conversation." />
      </main>
      <Footer />
    </div>
  );
}
