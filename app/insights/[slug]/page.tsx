import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import CTASection from "@/components/ui/CTASection";
import InsightCard from "@/components/ui/InsightCard";
import { insights, getInsight, getCapability, relatedInsights } from "@/lib/content";

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const insight = getInsight(params.slug);
  if (!insight) return {};
  return { title: insight.title, description: insight.summary };
}

export default function InsightPage({ params }: { params: { slug: string } }) {
  const insight = getInsight(params.slug);
  if (!insight) notFound();

  const capability = insight.capability ? getCapability(insight.capability) : undefined;
  const related = relatedInsights({ capability: insight.capability, exclude: insight.slug });

  return (
    <div className="min-h-screen bg-surface text-fg flex flex-col">
      <Header />
      <main className="w-full">
        <section className="pt-40 pb-16 md:pt-48 md:pb-20 border-b border-edge">
          <Container>
            <nav className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider mb-8 flex-wrap text-fgMuted">
              <Link href="/" className="hover:text-fg transition-colors">Home</Link>
              <span>/</span>
              <Link href="/insights" className="hover:text-fg transition-colors">Insights</Link>
              <span>/</span>
              <span className="text-fg">{insight.type}</span>
            </nav>

            <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 border border-signal text-signal inline-block mb-6">
              {insight.type}
            </span>
            <h1 className="font-display text-[34px] sm:text-[50px] md:text-[60px] font-bold tracking-tightest leading-[1.02] max-w-4xl text-balance mb-8">
              {insight.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase tracking-wider text-fgMuted">
              <span>{insight.author}</span>
              <span>&middot;</span>
              <span>{insight.date}</span>
              <span>&middot;</span>
              <span>{insight.readingTime}</span>
              {capability && (
                <>
                  <span>&middot;</span>
                  <Link href={`/capabilities/${capability.slug}`} className="hover:text-signal transition-colors">
                    {capability.name}
                  </Link>
                </>
              )}
            </div>
          </Container>
        </section>

        <section className="py-16 md:py-24 border-b border-edge">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-14">
              <Reveal className="max-w-2xl">
                <p className="text-xl leading-relaxed text-fg mb-10 font-medium">{insight.summary}</p>
                <div className="flex flex-col gap-6">
                  {insight.body.map((para, idx) => (
                    <p key={idx} className="text-lg leading-relaxed text-fgMuted">
                      {para}
                    </p>
                  ))}
                </div>
              </Reveal>

              <div className="hidden lg:flex flex-col gap-6 sticky top-32 h-fit">
                <span className="font-mono text-[11px] uppercase tracking-wider text-fgMuted">Share</span>
                <div className="flex flex-col gap-3">
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=https://cordinitmedia.com/insights/${insight.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-3 border border-edge font-mono text-[11px] uppercase tracking-widest font-bold hover:bg-ink hover:text-paper hover:border-ink transition-colors text-center"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=https://cordinitmedia.com/insights/${insight.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-3 border border-edge font-mono text-[11px] uppercase tracking-widest font-bold hover:bg-ink hover:text-paper hover:border-ink transition-colors text-center"
                  >
                    X / Twitter
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {related.length > 0 && (
          <section className="py-20 md:py-28 border-b border-edge bg-surfaceMuted">
            <Container>
              <Reveal>
                <Eyebrow index="R">Related insights</Eyebrow>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {related.map((i, idx) => (
                  <Reveal key={i.slug} delay={idx * 60}>
                    <InsightCard insight={i} />
                  </Reveal>
                ))}
              </div>
            </Container>
          </section>
        )}

        <CTASection eyebrow="Start a project" title="Ready to put this thinking into practice?" />
      </main>
      <Footer />
    </div>
  );
}
