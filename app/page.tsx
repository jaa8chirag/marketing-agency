import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HomeHero from "@/components/sections/HomeHero";
import ClientNeedMapper from "@/components/sections/ClientNeedMapper";
import CapabilitiesShowcase from "@/components/sections/CapabilitiesShowcase";
import OperatingModel from "@/components/sections/OperatingModel";
import FeaturedWork from "@/components/sections/FeaturedWork";
import IndustriesTeaser from "@/components/sections/IndustriesTeaser";
import SocialProof from "@/components/sections/SocialProof";
import EcosystemModule from "@/components/sections/EcosystemModule";
import InsightsTeaser from "@/components/sections/InsightsTeaser";
import CTASection from "@/components/ui/CTASection";

export default function Home() {
  return (
    <div className="min-h-screen bg-surface text-fg flex flex-col">
      <Header />
      <main className="relative z-20 w-full bg-surface shadow-[0_50px_100px_rgba(0,0,0,0.9)]">
        <HomeHero />
        <ClientNeedMapper />
        <CapabilitiesShowcase />
        <OperatingModel />
        <FeaturedWork />
        <IndustriesTeaser />
        <SocialProof />
        <InsightsTeaser />
        <EcosystemModule />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
