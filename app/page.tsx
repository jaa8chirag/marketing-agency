import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ClientTicker from "@/components/ClientTicker";
import Portfolio from "@/components/Portfolio";
import Capabilities from "@/components/Capabilities";
import Culture from "@/components/Culture";
import Impact from "@/components/Impact";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-darkText flex flex-col justify-between selection:bg-accentBlue selection:text-white">
      <Header />
      <main className="w-full pt-20">
        <Hero />
        <ClientTicker />
        <Portfolio />
        <Capabilities />
        <Culture />
        <Impact />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
