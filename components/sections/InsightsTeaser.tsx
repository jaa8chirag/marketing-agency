import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import InsightCard from "@/components/ui/InsightCard";
import { insights } from "@/lib/content";

export default function InsightsTeaser() {
  const featured = insights.slice(0, 3);

  return (
    <section className="py-24 md:py-32 border-b border-edge bg-surfaceMuted">
      <Container>
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <div>
              <Eyebrow index="07">Insights</Eyebrow>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tightest text-balance max-w-2xl">
                Perspective from the people doing the work.
              </h2>
            </div>
            <Button href="/insights" variant="outline">Visit the insights hub</Button>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((insight, idx) => (
            <InsightCard key={insight.slug} insight={insight} index={idx} />
          ))}
        </div>
      </Container>
    </section>
  );
}
