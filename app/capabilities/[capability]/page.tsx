import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import CTASection from "@/components/ui/CTASection";
import CaseStudyCard, { capabilityNamesFor } from "@/components/ui/CaseStudyCard";
import InsightCard from "@/components/ui/InsightCard";
import {
  capabilities,
  getCapability,
  industries,
  relatedCaseStudies,
  relatedInsights,
} from "@/lib/content";

export function generateStaticParams() {
  return capabilities.map((c) => ({ capability: c.slug }));
}

export function generateMetadata({ params }: { params: { capability: string } }): Metadata {
  const capability = getCapability(params.capability);
  if (!capability) return {};
  return {
    title: capability.name,
    description: capability.summary,
  };
}

export default function CapabilityPage({ params }: { params: { capability: string } }) {
  const capability = getCapability(params.capability);
  if (!capability) notFound();

  const relatedCaps = capabilities.filter((c) => c.slug !== capability.slug).slice(0, 3);
  const relatedInds = industries.filter((i) => capability.industries.includes(i.slug));
  const work = relatedCaseStudies({ capability: capability.slug });
  const insightItems = relatedInsights({ capability: capability.slug });

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col">
      <Header />
      <main className="w-full">
        <PageHero
          eyebrow={`Capability ${capability.num}`}
          title={capability.name}
          description={capability.heroDescription}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Capabilities", href: "/capabilities" },
            { label: capability.name },
          ]}
          visualSeed={capability.slug}
          visualIndex={capability.num}
        />

        <section className="py-20 md:py-28 border-b border-line">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
              <Reveal>
                <Eyebrow index="A">Business problems we solve</Eyebrow>
                <ul className="flex flex-col gap-4">
                  {capability.problems.map((p) => (
                    <li key={p} className="flex gap-4 text-lg text-ink leading-relaxed border-b border-line pb-4">
                      <span className="material-symbols-outlined text-signal shrink-0">priority_high</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={80}>
                <Eyebrow index="B">What you get</Eyebrow>
                <ul className="flex flex-col gap-4">
                  {capability.deliverables.map((d) => (
                    <li key={d} className="flex gap-4 text-lg text-ink leading-relaxed border-b border-line pb-4">
                      <span className="material-symbols-outlined text-signal shrink-0">check_circle</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </Container>
        </section>

        <section className="py-20 md:py-28 border-b border-line bg-paperMuted">
          <Container>
            <Reveal>
              <Eyebrow index="C">Services</Eyebrow>
              <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tightest max-w-2xl text-balance mb-14">
                Specialist services inside {capability.shortName}.
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-l border-line">
              {capability.services.map((s, idx) => (
                <Reveal key={s.slug} delay={idx * 40}>
                  <Link
                    href={`/capabilities/${capability.slug}/${s.slug}`}
                    className="group h-full border-r border-b border-line p-7 min-h-[180px] flex flex-col justify-between hover:bg-ink hover:text-paper transition-colors duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-xl font-semibold tracking-tight">{s.name}</h3>
                      <span className="material-symbols-outlined text-muted group-hover:text-paper opacity-0 group-hover:opacity-100 transition-opacity">
                        arrow_outward
                      </span>
                    </div>
                    <p className="text-sm text-muted group-hover:text-mutedOnInk leading-relaxed mt-4">{s.hook}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {work.length > 0 && (
          <section className="py-20 md:py-28 border-b border-line">
            <Container>
              <Reveal>
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
                  <div>
                    <Eyebrow index="D">Featured work</Eyebrow>
                    <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tightest text-balance max-w-2xl">
                      {capability.shortName} in action.
                    </h2>
                  </div>
                  <Button href="/work" variant="outline">View all work</Button>
                </div>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {work.map((cs, idx) => (
                  <Reveal key={cs.slug} delay={idx * 60}>
                    <CaseStudyCard caseStudy={cs} capabilityNames={capabilityNamesFor(cs, capabilities)} />
                  </Reveal>
                ))}
              </div>
            </Container>
          </section>
        )}

        <section className="py-20 md:py-28 border-b border-line bg-paperMuted">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
              <Reveal>
                <Eyebrow index="E">Relevant industries</Eyebrow>
                <ul className="flex flex-col gap-3">
                  {relatedInds.map((ind) => (
                    <li key={ind.slug}>
                      <Link
                        href={`/industries/${ind.slug}`}
                        className="flex items-center justify-between py-4 border-b border-line group hover:text-signal transition-colors"
                      >
                        <span className="font-display text-lg font-semibold">{ind.name}</span>
                        <span className="material-symbols-outlined text-muted group-hover:text-signal group-hover:translate-x-1 transition-all">
                          arrow_forward
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={80}>
                <Eyebrow index="F">Related capabilities</Eyebrow>
                <ul className="flex flex-col gap-3">
                  {relatedCaps.map((cap) => (
                    <li key={cap.slug}>
                      <Link
                        href={`/capabilities/${cap.slug}`}
                        className="flex items-center justify-between py-4 border-b border-line group hover:text-signal transition-colors"
                      >
                        <span className="font-display text-lg font-semibold">{cap.name}</span>
                        <span className="material-symbols-outlined text-muted group-hover:text-signal group-hover:translate-x-1 transition-all">
                          arrow_forward
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </Container>
        </section>

        {insightItems.length > 0 && (
          <section className="py-20 md:py-28 border-b border-line">
            <Container>
              <Reveal>
                <Eyebrow index="G">Related insights</Eyebrow>
                <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tightest max-w-2xl text-balance mb-14">
                  Perspective on {capability.shortName.toLowerCase()}.
                </h2>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {insightItems.map((insight, idx) => (
                  <Reveal key={insight.slug} delay={idx * 60}>
                    <InsightCard insight={insight} />
                  </Reveal>
                ))}
              </div>
            </Container>
          </section>
        )}

        <CTASection
          eyebrow="Start a project"
          title={`Ready to talk about ${capability.shortName.toLowerCase()}?`}
        />
      </main>
      <Footer />
    </div>
  );
}
