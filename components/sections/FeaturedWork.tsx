"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";

interface ProjectItem {
  id: string;
  client: string;
  headline: string;
  body: string;
  tags: string[];
  link: string;
  type: "phones" | "stunt" | "sticker";
}

const projects: ProjectItem[] = [
  {
    id: "sephora",
    client: "SEPHORA",
    headline: "Get Beauty From People Who Get Beauty",
    body: "Instead of scrolling phone screens to pick-up unexciting essentials, Sephora delivered beauty lovers to the source.",
    tags: ["CREATIVE EXPERIENCES", "NETWORKED MEDIA"],
    link: "/work/solace-wellness-rebrand",
    type: "phones",
  },
  {
    id: "racetrac",
    client: "RACETRAC",
    headline: "Some Cravings Have Their Own Gravity",
    body: "An irresistible pull grounded in real stunts and practical craft.",
    tags: ["CREATIVE EXPERIENCES", "CONTENT"],
    link: "/work/fernweh-hotels-brand-film",
    type: "stunt",
  },
  {
    id: "abcmouse",
    client: "ABCMOUSE",
    headline: "Old School Brand. New School Results.",
    body: "Every element designed to balance wonder and trust, imagination and expertise, child delight and parent confidence.",
    tags: ["CREATIVE EXPERIENCES"],
    link: "/work/northbound-bank-platform",
    type: "sticker",
  },
];

