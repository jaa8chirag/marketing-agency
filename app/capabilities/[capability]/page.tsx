import type { Metadata } from "next";
import { entityMetadata } from "@/lib/seo";
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
import GenerativeArt from "@/components/ui/GenerativeArt";
import { TiltCard, TiltCardItem } from "@/components/spectrumui/tilt-card";
import TrackView from "@/components/analytics/TrackView";
import {
  getCapabilities,
  getCapability,
  getIndustries,
  relatedCaseStudies,
  relatedInsights,
} from "@/lib/queries";

export async function generateStaticParams() {
  const capabilities = await getCapabilities();
  return capabilities.map((c) => ({ capability: c.slug }));
}

export async function generateMetadata({ params }: { params: { capability: string } }): Promise<Metadata> {
  const capability = await getCapability(params.capability);
  if (!capability) return {};
  return entityMetadata(capability, {
    title: capability.name,
    description: capability.summary,
    path: `/capabilities/${capability.slug}`,
  });
}

export default async function CapabilityPage({ params }: { params: { capability: string } }) {
  const capability = await getCapability(params.capability);
  if (!capability) notFound();

  const [allCapabilities, allIndustries, work, insightItems] = await Promise.all([
    getCapabilities(),
    getIndustries(),
    relatedCaseStudies({ capability: capability.slug }),
    relatedInsights({ capability: capability.slug }),
  ]);

  const relatedCaps = allCapabilities.filter((c) => c.slug !== capability.slug).slice(0, 3);
  const relatedInds = allIndustries.filter((i) => capability.industries.includes(i.slug));

  return (
    <div className="min-h-screen bg-surface text-fg flex flex-col">
      <TrackView event="capability_view" params={{ capability: capability.slug }} />
      <Header />
      <main id="main-content" className="w-full">
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
          visualImageUrl={capability.imageUrl}
          visualIndex={capability.num}
        />

        {capability.overview.length > 0 && (
          <section className="py-20 md:py-28 border-b border-edge">
            <Container>
              <Reveal>
                <Eyebrow index="00">Overview</Eyebrow>
                <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tightest max-w-3xl text-balance mb-12">
                  {capability.tagline}
                </h2>
              </Reveal>
              <Reveal delay={80} className="max-w-4xl">
                <div className="flex flex-col gap-6">
                  {capability.overview.map((para, idx) => (
                    <p key={idx} className="text-lg leading-relaxed text-fgMuted">
                      {para}
                    </p>
                  ))}
                </div>
              </Reveal>
            </Container>
          </section>
        )}

        <section className="py-20 md:py-28 border-b border-edge">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
              <div>
                <Reveal>
                  <Eyebrow index="A">Business problems we solve</Eyebrow>
                </Reveal>
                <div className="flex flex-col gap-3 mt-4">
                  {capability.problems.map((p, idx) => (
                    <Reveal key={p} delay={idx * 50}>
                      <div className="group flex items-start gap-4 p-5 rounded-xl border border-edge bg-surface hover:border-signal/50 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.06)] transition-all duration-300">
                        <span className="shrink-0 w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                          <span className="material-symbols-outlined text-[20px] text-red-500">priority_high</span>
                        </span>
                        <p className="text-base text-fg leading-relaxed pt-1.5">{p}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
              <div>
                <Reveal delay={80}>
                  <Eyebrow index="B">What you get</Eyebrow>
                </Reveal>
                <div className="flex flex-col gap-3 mt-4">
                  {capability.deliverables.map((d, idx) => (
                    <Reveal key={d} delay={80 + idx * 50}>
                      <div className="group flex items-start gap-4 p-5 rounded-xl border border-edge bg-surface hover:border-signal/50 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.06)] transition-all duration-300">
                        <span className="shrink-0 w-10 h-10 rounded-lg bg-signal/10 flex items-center justify-center">
                          <span className="material-symbols-outlined text-[20px] text-signal">check_circle</span>
                        </span>
                        <p className="text-base text-fg leading-relaxed pt-1.5">{d}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-20 md:py-28 border-b border-edge bg-surfaceMuted">
          <Container>
            <Reveal>
              <Eyebrow index="C">Services</Eyebrow>
              <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tightest max-w-2xl text-balance mb-14">
                Specialist services inside {capability.shortName}.
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {capability.services.map((s, idx) => (
                <Reveal key={s.slug} delay={idx * 40}>
                  <TiltCard
                    maxTilt={12}
                    scale={1.03}
                    perspective={850}
                    glare
                    glareColor="rgba(38, 214, 46, 0.14)"
                    containerClassName="h-full"
                    className="group h-full min-h-[220px] rounded-2xl overflow-hidden border border-edge hover:border-signal/50 transition-colors duration-300"
                  >
                    <Link
                      href={`/capabilities/${capability.slug}/${s.slug}`}
                      className="relative flex h-full w-full flex-col justify-end p-7"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <GenerativeArt
                        seed={`${capability.slug}-${s.slug}`}
                        groupHover
                        width={640}
                        height={480}
                        className="absolute inset-0 h-full w-full"
                      />
                      <TiltCardItem depth={40} className="relative z-10">
                        <h3 className="font-display text-xl font-semibold tracking-tight text-paper">{s.name}</h3>
                        <p className="text-sm text-paper/80 leading-relaxed mt-2 max-w-[85%]">{s.hook}</p>
                      </TiltCardItem>
                      <TiltCardItem depth={20} className="relative z-10">
                        <span className="inline-flex items-center gap-1.5 mt-4 font-mono text-[11px] font-bold uppercase tracking-wider text-signal opacity-0 group-hover:opacity-100 transition-opacity">
                          Explore
                          <span className="material-symbols-outlined text-[15px]">arrow_outward</span>
                        </span>
                      </TiltCardItem>
                    </Link>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {work.length > 0 && (
          <section className="py-20 md:py-28 border-b border-edge">
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
                    <CaseStudyCard caseStudy={cs} capabilityNames={capabilityNamesFor(cs, allCapabilities)} />
                  </Reveal>
                ))}
              </div>
            </Container>
          </section>
        )}

        <section className="py-20 md:py-28 border-b border-edge bg-surfaceMuted">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
              <Reveal>
                <Eyebrow index="E">Relevant industries</Eyebrow>
                <ul className="flex flex-col gap-3">
                  {relatedInds.map((ind) => (
                    <li key={ind.slug}>
                      <Link
                        href={`/industries/${ind.slug}`}
                        className="flex items-center justify-between py-4 border-b border-edge group hover:text-signal transition-colors"
                      >
                        <span className="font-display text-lg font-semibold">{ind.name}</span>
                        <span className="material-symbols-outlined text-fgMuted group-hover:text-signal group-hover:translate-x-1 transition-all">
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
                        className="flex items-center justify-between py-4 border-b border-edge group hover:text-signal transition-colors"
                      >
                        <span className="font-display text-lg font-semibold">{cap.name}</span>
                        <span className="material-symbols-outlined text-fgMuted group-hover:text-signal group-hover:translate-x-1 transition-all">
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
          <section className="py-20 md:py-28 border-b border-edge">
            <Container>
              <Reveal>
                <Eyebrow index="G">Related insights</Eyebrow>
                <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tightest max-w-2xl text-balance mb-14">
                  Perspective on {capability.shortName.toLowerCase()}.
                </h2>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {insightItems.map((insight, idx) => (
                  <InsightCard key={insight.slug} insight={insight} index={idx} />
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
