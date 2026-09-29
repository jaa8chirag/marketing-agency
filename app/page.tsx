import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HomeHero from "@/components/sections/HomeHero";
import ClientNeedMapper from "@/components/sections/ClientNeedMapper";
import CapabilitiesShowcase from "@/components/sections/CapabilitiesShowcase";
import OperatingModel from "@/components/sections/OperatingModel";
import FeaturedWork from "@/components/sections/FeaturedWork";
import IndustriesTeaser from "@/components/sections/IndustriesTeaser";
import SocialProof from "@/components/sections/SocialProof";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import EcosystemModule from "@/components/sections/EcosystemModule";
import InsightsTeaser from "@/components/sections/InsightsTeaser";
import CTASection from "@/components/ui/CTASection";
import { getCapabilities, getIndustries, getInsights, getClientLogos, getTestimonials } from "@/lib/queries";

export default async function Home() {
  const [capabilities, industries, insights, clientLogos, testimonials] = await Promise.all([
    getCapabilities(),
    getIndustries(),
    getInsights(),
    getClientLogos(),
    getTestimonials(),
  ]);

  return (
    <div className="min-h-screen bg-surface text-fg flex flex-col">
      <Header />
      <main id="main-content" className="relative z-20 w-full bg-surface shadow-[0_50px_100px_rgba(0,0,0,0.9)]">
        <HomeHero />
        <ClientNeedMapper capabilities={capabilities} />
        <CapabilitiesShowcase capabilities={capabilities} />
        <OperatingModel />
        <FeaturedWork />
        <IndustriesTeaser industries={industries} />
        <SocialProof clientLogos={clientLogos} />
        <TestimonialsSection testimonials={testimonials} />
        <InsightsTeaser insights={insights} />
        <EcosystemModule />
        <CTASection ctaKey="default" />
      </main>
      <Footer />
    </div>
  );
}
