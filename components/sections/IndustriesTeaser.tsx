"use client";

import React from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import GenerativeArt from "@/components/ui/GenerativeArt";
import RevealOnScroll from "@/components/fx/RevealOnScroll";
import { TiltCard, TiltCardItem } from "@/components/spectrumui/tilt-card";
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {industries.map((ind, idx) => (
            <RevealOnScroll
              key={ind.slug}
              variant="cascadeGrid"
              index={idx}
              className="h-full"
            >
              <TiltCard
                maxTilt={18}
                perspective={750}
                scale={1.04}
                glare={true}
                glareColor="rgba(38, 214, 46, 0.16)"
                className="w-full p-6 flex flex-col justify-between group cursor-pointer border border-neutral-200 dark:border-neutral-800 bg-surface dark:bg-ink rounded-2xl shadow-xl hover:shadow-[0_30px_60px_rgba(0,0,0,0.6)] transition-[border-color,box-shadow] duration-200"
                containerClassName="w-full h-full"
              >
                <Link
                  href={`/industries/${ind.slug}`}
                  className="block w-full h-full flex flex-col justify-between"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Depth 45: Title */}
                  <TiltCardItem
                    depth={45}
                    className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 group-hover:text-signal transition-colors"
                  >
                    {ind.name}
                  </TiltCardItem>

                  {/* Depth 25: Subtitle / Summary */}
                  <TiltCardItem
                    depth={25}
                    className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 min-h-[40px] leading-relaxed"
                  >
                    {ind.summary}
                  </TiltCardItem>

                  {/* Depth 120: Visual Image pops dramatically forward in 3D */}
                  <TiltCardItem
                    depth={120}
                    className="mt-5"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div
                      className="relative h-60 w-full rounded-xl overflow-hidden border border-neutral-200/80 dark:border-neutral-700 bg-ink shadow-[0_16px_32px_rgba(0,0,0,0.35)] group-hover:shadow-[0_36px_70px_-10px_rgba(0,0,0,0.95)] group-hover:border-signal/50 transition-all duration-300"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <GenerativeArt
                        seed={ind.slug}
                        interactive={false}
                        width={640}
                        height={416}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      {/* Ambient lighting highlight on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  </TiltCardItem>
                </Link>
              </TiltCard>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
