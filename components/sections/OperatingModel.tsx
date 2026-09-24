import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import RevealOnScroll from "@/components/fx/RevealOnScroll";
import { operatingModel } from "@/lib/content";

export default function OperatingModel() {
  return (
    <section className="py-24 md:py-32 border-b border-edge bg-ink text-paper relative overflow-hidden">
      <div className="absolute inset-0 content-grid opacity-[0.06] pointer-events-none" />
      <Container className="relative">
        <Reveal>
          <Eyebrow index="02" tone="paper">How we operate</Eyebrow>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tightest max-w-2xl text-balance mb-16">
            One model, from first brief to compounding growth.
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-t border-lineOnInk">
          {operatingModel.map((item, idx) => (
            <RevealOnScroll key={item.step} variant="slideAlternating" index={idx} staggerDelay={0.06} className="group relative h-full">
              <div className="absolute -inset-1 bg-signal blur-xl opacity-0 group-hover:opacity-35 group-hover:animate-glow-pulse transition-opacity duration-500 pointer-events-none" />
              <div className="relative shape-diagonal border-r border-b lg:border-b-0 border-lineOnInk p-6 min-h-[220px] flex flex-col justify-between bg-ink">
                <span className="font-mono text-xs text-signal font-bold">0{idx + 1}</span>
                <div>
                  <h3 className="font-display text-2xl font-semibold tracking-tight mb-3">{item.step}</h3>
                  <p className="text-sm text-mutedOnInk leading-relaxed">{item.description}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
