import Link from "next/link";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import GenerativeArt from "@/components/ui/GenerativeArt";
import { industries } from "@/lib/content";

export default function IndustriesTeaser() {
  return (
    <section className="py-24 md:py-32 border-b border-edge bg-surfaceMuted">
      <Container>
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <div>
              <Eyebrow index="04">Industries</Eyebrow>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tightest text-balance max-w-2xl">
                Context matters. We build around your category.
              </h2>
            </div>
            <Button href="/industries" variant="outline">View all industries</Button>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line">
          {industries.map((ind, idx) => (
            <Reveal key={ind.slug} delay={idx * 40}>
              <Link
                href={`/industries/${ind.slug}`}
                className="group relative h-full overflow-hidden p-7 min-h-[200px] flex flex-col justify-between"
              >
                <div className="absolute inset-0 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                  <GenerativeArt seed={ind.slug} interactive={false} width={480} height={320} className="w-full h-full" />
                </div>
                <div className="absolute inset-0 bg-surfaceMuted/50 group-hover:bg-ink/55 transition-colors duration-500" />

                <span className="relative z-10 material-symbols-outlined text-fgMuted group-hover:text-paper opacity-0 group-hover:opacity-100 transition-opacity self-end">
                  arrow_outward
                </span>
                <h3 className="relative z-10 font-display text-xl font-semibold tracking-tight leading-snug text-fg group-hover:text-paper transition-colors">
                  {ind.name}
                </h3>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
