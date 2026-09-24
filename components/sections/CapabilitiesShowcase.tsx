"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import GenerativeArt from "@/components/ui/GenerativeArt";
import RevealOnScroll from "@/components/fx/RevealOnScroll";
import { TiltCard, TiltCardItem } from "@/components/spectrumui/tilt-card";
import { capabilities } from "@/lib/content";

export default function CapabilitiesShowcase() {
  return (
    <section className="py-24 md:py-32 border-b border-edge bg-surface" id="capabilities">
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

        {/* 3D SpectrumUI Tilt Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {capabilities.map((cap, idx) => (
            <RevealOnScroll key={cap.slug} variant="cascadeGrid" index={idx}>
              <TiltCard
                maxTilt={16}
                scale={1.035}
                perspective={1000}
                glare={true}
                glareColor="rgba(38, 214, 46, 0.12)"
                containerClassName="h-full"
                className="h-full rounded-2xl border border-lineOnInk/70 bg-ink text-paper overflow-hidden shadow-xl hover:shadow-[0_24px_50px_rgba(0,0,0,0.55)] hover:border-signal/35 transition-[border-color,box-shadow] duration-200 p-5 flex flex-col justify-between group"
              >
                <Link
                  href={`/capabilities/${cap.slug}`}
                  className="block h-full flex flex-col justify-between"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div>
                    {/* 3D Floating Visual Header with Generative Art Photography */}
                    <TiltCardItem depth={24} className="relative h-44 w-full overflow-hidden rounded-xl border border-lineOnInk/60 mb-5">
                      <GenerativeArt
                        seed={cap.slug}
                        interactive={false}
                        width={480}
                        height={360}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      {/* Specular glass reflection on hover */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      {/* Floating HUD Badges inside image */}
                      <div className="absolute inset-0 p-3.5 flex items-start justify-between pointer-events-none">
                        <TiltCardItem depth={45}>
                          <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-signal bg-ink/85 border border-lineOnInk/80 px-2.5 py-1 rounded-md shadow-md backdrop-blur-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
                            {cap.num}
                          </span>
                        </TiltCardItem>

                        <TiltCardItem depth={50}>
                          <span className="w-8 h-8 rounded-full bg-signal text-ink flex items-center justify-center font-bold shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:bg-lime">
                            <span className="material-symbols-outlined text-[18px]">arrow_outward</span>
                          </span>
                        </TiltCardItem>
                      </div>
                    </TiltCardItem>

                    {/* Card Typography & Details floating at distinctive 3D depths */}
                    <TiltCardItem depth={38}>
                      <h3 className="font-display text-xl font-bold tracking-tight leading-snug text-paper group-hover:text-signal transition-colors mb-2">
                        {cap.name}
                      </h3>
                    </TiltCardItem>

                    <TiltCardItem depth={28}>
                      <p className="font-mono text-xs text-lime/90 mb-3 line-clamp-1">
                        &ldquo;{cap.tagline}&rdquo;
                      </p>
                    </TiltCardItem>

                    <TiltCardItem depth={20}>
                      <p className="text-xs text-mutedOnInk line-clamp-2 leading-relaxed mb-4">
                        {cap.summary}
                      </p>
                    </TiltCardItem>
                  </div>

                  {/* Services Deliverables Chips floating on bottom layer */}
                  <TiltCardItem depth={32} className="pt-3 border-t border-lineOnInk/60 mt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {cap.services.slice(0, 2).map((s) => (
                        <span
                          key={s.slug}
                          className="inline-flex items-center gap-1 text-[11px] font-mono text-paper/75 bg-surfaceDim/25 border border-lineOnInk/60 rounded px-2 py-0.5"
                        >
                          <span className="w-1 h-1 rounded-full bg-signal" />
                          <span className="truncate max-w-[110px]">{s.name}</span>
                        </span>
                      ))}
                    </div>
                  </TiltCardItem>
                </Link>
              </TiltCard>
            </RevealOnScroll>
          ))}
        </div>

        <Reveal className="mt-12 flex justify-center">
          <Button href="/capabilities" variant="outline">
            View all capabilities
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
