import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import CTASection from "@/components/ui/CTASection";

export const metadata: Metadata = {
  title: "About",
  description: "Who Cordinit Media is, how we operate, and how we connect to the wider Cordinit ecosystem.",
};

const values = [
  { title: "Strategy first", desc: "No creative, campaign or build starts without a defensible reason it should exist." },
  { title: "One system, not silos", desc: "Creative, production, media and performance share a brief — not a handoff document." },
  { title: "Evidence over opinion", desc: "We report on outcomes we can defend, not vanity metrics that are easy to hit." },
  { title: "Built to last", desc: "Brands, platforms and systems designed to scale without needing a rebuild in a year." },
];

const team = [
  { name: "Founding Partner", role: "Strategy & Client Partnerships" },
  { name: "Executive Creative Director", role: "Brand & Creative" },
  { name: "Head of Media", role: "Media & Performance" },
  { name: "Head of Technology", role: "Digital Experiences & Automation" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col">
      <Header />
      <main className="w-full">
        <PageHero
          eyebrow="About"
          title="A creative, media and growth company built for how modern marketing actually works."
          description="We exist because brands were tired of briefing eight different specialists in eight different rooms and hoping the work added up to something coherent."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        />

        <section className="py-20 md:py-28 border-b border-line">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
              <Reveal>
                <Eyebrow index="01">Our story</Eyebrow>
                <div className="flex flex-col gap-5 text-lg leading-relaxed text-muted">
                  <p>
                    Cordinit Media was built inside the wider Cordinit ecosystem to close a gap
                    we kept seeing across the industry: creative agencies that couldn&apos;t
                    build technology, media agencies that couldn&apos;t make anything worth
                    watching, and technology partners that never thought about brand at all.
                  </p>
                  <p>
                    We brought creative, production, digital experience, media, performance and
                    automation capability into a single operating model &mdash; not so a client
                    has to buy all of it, but so that whichever piece they need is built with
                    the rest of the system in mind.
                  </p>
                  <p>
                    That&apos;s the difference between an agency that executes a brief and a
                    partner that helps a business actually grow.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <Eyebrow index="02">Operating philosophy</Eyebrow>
                <div className="flex flex-col">
                  {values.map((v) => (
                    <div key={v.title} className="py-6 border-b border-line">
                      <h3 className="font-display text-xl font-semibold tracking-tight mb-2">{v.title}</h3>
                      <p className="text-muted leading-relaxed">{v.desc}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        <section className="py-20 md:py-28 border-b border-line bg-paperMuted">
          <Container>
            <Reveal>
              <Eyebrow index="03">Leadership</Eyebrow>
              <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tightest max-w-2xl text-balance mb-14">
                A small senior team, backed by a full operating system.
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, idx) => (
                <Reveal key={member.name} delay={idx * 50}>
                  <div className="border border-line p-6 min-h-[160px] flex flex-col justify-end bg-paper">
                    <h3 className="font-display text-lg font-semibold tracking-tight">{member.name}</h3>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-muted mt-2">{member.role}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-20 md:py-28 border-b border-line">
          <Container>
            <Reveal>
              <div className="border border-line p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                  <Eyebrow index="04">Part of Cordinit</Eyebrow>
                  <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight max-w-xl text-balance">
                    Cordinit Media is a distinct brand inside the wider Cordinit ecosystem.
                  </h2>
                </div>
                <Link
                  href="/ecosystem"
                  className="shrink-0 inline-flex items-center gap-2 px-6 py-4 bg-ink text-paper font-mono text-[11px] font-bold uppercase tracking-widest hover:bg-signal transition-colors"
                >
                  See the ecosystem
                  <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                </Link>
              </div>
            </Reveal>
          </Container>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
