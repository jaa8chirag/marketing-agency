import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import CTASection from "@/components/ui/CTASection";
import { capabilities } from "@/lib/content";

export const metadata: Metadata = {
  title: "Ecosystem",
  description: "How Cordinit, Cordinit Technology and Cordinit Media relate — and how future specialist businesses join the ecosystem.",
};

export default function EcosystemPage() {
  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col">
      <Header />
      <main className="w-full">
        <PageHero
          eyebrow="Ecosystem"
          title="Independent brands. One shared operating system."
          description="Cordinit Media isn't a department inside a holding company — it's a distinct business with its own identity, operating inside a group that gives it technology, infrastructure and reach it couldn't build alone."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Ecosystem" }]}
        />

        <section className="py-20 md:py-28 border-b border-line">
          <Container>
            <div className="flex flex-col">
              <Reveal>
                <div className="border border-line p-8 md:p-10 mb-[-1px]">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Parent ecosystem</span>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mt-4 mb-4">Cordinit</h2>
                  <p className="text-lg text-muted leading-relaxed max-w-2xl">
                    The group that brings capital, technology infrastructure and operating
                    discipline to every business inside it &mdash; so specialist businesses can
                    focus entirely on their craft.
                  </p>
                </div>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <Reveal delay={60}>
                  <div className="border border-line p-8 md:p-10 h-full">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Sibling business</span>
                    <h3 className="font-display text-2xl font-bold tracking-tight mt-4 mb-4">Cordinit Technology</h3>
                    <p className="text-muted leading-relaxed">
                      Technology, transformation and engineering &mdash; the infrastructure
                      partner powering platforms across the ecosystem, including the
                      technical foundation behind Cordinit Media&apos;s own digital work.
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={100}>
                  <div className="border border-line border-t-0 md:border-t md:border-l-0 p-8 md:p-10 h-full bg-ink text-paper">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-signal">You are here</span>
                    <h3 className="font-display text-2xl font-bold tracking-tight mt-4 mb-4">Cordinit Media</h3>
                    <p className="text-mutedOnInk leading-relaxed">
                      Creative, media, production and growth &mdash; helping ambitious brands
                      build, launch, market and scale in a connected digital world.
                    </p>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={140}>
                <div className="border border-line border-t-0 p-8 md:p-10 border-dashed">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Future</span>
                  <h3 className="font-display text-2xl font-bold tracking-tight mt-4 mb-4">
                    Future specialist &amp; acquired businesses
                  </h3>
                  <p className="text-muted leading-relaxed max-w-2xl">
                    The ecosystem is designed to welcome new specialist or acquired businesses
                    over time &mdash; each retaining its own brand equity while gaining access
                    to Cordinit&apos;s technology, infrastructure, clients and talent. No such
                    businesses exist yet; this space is reserved for what comes next.
                  </p>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        <section className="py-20 md:py-28 border-b border-line bg-paperMuted">
          <Container>
            <Reveal>
              <Eyebrow index="01">What Cordinit Media brings</Eyebrow>
              <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tightest max-w-2xl text-balance mb-14">
                Eight capabilities, connected to the ecosystem&apos;s infrastructure.
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line">
              {capabilities.map((cap) => (
                <div key={cap.slug} className="bg-paperMuted p-6 min-h-[140px] flex flex-col justify-between">
                  <span className="font-mono text-xs font-bold text-signal">{cap.num}</span>
                  <h3 className="font-display text-lg font-semibold tracking-tight">{cap.name}</h3>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <CTASection eyebrow="Work with the ecosystem" title="Interested in what Cordinit Media and Cordinit Technology can build together?" />
      </main>
      <Footer />
    </div>
  );
}
