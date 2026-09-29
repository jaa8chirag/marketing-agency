import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import CTASection from "@/components/ui/CTASection";
import InsightsGrid from "@/components/sections/InsightsGrid";
import { getInsights, getCapabilities } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Insights",
  description: "Articles, guides, reports, perspectives and video from Cordinit Media — filtered by capability and content type.",
  alternates: { canonical: "/insights" },
};

export default async function InsightsPage() {
  const [insights, capabilities] = await Promise.all([getInsights(), getCapabilities()]);
  return (
    <div className="min-h-screen bg-surface text-fg flex flex-col">
      <Header />
      <main id="main-content" className="w-full">
        <PageHero
          eyebrow="Insights"
          title="What we're learning, in public."
          description="Articles, guides, reports and perspectives from the people doing the work — filter by capability or format."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Insights" }]}
          visualSeed="insights-hub"
        />
        <section className="py-20 md:py-28">
          <Container>
            <InsightsGrid insights={insights} capabilities={capabilities} />
          </Container>
        </section>
        <CTASection
          eyebrow="Newsletter"
          title="Get insights like these before we publish them anywhere else."
          description="One email when something's genuinely worth reading. No spam, unsubscribe anytime."
          variant="newsletter"
        />
      </main>
      <Footer />
    </div>
  );
}
