import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Cordinit Media collects, uses and protects your data.",
};

const sections = [
  {
    title: "Information we collect",
    body: "We collect information you provide directly — through contact forms, call bookings and newsletter sign-ups — including your name, work email, company, job title and any details you share about your project. We also collect standard analytics data such as pages visited, referral source and device type.",
  },
  {
    title: "How we use your information",
    body: "We use your information to respond to enquiries, schedule calls, send requested content, and — where you've consented — send newsletter updates. We do not sell your personal data to third parties.",
  },
  {
    title: "Cookies & analytics",
    body: "We use cookies and similar technologies for essential site functionality and, with your consent, analytics and advertising measurement. You can manage cookie preferences through your browser settings at any time.",
  },
  {
    title: "Data retention",
    body: "We retain enquiry and lead data for as long as necessary to respond to your request and maintain a record of our business relationship, in line with applicable data protection law.",
  },
  {
    title: "Your rights",
    body: "You may request access to, correction of, or deletion of your personal data at any time by contacting us through the general enquiry form.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-surface text-fg flex flex-col">
      <Header />
      <main className="w-full">
        <PageHero
          eyebrow="Legal"
          title="Privacy Policy"
          description="Last updated 23 September 2026. This is a placeholder policy for the website build and should be reviewed by legal counsel before launch."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
        />
        <section className="py-20 md:py-28">
          <Container className="max-w-3xl">
            <div className="flex flex-col gap-10">
              {sections.map((s) => (
                <div key={s.title} className="border-b border-edge pb-10">
                  <h2 className="font-display text-2xl font-semibold tracking-tight mb-4">{s.title}</h2>
                  <p className="text-lg text-fgMuted leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
