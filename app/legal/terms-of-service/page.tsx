import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing use of the Cordinit Media website.",
};

const sections = [
  {
    title: "Use of this website",
    body: "This website and its content are provided by Cordinit Media for informational purposes. By using this site, you agree not to misuse it, attempt unauthorised access, or interfere with its normal operation.",
  },
  {
    title: "Intellectual property",
    body: "All content on this site — including case studies, brand assets, copy and imagery — is the property of Cordinit Media or its clients and may not be reproduced without permission.",
  },
  {
    title: "Case studies & results",
    body: "Results referenced in case studies reflect specific client engagements and time periods. Past performance does not guarantee similar results for future engagements.",
  },
  {
    title: "Limitation of liability",
    body: "Cordinit Media provides this website on an ‘as is’ basis and is not liable for any indirect or consequential loss arising from its use.",
  },
  {
    title: "Changes to these terms",
    body: "We may update these terms from time to time. Continued use of the site after changes constitutes acceptance of the updated terms.",
  },
];

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col">
      <Header />
      <main className="w-full">
        <PageHero
          eyebrow="Legal"
          title="Terms of Service"
          description="Last updated 23 September 2026. This is a placeholder policy for the website build and should be reviewed by legal counsel before launch."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]}
        />
        <section className="py-20 md:py-28">
          <Container className="max-w-3xl">
            <div className="flex flex-col gap-10">
              {sections.map((s) => (
                <div key={s.title} className="border-b border-line pb-10">
                  <h2 className="font-display text-2xl font-semibold tracking-tight mb-4">{s.title}</h2>
                  <p className="text-lg text-muted leading-relaxed">{s.body}</p>
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
