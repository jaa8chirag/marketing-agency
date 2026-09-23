import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import CTASection from "@/components/ui/CTASection";
import { industries, capabilities } from "@/lib/content";

export const metadata: Metadata = {
  title: "Industries",
  description: "Industry context connected to relevant capabilities, services and proof of work.",
};

export default function IndustriesPage() {
  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col">
      <Header />
      <main className="w-full">
        <PageHero
          eyebrow="Industries"
          title="Context matters as much as capability."
          description="Every category has different buyers, cycles and constraints. Here's how our capabilities apply to the industries we work in most."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Industries" }]}
          visualSeed="industries-hub"
        />

        <section className="py-20 md:py-28">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {industries.map((ind, idx) => {
                const caps = capabilities.filter((c) => ind.capabilities.includes(c.slug));
                return (
                  <Reveal key={ind.slug} delay={idx * 50}>
                    <Link
                      href={`/industries/${ind.slug}`}
                      className="group block border border-line p-8 min-h-[280px] flex flex-col justify-between hover:bg-ink hover:text-paper transition-colors duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] uppercase tracking-wider text-muted group-hover:text-mutedOnInk">
                          {ind.eyebrow}
                        </span>
                        <span className="material-symbols-outlined text-muted group-hover:text-paper opacity-0 group-hover:opacity-100 transition-opacity">
                          arrow_outward
                        </span>
                      </div>
                      <div>
                        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                          {ind.name}
                        </h2>
                        <p className="text-muted group-hover:text-mutedOnInk text-sm leading-relaxed mb-6">
                          {ind.summary}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {caps.map((c) => (
                            <span
                              key={c.slug}
                              className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 border border-line group-hover:border-lineOnInk"
                            >
                              {c.shortName}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </Container>
        </section>

        <CTASection eyebrow="Don't see your industry?" title="We work with ambitious brands in every category." />
      </main>
      <Footer />
    </div>
  );
}
