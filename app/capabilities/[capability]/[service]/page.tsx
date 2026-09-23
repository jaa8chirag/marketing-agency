import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import CTASection from "@/components/ui/CTASection";
import CaseStudyCard, { capabilityNamesFor } from "@/components/ui/CaseStudyCard";
import { capabilities, getService, relatedCaseStudies } from "@/lib/content";

export function generateStaticParams() {
  return capabilities.flatMap((c) => c.services.map((s) => ({ capability: c.slug, service: s.slug })));
}

export function generateMetadata({
  params,
}: {
  params: { capability: string; service: string };
}): Metadata {
  const match = getService(params.capability, params.service);
  if (!match) return {};
  return {
    title: `${match.service.name} — ${match.capability.name}`,
    description: match.service.definition,
  };
}

export default function ServicePage({
  params,
}: {
  params: { capability: string; service: string };
}) {
  const match = getService(params.capability, params.service);
  if (!match) notFound();
  const { capability, service } = match;

  const otherServices = capability.services.filter((s) => s.slug !== service.slug);
  const work = relatedCaseStudies({ capability: capability.slug });

  return (
    <div className="min-h-screen bg-surface text-fg flex flex-col">
      <Header />
      <main className="w-full">
        <PageHero
          eyebrow={capability.name}
          title={service.name}
          description={service.definition}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Capabilities", href: "/capabilities" },
            { label: capability.name, href: `/capabilities/${capability.slug}` },
            { label: service.name },
          ]}
          visualSeed={`${capability.slug}-${service.slug}`}
          visualIndex={capability.num}
        />

        <section className="py-20 md:py-28 border-b border-edge">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-14">
              <Reveal>
                <Eyebrow index="A">Right for you if</Eyebrow>
                <ul className="flex flex-col gap-4">
                  {service.forWhen.map((f) => (
                    <li key={f} className="flex gap-4 text-lg leading-relaxed border-b border-edge pb-4">
                      <span className="material-symbols-outlined text-signal shrink-0">priority_high</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-12">
                  <Eyebrow index="B">Outcomes</Eyebrow>
                  <ul className="flex flex-col gap-4">
                    {service.outcomes.map((o) => (
                      <li key={o} className="flex gap-4 text-lg leading-relaxed border-b border-edge pb-4">
                        <span className="material-symbols-outlined text-fg shrink-0">trending_up</span>
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <Eyebrow index="C">Our approach</Eyebrow>
                <div className="flex flex-col">
                  {service.approach.map((step, idx) => (
                    <div key={step.title} className="flex gap-6 py-6 border-b border-edge">
                      <span className="font-mono text-sm font-bold text-signal shrink-0">0{idx + 1}</span>
                      <div>
                        <h3 className="font-display text-xl font-semibold tracking-tight mb-2">{step.title}</h3>
                        <p className="text-fgMuted leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        <section className="py-20 md:py-28 border-b border-edge bg-surfaceMuted">
          <Container>
            <Reveal>
              <Eyebrow index="D">Deliverables</Eyebrow>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line mt-10">
                {service.deliverables.map((d) => (
                  <div key={d} className="bg-surfaceMuted p-6 min-h-[100px] flex items-center font-display text-lg font-medium">
                    {d}
                  </div>
                ))}
              </div>
            </Reveal>
          </Container>
        </section>

        {work.length > 0 && (
          <section className="py-20 md:py-28 border-b border-edge">
            <Container>
              <Reveal>
                <Eyebrow index="E">Related work</Eyebrow>
                <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tightest max-w-2xl text-balance mb-14">
                  Proof from {capability.shortName.toLowerCase()}.
                </h2>
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

        <section className="py-20 md:py-28 border-b border-edge bg-surfaceMuted">
          <Container>
            <Reveal>
              <Eyebrow index="F">More from {capability.shortName}</Eyebrow>
              <div className="flex flex-wrap gap-3 mt-8">
                {otherServices.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/capabilities/${capability.slug}/${s.slug}`}
                    className="px-5 py-3 border border-edge font-mono text-[11px] uppercase tracking-widest font-bold hover:bg-ink hover:text-paper hover:border-ink transition-colors"
                  >
                    {s.name}
                  </Link>
                ))}
                <Link
                  href={`/capabilities/${capability.slug}`}
                  className="px-5 py-3 border border-signal text-signal font-mono text-[11px] uppercase tracking-widest font-bold hover:bg-signal hover:text-paper transition-colors"
                >
                  All of {capability.shortName} &rarr;
                </Link>
              </div>
            </Reveal>
          </Container>
        </section>

        <CTASection eyebrow="Start a project" title={`Talk to us about ${service.name.toLowerCase()}.`} />
      </main>
      <Footer />
    </div>
  );
}
