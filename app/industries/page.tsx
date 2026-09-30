import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import GenerativeArt from "@/components/ui/GenerativeArt";
import CTASection from "@/components/ui/CTASection";
import TrackedLink from "@/components/analytics/TrackedLink";
import { getIndustries, getCapabilities } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Industries",
  description: "Industry context connected to relevant capabilities, services and proof of work.",
  alternates: { canonical: "/industries" },
};

export default async function IndustriesPage() {
  const [industries, capabilities] = await Promise.all([getIndustries(), getCapabilities()]);
  return (
    <div className="min-h-screen bg-surface text-fg flex flex-col">
      <Header />
      <main id="main-content" className="w-full">
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
                    <TrackedLink
                      href={`/industries/${ind.slug}`}
                      event="industry_explore"
                      params={{ industry: ind.slug, location: "industries-listing" }}
                      className="group relative overflow-hidden border border-edge p-8 min-h-[280px] flex flex-col justify-between hover:border-signal/50 transition-colors duration-300"
                    >
                      <GenerativeArt
                        seed={ind.slug}
                        imageUrl={ind.imageUrl}
                        interactive={false}
                        width={640}
                        height={400}
                        className="absolute inset-0 w-full h-full opacity-0 scale-110 grayscale transition-[opacity,transform] duration-700 ease-out group-hover:opacity-100 group-hover:scale-100"
                      />
                      <div className="absolute inset-0 bg-surface/92 group-hover:bg-ink/80 transition-colors duration-300" />
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="font-mono text-[11px] uppercase tracking-wider text-fgMuted group-hover:text-mutedOnInk">
                          {ind.eyebrow}
                        </span>
                        <span className="material-symbols-outlined text-fgMuted group-hover:text-paper opacity-0 group-hover:opacity-100 transition-opacity">
                          arrow_outward
                        </span>
                      </div>
                      <div className="relative z-10">
                        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-4 group-hover:text-paper transition-colors">
                          {ind.name}
                        </h2>
                        <p className="text-fgMuted group-hover:text-mutedOnInk text-sm leading-relaxed mb-6 transition-colors">
                          {ind.summary}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {caps.map((c) => (
                            <span
                              key={c.slug}
                              className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 border border-edge group-hover:border-lineOnInk group-hover:text-paper transition-colors"
                            >
                              {c.shortName}
                            </span>
                          ))}
                        </div>
                      </div>
                    </TrackedLink>
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
