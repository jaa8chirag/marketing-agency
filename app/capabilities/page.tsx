import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import CTASection from "@/components/ui/CTASection";
import CapabilitiesAccordion from "@/components/sections/CapabilitiesAccordion";
import { getCapabilities } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Eight connected capabilities — Brand & Creative, Content & Production, Digital Experiences, Digital Marketing, Media, Performance Marketing, Automation & AI, Commerce & Growth.",
  alternates: { canonical: "/capabilities" },
};

export default async function CapabilitiesPage() {
  const capabilities = await getCapabilities();
  return (
    <div className="min-h-screen bg-surface text-fg flex flex-col">
      <Header />
      <main id="main-content" className="w-full">
        <PageHero
          eyebrow="Capabilities"
          title="Eight capabilities, working as one system."
          description="Every engagement starts with the problem, not the department. These are the capabilities we bring together to solve it — individually or fully integrated. Open a row to preview it."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Capabilities" }]}
        />

        <section className="py-20 md:py-28">
          <Container>
            <CapabilitiesAccordion capabilities={capabilities} />
          </Container>
        </section>

        <CTASection
          eyebrow="Not sure where to start?"
          title="Tell us the outcome you need. We'll bring the right capabilities together."
        />
      </main>
      <Footer />
    </div>
  );
}
