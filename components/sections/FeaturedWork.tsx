import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import CaseStudyCard, { capabilityNamesFor } from "@/components/ui/CaseStudyCard";
import { caseStudies, capabilities } from "@/lib/content";

export default function FeaturedWork() {
  const featured = caseStudies.slice(0, 3);

  return (
    <section className="py-24 md:py-32 border-b border-line" id="work">
      <Container>
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <div>
              <Eyebrow index="03">Proof</Eyebrow>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tightest text-balance max-w-2xl">
                Work that moved a real number.
              </h2>
            </div>
            <Button href="/work" variant="outline">View all work</Button>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((cs, idx) => (
            <Reveal key={cs.slug} delay={idx * 60}>
              <CaseStudyCard caseStudy={cs} capabilityNames={capabilityNamesFor(cs, capabilities)} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
