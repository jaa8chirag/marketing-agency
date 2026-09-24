"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import GenerativeArt from "@/components/ui/GenerativeArt";
import { insights } from "@/lib/content";

const accordionMeta = [
  { label: "Think", category: "Strategy & Model" },
  { label: "Create", category: "Automation & AI" },
  { label: "Launch", category: "Media Benchmarks" },
  { label: "Build", category: "Film & Content" },
  { label: "Scale", category: "Search & Systems" },
  { label: "Grow", category: "Commerce & CRO" },
];

export default function InsightsTeaser() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Take the 6 insights to match the 6 columns in the reference image
  const items = insights.slice(0, 6);

  return (
    <section className="py-24 md:py-32 border-b border-edge bg-[#0d0d0d] text-paper overflow-hidden" id="insights">
      <Container>
        {/* Section Header: Matching project design system */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 md:mb-16">
          <div>
            <Eyebrow index="07">Insights</Eyebrow>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tightest text-balance max-w-2xl">
              Perspective from the people doing the work.
            </h2>
          </div>
          <Button href="/insights" variant="outline">
            Visit the insights hub
          </Button>
        </div>

        {/* ──────────────────────────────────────────────────────────────
            DESKTOP VIEW: 6-Column Interactive Expanding Accordion
           ────────────────────────────────────────────────────────────── */}
        <div className="hidden md:flex w-full h-[620px] rounded-3xl overflow-hidden bg-[#121212] border border-neutral-800 shadow-2xl">
          {items.map((item, idx) => {
            const isActive = activeIndex === idx;
            const meta = accordionMeta[idx] ?? { label: "Insight", category: "Editorial" };
            const numStr = `0${idx + 1}`;

            return (
              <div
                key={item.slug}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                className={`relative h-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex cursor-pointer select-none border-r border-signal/80 last:border-r-0 ${
                  isActive
                    ? "flex-[5] bg-[#141414] cursor-default"
                    : "flex-[0.8] hover:flex-[1.1] bg-[#0f0f0f] hover:bg-[#161616]"
                }`}
              >
                {/* ── EXPANDED COLUMN CONTENT ── */}
                {isActive ? (
                  <div className="relative w-full h-full p-8 lg:p-10 flex flex-col justify-between overflow-hidden">
                    {/* Top Row: Number 01 & Format Tag */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-2xl font-bold text-signal tracking-tight">
                        {numStr}
                      </span>
                      <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 bg-neutral-900 border border-neutral-700/80 px-3 py-1 rounded-full">
                        {meta.category} &bull; {item.readingTime}
                      </span>
                    </div>

                    {/* Middle Row: Content Headline & Summary */}
                    <div className="my-auto pl-8 sm:pl-10">
                      <h3 className="font-display text-2xl lg:text-3xl xl:text-4xl font-bold tracking-tight leading-tight text-white mb-4 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-neutral-400 font-sans text-sm lg:text-base leading-relaxed max-w-xl mb-6 line-clamp-3">
                        {item.summary}
                      </p>

                      {/* Visual Artwork Box */}
                      <Link
                        href={`/insights/${item.slug}`}
                        className="group/img block relative h-56 lg:h-64 max-w-xl rounded-2xl overflow-hidden border border-neutral-700/80 bg-black shadow-2xl"
                      >
                        <GenerativeArt
                          seed={item.slug}
                          interactive={false}
                          width={640}
                          height={400}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

                        {/* Hover Overlay Prompt */}
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                          <span className="font-mono text-xs text-white bg-black/70 backdrop-blur-xs px-3 py-1 rounded-full border border-white/20">
                            Read article &rarr;
                          </span>
                          <span className="w-8 h-8 rounded-full bg-signal text-ink flex items-center justify-center font-bold">
                            <span className="material-symbols-outlined text-[18px]">
                              arrow_outward
                            </span>
                          </span>
                        </div>
                      </Link>
                    </div>

                    {/* Bottom-left: Rotated Title in Signal Green */}
                    <div className="absolute bottom-10 left-5 sm:left-7 [writing-mode:vertical-rl] rotate-180 max-h-[420px] overflow-hidden pointer-events-none">
                      <span className="font-mono text-base sm:text-lg font-bold text-signal tracking-wide uppercase truncate block max-w-[400px]">
                        {item.title}
                      </span>
                    </div>
                  </div>
                ) : (
                  /* ── COLLAPSED COLUMN TAB ── */
                  <div className="w-full h-full flex flex-col justify-between items-center py-8 px-2">
                    {/* Top: Number in Signal Green */}
                    <span className="font-mono text-xl lg:text-2xl font-bold text-signal">
                      {numStr}
                    </span>

                    {/* Bottom: Rotated Article Title in Signal Green (Bigger font size) */}
                    <div className="[writing-mode:vertical-rl] rotate-180 max-h-[420px] overflow-hidden">
                      <span className="font-mono text-base sm:text-lg lg:text-xl font-bold text-signal tracking-wide uppercase truncate block max-w-[420px] whitespace-nowrap">
                        {item.title}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ──────────────────────────────────────────────────────────────
            MOBILE VIEW: Stacked Vertical Expandable Cards
           ────────────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-3 md:hidden">
          {items.map((item, idx) => {
            const isActive = activeIndex === idx;
            const meta = accordionMeta[idx] ?? { label: "Insight", category: "Editorial" };
            const numStr = `0${idx + 1}`;

            return (
              <div
                key={item.slug}
                onClick={() => setActiveIndex(isActive ? -1 : idx)}
                className="rounded-2xl overflow-hidden border border-signal/70 bg-[#121212] transition-colors"
              >
                {/* Accordion Bar */}
                <div className="p-5 flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3 pr-2 overflow-hidden">
                    <span className="font-mono text-xl font-bold text-signal shrink-0">
                      {numStr}
                    </span>
                    <span className="font-mono text-base font-bold text-signal uppercase tracking-wider truncate">
                      {item.title}
                    </span>
                  </div>
                  <span className="font-mono text-sm text-neutral-400 shrink-0 font-bold">
                    {isActive ? "−" : "+"}
                  </span>
                </div>

                {/* Expanded Drawer on Mobile */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-5 pb-6 border-t border-neutral-800"
                    >
                      <h4 className="font-display text-xl font-bold text-white mt-4 mb-2">
                        {item.title}
                      </h4>
                      <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                        {item.summary}
                      </p>

                      <Link
                        href={`/insights/${item.slug}`}
                        className="block relative h-48 w-full rounded-xl overflow-hidden border border-neutral-700 bg-black mt-3 mb-4"
                      >
                        <GenerativeArt
                          seed={item.slug}
                          interactive={false}
                          width={480}
                          height={280}
                          className="w-full h-full object-cover"
                        />
                      </Link>

                      <Link
                        href={`/insights/${item.slug}`}
                        className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-signal uppercase tracking-wider"
                      >
                        <span>Read full article</span>
                        <span>&rarr;</span>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