export default function FeaturedWork() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32 border-b border-edge bg-surface" id="work">
      <Container>
        {/* Section Header: Fully unified with project design system */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 md:mb-16">
          <div>
            <Eyebrow index="03">Featured Projects</Eyebrow>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tightest text-balance max-w-2xl">
              Work that moved a real number.
            </h2>
          </div>
          <Button href="/work" variant="outline">
            View all work
          </Button>
        </div>

        {/* 3 Featured Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((proj, idx) => {
            const isHovered = hoveredIndex === idx;

            return (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative flex flex-col rounded-[32px] overflow-hidden bg-ink border border-line/40 dark:border-lineOnInk shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-signal/40 hover:shadow-[0_30px_70px_rgba(0,0,0,0.45)]"
              >
                <Link href={proj.link} className="block w-full h-full flex flex-col">
                  {/* ──────────────────────────────────────────────────────────
                      TOP MEDIA CONTAINER (Height: 300px)
                     ────────────────────────────────────────────────────────── */}
                  <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-[#0c0c0c] flex items-center justify-center">
                    {/* CARD 1: 3-PHONE UGC SOCIAL REEL FAN-OUT ANIMATION */}
                    {proj.type === "phones" && (
                      <div className="relative w-full h-full flex items-center justify-center px-4 overflow-hidden">
                        {/* Subtle background radial glow */}
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] pointer-events-none" />

                        {/* Phone 1: Left Phone */}
                        <motion.div
                          animate={
                            isHovered
                              ? { x: -38, rotate: -12, scale: 0.94, y: 4 }
                              : { x: -28, rotate: -3, scale: 0.92, y: 10 }
                          }
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                          className="absolute z-10 w-24 sm:w-28 aspect-[9/18] rounded-[22px] p-1.5 bg-neutral-900 border-2 border-neutral-700/80 shadow-2xl overflow-hidden"
                        >
                          <div className="relative w-full h-full rounded-[16px] overflow-hidden bg-neutral-950">
                            {/* Dynamic Island */}
                            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-7 h-2 rounded-full bg-black z-20" />
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
                              alt="UGC Creator 1"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                          </div>
                        </motion.div>

                        {/* Phone 3: Right Phone */}
                        <motion.div
                          animate={
                            isHovered
                              ? { x: 38, rotate: 12, scale: 0.94, y: 4 }
                              : { x: 28, rotate: 3, scale: 0.92, y: 10 }
                          }
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                          className="absolute z-10 w-24 sm:w-28 aspect-[9/18] rounded-[22px] p-1.5 bg-neutral-900 border-2 border-neutral-700/80 shadow-2xl overflow-hidden"
                        >
                          <div className="relative w-full h-full rounded-[16px] overflow-hidden bg-neutral-950">
                            {/* Dynamic Island */}
                            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-7 h-2 rounded-full bg-black z-20" />
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80"
                              alt="UGC Creator 3"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                          </div>
                        </motion.div>

                        {/* Phone 2: Center Phone (Pops forward on hover) */}
                        <motion.div
                          animate={
                            isHovered
                              ? { scale: 1.08, y: -8, rotate: 0 }
                              : { scale: 1.0, y: 0, rotate: 0 }
                          }
                          transition={{ type: "spring", stiffness: 400, damping: 24 }}
                          className="relative z-20 w-28 sm:w-32 aspect-[9/18] rounded-[24px] p-1.5 bg-neutral-900 border-2 border-neutral-600 shadow-[0_20px_40px_rgba(0,0,0,0.9)] overflow-hidden"
                        >
                          <div className="relative w-full h-full rounded-[18px] overflow-hidden bg-neutral-950">
                            {/* Dynamic Island */}
                            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-8 h-2.5 rounded-full bg-black z-30" />
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&auto=format&fit=crop&q=80"
                              alt="UGC Creator Center"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40" />

                            {/* Centered "TO" text as in screenshot */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <span className="font-display font-extrabold text-2xl tracking-widest text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                                TO
                              </span>
                            </div>

                            {/* Live Badge in Signal Green */}
                            <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 bg-ink/90 border border-signal/40 px-2 py-0.5 rounded-full backdrop-blur-xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
                              <span className="text-[9px] font-mono font-bold text-signal uppercase tracking-wider">
                                UGC LIVE
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    )}

                    {/* CARD 2: CINEMATIC CAR STUNT ACTION SCENE */}
                    {proj.type === "stunt" && (
                      <div className="relative w-full h-full overflow-hidden">
                        {/* Background Motion Stunt Image */}
                        <motion.img
                          src="https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&auto=format&fit=crop&q=80"
                          alt="RaceTrac Car Stunt"
                          animate={
                            isHovered
                              ? { scale: 1.12, x: -6 }
                              : { scale: 1.02, x: 0 }
                          }
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className="w-full h-full object-cover filter brightness-90 contrast-110"
                        />

                        {/* Motion Ambient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-signal/10 via-transparent to-lime/10 mix-blend-color-dodge pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

                        {/* Camera REC Overlay HUD that lights up on hover */}
                        <motion.div
                          animate={{ opacity: isHovered ? 1 : 0.5 }}
                          transition={{ duration: 0.2 }}
                          className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none"
                        >
                          <div className="flex items-center justify-between">
                            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-white bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs border border-white/10">
                              <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
                              REC 4K
                            </span>
                            <span className="font-mono text-[10px] text-signal bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs border border-signal/20">
                              60 FPS
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-[10px] font-mono text-white/80">
                            <span>STUNT CAM_02</span>
                            <span>[ PRACTICAL CRAFT ]</span>
                          </div>
                        </motion.div>

                        {/* Play Action Badge in Center with Signal Green */}
                        <motion.div
                          animate={
                            isHovered
                              ? { scale: 1.15, opacity: 1 }
                              : { scale: 0.9, opacity: 0 }
                          }
                          transition={{ type: "spring", stiffness: 350, damping: 20 }}
                          className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                          <span className="w-14 h-14 rounded-full bg-signal text-ink flex items-center justify-center shadow-[0_0_30px_rgba(38,214,46,0.6)]">
                            <span className="material-symbols-outlined text-[28px] ml-0.5 font-bold">
                              play_arrow
                            </span>
                          </span>
                        </motion.div>
                      </div>
                    )}

                    {/* CARD 3: GEOMETRIC GRAPHICS & CHUBBY BUNNY STICKER */}
                    {proj.type === "sticker" && (
                      <div className="relative w-full h-full bg-[#1b1419] overflow-hidden flex items-center justify-center">
                        {/* Geometric Shape 1: Big Arc */}
                        <motion.div
                          animate={
                            isHovered
                              ? { rotate: 25, scale: 1.08 }
                              : { rotate: 0, scale: 1 }
                          }
                          transition={{ type: "spring", stiffness: 200, damping: 18 }}
                          className="absolute -top-10 -right-8 w-44 h-44 rounded-full bg-[#321927] opacity-80"
                        />

                        {/* Geometric Shape 2: Dark Plum Circle */}
                        <motion.div
                          animate={
                            isHovered
                              ? { scale: 1.2, x: 8, y: -4 }
                              : { scale: 1, x: 0, y: 0 }
                          }
                          transition={{ type: "spring", stiffness: 220, damping: 20 }}
                          className="absolute bottom-6 left-12 w-28 h-28 rounded-full bg-[#461e34] opacity-75"
                        />

                        {/* Geometric Shape 3: Rounded Capsule/Pill */}
                        <motion.div
                          animate={
                            isHovered
                              ? { rotate: -35, x: 12 }
                              : { rotate: -25, x: 0 }
                          }
                          transition={{ type: "spring", stiffness: 250, damping: 22 }}
                          className="absolute -bottom-8 right-6 w-20 h-40 rounded-full bg-[#351828] opacity-90"
                        />

                        {/* White Diagonal Stripe / Tape Background */}
                        <div className="absolute -top-6 -left-10 w-64 h-24 bg-white/10 rotate-[-30deg] pointer-events-none" />

                        {/* THE CHUBBY BUNNY STICKER (Interactive spring tilt animation) */}
                        <motion.div
                          animate={
                            isHovered
                              ? { rotate: -18, scale: 1.15, y: -8, x: -6 }
                              : { rotate: -24, scale: 1.0, y: 0, x: 0 }
                          }
                          transition={{ type: "spring", stiffness: 450, damping: 14 }}
                          className="relative z-20 bg-paper text-ink font-bold px-4 py-2.5 rounded-lg shadow-[0_12px_28px_rgba(0,0,0,0.85)] border border-line select-none cursor-pointer flex flex-col items-center leading-tight"
                        >
                          <span className="font-sans font-extrabold text-sm sm:text-base tracking-tight text-ink">
                            Chubby
                          </span>
                          <span className="font-sans font-extrabold text-sm sm:text-base tracking-tight text-ink">
                            Bunny
                          </span>
                          <div className="w-full h-[2px] bg-line mt-1" />
                        </motion.div>
                      </div>
                    )}
                  </div>

                  {/* ──────────────────────────────────────────────────────────
                      BOTTOM CONTENT CONTAINER (Brand Paper Panel)
                     ────────────────────────────────────────────────────────── */}
                  <div className="flex-1 bg-paper text-ink p-7 sm:p-8 flex flex-col justify-between">
                    <div>
                      {/* Client Subheading */}
                      <span className="font-mono text-xs font-bold tracking-widest text-muted uppercase block mb-3">
                        {proj.client}
                      </span>

                      {/* Headline */}
                      <h3 className="font-display text-2xl sm:text-[26px] font-bold tracking-tight leading-[1.15] text-ink group-hover:text-signal transition-colors mb-3">
                        {proj.headline}
                      </h3>

                      {/* Body Description */}
                      <p className="text-sm font-sans text-muted leading-relaxed">
                        {proj.body}
                      </p>
                    </div>

                    {/* Bottom Tags / Pills */}
                    <div className="flex flex-wrap gap-2 pt-6 mt-4">
                      {proj.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-ink text-paper px-3 py-1.5 text-[10px] font-mono font-semibold tracking-wider uppercase transition-colors group-hover:bg-ink2 border border-lineOnInk"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
