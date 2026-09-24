"use client";

import { useRef } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Marquee from "@/components/ui/Marquee";
import GenerativeArt from "@/components/ui/GenerativeArt";
import { testimonials, clientLogos, caseStudies } from "@/lib/content";

const CARD_WIDTH = 300;

export default function SocialProof() {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: 1 | -1) {
    trackRef.current?.scrollBy({ left: direction * (CARD_WIDTH + 24), behavior: "smooth" });
  }

  return (
    <section className="border-b border-edge">
      <Marquee items={clientLogos} />
      <div className="py-24 md:py-32">
        <Container>
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
              <div>
                <Eyebrow index="05">Trusted by</Eyebrow>
                <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tightest text-balance max-w-xl">
                  Brands who&apos;ll say it better than we can.
                </h2>
              </div>
              <div className="flex gap-3 shrink-0">
                <button
                  type="button"
                  aria-label="Previous"
                  onClick={() => scrollByCard(-1)}
                  className="w-11 h-11 rounded-full border border-edge flex items-center justify-center hover:bg-ink hover:text-paper hover:border-ink transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                </button>
                <button
                  type="button"
                  aria-label="Next"
                  onClick={() => scrollByCard(1)}
                  className="w-11 h-11 rounded-full border border-edge flex items-center justify-center hover:bg-ink hover:text-paper hover:border-ink transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </Reveal>
        </Container>

        <Reveal>
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pl-6 sm:pl-10 lg:pl-14 pr-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {testimonials.map((t) => {
              const story = caseStudies.find((cs) => cs.client === t.company);

              return (
                <Link
                  key={t.person}
                  href={story ? `/work/${story.slug}` : "/work"}
                  className="group relative shrink-0 snap-start overflow-hidden bg-ink"
                  style={{ width: CARD_WIDTH, aspectRatio: "3 / 4" }}
                >
                  <GenerativeArt
                    seed={t.person}
                    width={480}
                    height={640}
                    className="absolute inset-0 w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/10" />

                  <span className="absolute top-5 left-5 font-display text-lg font-bold text-paper tracking-tight">
                    {t.company}
                  </span>

                  <span className="absolute top-5 right-5 w-9 h-9 rounded-full bg-paper text-ink flex items-center justify-center group-hover:bg-signal group-hover:rotate-45 transition-all duration-300">
                    <span className="material-symbols-outlined text-[18px]">arrow_outward</span>
                  </span>

                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="font-display text-sm leading-snug text-paper/90 mb-4 line-clamp-4">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="pt-3 border-t border-paper/20">
                      <span className="block font-mono text-[11px] uppercase tracking-wider text-signal">
                        {t.person}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}

            <div className="shrink-0 w-1 sm:w-6" aria-hidden />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
