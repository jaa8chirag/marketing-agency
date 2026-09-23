import Link from "next/link";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import TiltCard from "@/components/ui/TiltCard";
import GenerativeArt from "@/components/ui/GenerativeArt";
import { capabilities } from "@/lib/content";

export default function CapabilitiesShowcase() {
  return (
    <section className="py-24 md:py-32 border-b border-line" id="capabilities">
      <Container>
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <div>
              <Eyebrow index="01">Capabilities</Eyebrow>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tightest text-balance max-w-2xl">
                Eight capabilities. One connected system.
              </h2>
            </div>
            <p className="max-w-sm text-muted leading-relaxed">
              Creative, technology and performance working from a single brief &mdash; not eight
              disconnected departments handing work off to each other.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-line">
          {capabilities.map((cap, idx) => (
            <Reveal key={cap.slug} delay={idx * 40}>
              <TiltCard max={6} className="h-full">
                <Link
                  href={`/capabilities/${cap.slug}`}
                  className="group relative block h-full border-r border-b border-line min-h-[280px] overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <GenerativeArt seed={cap.slug} interactive={false} width={480} height={360} className="w-full h-full" />
                  </div>
                  <div className="absolute inset-0 bg-paper/0 group-hover:bg-ink/55 transition-colors duration-500" />

                  <div className="relative z-10 p-7 h-full flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-signal group-hover:text-lime">{cap.num}</span>
                      <span className="material-symbols-outlined text-muted group-hover:text-paper opacity-0 group-hover:opacity-100 transition-opacity">
                        arrow_outward
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold tracking-tight mt-8 mb-3 leading-tight text-ink group-hover:text-paper transition-colors">
                        {cap.name}
                      </h3>
                      <p className="text-sm text-muted group-hover:text-paper/85 leading-relaxed transition-colors">
                        {cap.tagline}
                      </p>
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex justify-center">
          <Button href="/capabilities" variant="outline">View all capabilities</Button>
        </Reveal>
      </Container>
    </section>
  );
}
