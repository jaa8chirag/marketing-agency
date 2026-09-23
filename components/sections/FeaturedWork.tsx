import Link from "next/link";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import TiltCard from "@/components/ui/TiltCard";
import GenerativeArt from "@/components/ui/GenerativeArt";
import { caseStudies, capabilities } from "@/lib/content";

export default function FeaturedWork() {
  const featured = caseStudies.slice(0, 4);

  return (
    <section className="py-24 md:py-32 border-b border-edge overflow-hidden" id="work">
      <Container>
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <div>
              <Eyebrow index="03">Proof</Eyebrow>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tightest text-balance max-w-2xl">
                Work that moved a real number.
              </h2>
            </div>
            <Button href="/work" variant="outline">View all work</Button>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featured.map((cs, idx) => {
            const capName = capabilities.find((c) => c.slug === cs.capabilities[0])?.name ?? "Case Study";
            return (
              <Reveal key={cs.slug} delay={idx * 60} className={idx % 2 === 1 ? "lg:mt-16" : ""}>
                <Link href={`/work/${cs.slug}`} className="group block relative">
                  <span className="pointer-events-none select-none absolute -top-10 left-0 font-display text-[100px] sm:text-[120px] font-bold leading-none text-fg/10">
                    0{idx + 1}
                  </span>

                  <TiltCard max={5} className="relative">
                    <GenerativeArt
                      seed={cs.slug}
                      width={480}
                      height={600}
                      className="relative aspect-[4/5] w-full"
                    />
                  </TiltCard>

                  <div className="mt-5">
                    <span className="font-mono text-[10px] uppercase tracking-superwide text-fgMuted">
                      {capName}
                    </span>
                    <div className="flex items-start justify-between gap-3 mt-2">
                      <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight leading-tight">
                        {cs.client}
                      </h3>
                      <span className="shrink-0 w-9 h-9 rounded-full bg-fg text-surface flex items-center justify-center group-hover:bg-signal group-hover:text-ink group-hover:rotate-45 transition-all duration-300">
                        <span className="material-symbols-outlined text-[18px]">arrow_outward</span>
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-fgMuted leading-relaxed line-clamp-2">
                      {cs.summary}
                    </p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
