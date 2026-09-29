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
  title: "Careers",
  description: "Open roles and culture at Cordinit Media.",
  alternates: { canonical: "/careers" },
};

const openRoles = [
  { title: "Senior Art Director", team: "Brand & Creative", location: "Hybrid" },
  { title: "Performance Marketing Manager", team: "Performance Marketing", location: "Remote" },
  { title: "Front-End Engineer", team: "Digital Experiences", location: "Hybrid" },
  { title: "Video Editor", team: "Content & Production", location: "On-site" },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-surface text-fg flex flex-col">
      <Header />
      <main id="main-content" className="w-full">
        <PageHero
          eyebrow="Careers"
          title="Build the system, not just the campaign."
          description="We're looking for specialists who want their craft to sit inside a bigger, connected story — not disappear into a silo."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]}
        />

        <section className="py-20 md:py-28 border-b border-edge">
          <Container>
            <Reveal>
              <Eyebrow index="01">Open roles</Eyebrow>
            </Reveal>
            <div className="grid grid-cols-1 border-t border-edge mt-8">
              {openRoles.map((role, idx) => (
                <Reveal key={role.title} delay={idx * 40}>
                  <Link
                    href="/contact"
                    className="group relative overflow-hidden grid grid-cols-1 sm:grid-cols-[1fr_auto_auto_auto] items-center gap-4 py-7 border-b border-edge hover:border-signal/50 transition-colors duration-300"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 origin-left scale-x-0 bg-signal/[0.05] transition-transform duration-500 ease-out group-hover:scale-x-100"
                    />
                    <h3 className="font-display text-xl font-semibold tracking-tight group-hover:text-signal group-hover:translate-x-1 transition-[color,transform]">
                      {role.title}
                    </h3>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-fgMuted">{role.team}</span>
                    <span className="font-mono text-[11px] uppercase tracking-wider px-3 py-1.5 border border-edge text-fgMuted w-fit group-hover:border-signal/50">
                      {role.location}
                    </span>
                    <span className="material-symbols-outlined text-fgMuted opacity-0 group-hover:opacity-100 group-hover:text-signal group-hover:translate-x-1 transition-all justify-self-end">
                      arrow_outward
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
            <p className="mt-10 font-mono text-xs text-fgMuted uppercase tracking-wider">
              Don&apos;t see the right role? Send a general enquiry via the contact page and tell us where you&apos;d fit.
            </p>
          </Container>
        </section>

        <CTASection eyebrow="Get in touch" title="Interested in joining the team?" description="Reach out through general enquiry and tell us about yourself." />
      </main>
      <Footer />
    </div>
  );
}
