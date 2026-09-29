import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import CTASection from "@/components/ui/CTASection";
import WorkGrid from "@/components/sections/WorkGrid";
import { getCaseStudies, getCapabilities, getIndustries } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies filtered by capability, service and industry — client, challenge, strategy and results.",
  alternates: { canonical: "/work" },
};

export default async function WorkPage() {
  const [caseStudies, capabilities, industries] = await Promise.all([
    getCaseStudies(),
    getCapabilities(),
    getIndustries(),
  ]);
  return (
    <div className="min-h-screen bg-surface text-fg flex flex-col">
      <Header />
      <main id="main-content" className="w-full">
        <PageHero
          eyebrow="Work"
          title="Proof, not promises."
          description="Every engagement here moved a real business metric — filter by capability or industry to find the closest parallel to your own."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Work" }]}
          visualSeed="work-hub"
        />
        <section className="py-20 md:py-28">
          <Container>
            <WorkGrid caseStudies={caseStudies} capabilities={capabilities} industries={industries} />
          </Container>
        </section>
        <CTASection eyebrow="Start a project" title="Want results like these? Let's talk about your brief." />
      </main>
      <Footer />
    </div>
  );
}
