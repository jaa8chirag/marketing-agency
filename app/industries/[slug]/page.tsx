import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import CTASection from "@/components/ui/CTASection";
import CaseStudyCard, { capabilityNamesFor } from "@/components/ui/CaseStudyCard";
import InsightCard from "@/components/ui/InsightCard";
import Link from "next/link";
import { industries, getIndustry, capabilities, relatedCaseStudies, relatedInsights } from "@/lib/content";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const industry = getIndustry(params.slug);
  if (!industry) return {};
  return { title: industry.name, description: industry.summary };
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const industry = getIndustry(params.slug);
  if (!industry) notFound();

  const relatedCaps = capabilities.filter((c) => industry.capabilities.includes(c.slug));
  const work = relatedCaseStudies({ industry: industry.slug });
  const insightItems = relatedInsights({ industry: industry.slug });

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col">
      <Header />
      <main className="w-full">
        <PageHero
          eyebrow={industry.eyebrow}
          title={industry.name}
          description={industry.summary}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Industries", href: "/industries" },
            { label: industry.name },
          ]}
          visualSeed={industry.slug}
        />

        <section className="py-20 md:py-28 border-b border-line">
          <Container>
            <Reveal>
              <Eyebrow index="A">Industry-specific challenges</Eyebrow>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {industry.challenges.map((c) => (
                  <li key={c} className="border border-line p-6 text-lg leading-relaxed">
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
          </Container>
        </section>

        <section className="py-20 md:py-28 border-b border-line bg-paperMuted">
          <Container>
            <Reveal>
              <Eyebrow index="B">Relevant capabilities</Eyebrow>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                {relatedCaps.map((cap) => (
                  <Link
                    key={cap.slug}
                    href={`/capabilities/${cap.slug}`}
                    className="group block border border-line p-6 min-h-[160px] flex flex-col justify-between hover:bg-ink hover:text-paper transition-colors"
                  >
                    <span className="font-mono text-xs font-bold text-signal">{cap.num}</span>
                    <h3 className="font-display text-lg font-semibold tracking-tight">{cap.name}</h3>
                  </Link>
                ))}
              </div>
            </Reveal>
          </Container>
        </section>

        {work.length > 0 && (
          <section className="py-20 md:py-28 border-b border-line">
            <Container>
              <Reveal>
                <Eyebrow index="C">Relevant case studies</Eyebrow>
                <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tightest max-w-2xl text-balance mb-14">
                  Proof from {industry.name.toLowerCase()}.
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

        {insightItems.length > 0 && (
          <section className="py-20 md:py-28 border-b border-line bg-paperMuted">
            <Container>
              <Reveal>
                <Eyebrow index="D">Relevant insights</Eyebrow>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {insightItems.map((insight, idx) => (
                  <Reveal key={insight.slug} delay={idx * 60}>
                    <InsightCard insight={insight} />
                  </Reveal>
                ))}
              </div>
            </Container>
          </section>
        )}

        <CTASection eyebrow="Start a project" title={`Ready to grow in ${industry.name.toLowerCase()}?`} />
      </main>
      <Footer />
    </div>
  );
}
