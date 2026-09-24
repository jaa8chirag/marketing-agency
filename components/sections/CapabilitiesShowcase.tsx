import Link from "next/link";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import GenerativeArt from "@/components/ui/GenerativeArt";
import RevealOnScroll from "@/components/fx/RevealOnScroll";
import { TiltCard, TiltCardItem } from "@/components/spectrumui/tilt-card";
import { capabilities } from "@/lib/content";

// Surface reset: the spectrumui default is a plain white/neutral rounded
// card — stripped here so only our own shape-notch + overlays are visible,
// with the real depth-tilt/glare mechanics from the component underneath.
const TILT_SURFACE = "h-full rounded-none border-0 bg-transparent shadow-none p-0 dark:border-0 dark:bg-transparent dark:shadow-none";

export default function CapabilitiesShowcase() {
  return (
    <section className="py-24 md:py-32 border-b border-edge" id="capabilities">
      <Container>
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <div>
              <Eyebrow index="01">Capabilities</Eyebrow>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tightest text-balance max-w-2xl">
                Eight capabilities. One connected system.
              </h2>
            </div>
            <p className="max-w-sm text-fgMuted leading-relaxed">
              Creative, technology and performance working from a single brief &mdash; not eight
              disconnected departments handing work off to each other.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-edge">
          {capabilities.map((cap, idx) => (
            <RevealOnScroll key={cap.slug} variant="cascadeGrid" index={idx}>
              <TiltCard
                maxTilt={10}
                scale={1.015}
                glareColor="rgba(38, 214, 46, 0.35)"
                containerClassName="h-full"
                className={TILT_SURFACE}
              >
                <Link
                  href={`/capabilities/${cap.slug}`}
                  className="group relative block h-full shape-notch border-r border-b border-edge min-h-[280px] overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                    <GenerativeArt seed={cap.slug} interactive={false} width={480} height={360} className="w-full h-full" />
                  </div>
                  <div className="absolute inset-0 bg-surface/50 group-hover:bg-ink/55 transition-colors duration-500" />

                  <div
                    className="relative z-10 p-7 h-full flex flex-col justify-between"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="flex items-center justify-between">
                      <TiltCardItem depth={22}>
                        <span className="font-mono text-xs font-bold text-signal group-hover:text-lime">{cap.num}</span>
                      </TiltCardItem>
                      <TiltCardItem depth={28}>
                        <span className="material-symbols-outlined text-fgMuted group-hover:text-paper opacity-0 group-hover:opacity-100 transition-opacity">
                          arrow_outward
                        </span>
                      </TiltCardItem>
                    </div>
                    <div>
                      <TiltCardItem depth={42}>
                        <h3 className="font-display text-xl font-semibold tracking-tight mt-8 mb-3 leading-tight text-fg group-hover:text-paper transition-colors">
                          {cap.name}
                        </h3>
                      </TiltCardItem>
                      <TiltCardItem depth={26}>
                        <p className="text-sm text-fgMuted group-hover:text-paper/85 leading-relaxed transition-colors">
                          {cap.tagline}
                        </p>
                      </TiltCardItem>
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </RevealOnScroll>
          ))}
        </div>

        <Reveal className="mt-10 flex justify-center">
          <Button href="/capabilities" variant="outline">View all capabilities</Button>
        </Reveal>
      </Container>
    </section>
  );
}
