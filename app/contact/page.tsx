import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import ContactExperience from "@/components/sections/ContactExperience";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a call with Cordinit Media, or send a general enquiry about your project.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-surface text-fg flex flex-col">
      <Header />
      <main className="w-full">
        <PageHero
          eyebrow="Start a Project"
          title="Let's talk about what you're building."
          description="Book a call directly, or send a general enquiry and we'll route it to the right specialists."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        />
        <section className="py-20 md:py-28">
          <Container>
            <Suspense fallback={null}>
              <ContactExperience />
            </Suspense>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
