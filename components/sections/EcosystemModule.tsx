"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import Container from "@/components/ui/Container";

export default function EcosystemModule() {
  return (
    <section className="py-24 md:py-32 border-b border-edge bg-[#0a0a0a] text-paper overflow-hidden" id="ecosystem">
      <Container>
        {/* ──────────────────────────────────────────────────────────────
            SECTION HEADER: Matching Screenshot Typography
           ────────────────────────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-16 px-4">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tightest leading-[1.08] text-balance mb-4">
            <span className="text-white block">One Ecosystem.</span>
            <span className="text-signal block">Connected Expertise.</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl mx-auto">
            Cordinit Media is part of the broader Confidential ecosystem, bringing together
            creative thinking, media, technology and digital capabilities to help businesses
            build, innovate and grow.
          </p>
        </div>

        {/* ──────────────────────────────────────────────────────────────
            HIERARCHICAL ECOSYSTEM TREE / NODE GRAPH
           ────────────────────────────────────────────────────────────── */}
        <div className="max-w-5xl mx-auto relative flex flex-col items-center">
          {/* ── TOP PARENT NODE: CONFIDENTIAL ── */}
          <div className="relative w-full max-w-2xl rounded-[24px] border border-signal/70 bg-[#0e0e0e] p-8 sm:p-10 text-center shadow-[0_0_50px_rgba(38,214,46,0.14)] z-20">
            {/* Crosshair / Radar Center Icon */}
            <div className="w-11 h-11 rounded-full bg-signal/15 border border-signal/40 text-signal flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(38,214,46,0.3)]">
              <span className="material-symbols-outlined text-[22px]">
                adjust
              </span>
            </div>

            {/* Parent Tag */}
            <span className="font-mono text-xs font-bold tracking-widest text-signal uppercase block mb-1">
              PARENT ECOSYSTEM
            </span>

            {/* Parent Title */}
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              CONFIDENTIAL
            </h3>

            {/* Quote */}
            <p className="font-sans text-sm sm:text-base text-neutral-200 font-medium italic mb-2">
              &ldquo;An ecosystem built for business transformation.&rdquo;
            </p>

            {/* Description */}
            <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-lg mx-auto">
              Connecting specialist expertise to create integrated solutions for modern businesses.
            </p>

            {/* Bottom Output Dot on Parent Box */}
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#0a0a0a] border-2 border-signal flex items-center justify-center z-30 shadow-[0_0_12px_rgba(38,214,46,0.8)]">
              <span className="w-2 h-2 rounded-full bg-signal animate-ping" />
              <span className="absolute w-2 h-2 rounded-full bg-signal" />
            </div>
          </div>

          {/* ── CONNECTING CIRCUIT TREE LINES (SVG) ── */}
          <div className="w-full max-w-3xl h-16 sm:h-20 relative z-10 flex items-center justify-center pointer-events-none">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 800 80"
              fill="none"
              preserveAspectRatio="none"
            >
              {/* Vertical trunk line from parent */}
              <line
                x1="400"
                y1="0"
                x2="400"
                y2="40"
                stroke="#26D62E"
                strokeWidth="2"
                strokeOpacity="0.85"
              />

              {/* Horizontal branch line: left to right */}
              <line
                x1="200"
                y1="40"
                x2="600"
                y2="40"
                stroke="#26D62E"
                strokeWidth="2"
                strokeOpacity="0.85"
              />

              {/* Left drop line into Child 1 (Solid) */}
              <line
                x1="200"
                y1="40"
                x2="200"
                y2="80"
                stroke="#26D62E"
                strokeWidth="2"
                strokeOpacity="0.85"
              />

              {/* Right drop line into Child 2 (Dashed as in screenshot) */}
              <line
                x1="600"
                y1="40"
                x2="600"
                y2="80"
                stroke="#26D62E"
                strokeWidth="2"
                strokeDasharray="4 4"
                strokeOpacity="0.75"
              />

              {/* Left Node Junction Dot */}
              <circle cx="200" cy="40" r="3.5" fill="#26D62E" />
              {/* Center Node Junction Dot */}
              <circle cx="400" cy="40" r="3.5" fill="#26D62E" />
              {/* Right Node Junction Dot */}
              <circle cx="600" cy="40" r="3.5" fill="#26D62E" />
            </svg>
          </div>

          {/* ── TWO CHILD NODES (GRID) ── */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 z-20">
            {/* CHILD NODE 1: CORDINIT MEDIA (Active highlighted node) */}
            <div className="relative rounded-[24px] border-2 border-signal/80 bg-[#111111] p-7 sm:p-8 flex flex-col justify-between shadow-[0_15px_40px_rgba(38,214,46,0.12)] hover:border-signal transition-all duration-300 group">
              {/* Top Input Dot on Child Card */}
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#111111] border-2 border-signal flex items-center justify-center z-30 shadow-[0_0_10px_rgba(38,214,46,0.8)]">
                <span className="w-1.5 h-1.5 rounded-full bg-signal" />
              </div>

              <div>
                {/* Header Tag Bar */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold text-signal bg-signal/15 border border-signal/40 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
                    CURRENT SECTION &bull; 09
                  </span>
                  <span className="font-mono text-xs font-bold text-neutral-500">
                    NODE 01
                  </span>
                </div>

                {/* Node Title */}
                <h4 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1">
                  CORDINIT MEDIA
                </h4>

                {/* Subtitle / Capabilities */}
                <p className="font-mono text-[11px] font-bold text-neutral-400 tracking-wider uppercase mb-3">
                  CREATIVE &bull; MEDIA &bull; DIGITAL GROWTH
                </p>

                {/* Body Description */}
                <p className="text-sm font-sans text-neutral-400 leading-relaxed mb-6">
                  We help brands build meaningful connections with their audiences through creative
                  strategy, content, digital experiences, media and performance marketing.
                </p>

                {/* Inner HUD Widget (Matching Screenshot) */}
                <div className="relative h-28 sm:h-32 w-full rounded-2xl bg-[#080808] border border-signal/40 p-4 flex flex-col justify-between overflow-hidden shadow-inner mb-6 group-hover:border-signal transition-colors">
                  <div className="flex items-center justify-between font-mono text-[10px] text-signal/90">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
                      REC / 4K
                    </span>
                    <span className="text-neutral-500">EXP.09</span>
                  </div>

                  <div className="flex items-center justify-center gap-3">
                    <span className="w-9 h-9 rounded-full bg-signal/20 border border-signal/50 text-signal flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px] ml-0.5">
                        play_arrow
                      </span>
                    </span>
                    <div className="w-24 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-signal rounded-full" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between font-mono text-[9px] text-neutral-400 uppercase tracking-wider">
                    <span>CREATIVE SUITE</span>
                    <span>100fps</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action Pill Button */}
              <div>
                <Link
                  href="/capabilities"
                  className="inline-flex items-center gap-2 rounded-full bg-[#181818] border border-neutral-700 px-5 py-2.5 text-xs font-mono font-bold text-white transition-all hover:bg-neutral-800 hover:border-signal group/btn"
                >
                  <span>Explore Cordinit Media</span>
                  <span className="material-symbols-outlined text-[15px] text-signal transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
                    arrow_outward
                  </span>
                </Link>
              </div>
            </div>

            {/* CHILD NODE 2: CORDINIT TECH / ECOSYSTEM SIBLING */}
            <div className="relative rounded-[24px] border border-neutral-800 bg-[#111111] p-7 sm:p-8 flex flex-col justify-between shadow-xl hover:border-signal/60 transition-all duration-300 group">
              {/* Top Input Dot on Child Card */}
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#111111] border-2 border-neutral-700 flex items-center justify-center z-30 group-hover:border-signal transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 group-hover:bg-signal transition-colors" />
              </div>

              <div>
                {/* Header Tag Bar */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold text-neutral-300 bg-neutral-900 border border-neutral-700 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
                    ECOSYSTEM ENTITY &bull; TECH
                  </span>
                  <span className="font-mono text-xs font-bold text-neutral-500">
                    NODE 02
                  </span>
                </div>

                {/* Node Title */}
                <h4 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1">
                  CORDINIT TECH
                </h4>

                {/* Subtitle / Capabilities */}
                <p className="font-mono text-[11px] font-bold text-neutral-400 tracking-wider uppercase mb-3">
                  ENGINEERING &bull; AI &bull; PLATFORM INFRASTRUCTURE
                </p>

                {/* Body Description */}
                <p className="text-sm font-sans text-neutral-400 leading-relaxed mb-6">
                  We build enterprise-grade software, applied AI models, cloud architecture and scalable
                  technical infrastructure that power modern category-defining businesses.
                </p>

                {/* Inner HUD Widget (Matching Screenshot Tech Variant) */}
                <div className="relative h-28 sm:h-32 w-full rounded-2xl bg-[#080808] border border-neutral-800 p-4 flex flex-col justify-between overflow-hidden shadow-inner mb-6 group-hover:border-signal/50 transition-colors">
                  <div className="flex items-center justify-between font-mono text-[10px] text-neutral-400">
                    <span className="flex items-center gap-1 text-signal">
                      <span className="w-1.5 h-1.5 rounded-full bg-signal" />
                      SYS / RUNNING
                    </span>
                    <span>NODE.02</span>
                  </div>

                  <div className="flex items-center justify-center gap-3">
                    <span className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 flex items-center justify-center group-hover:text-signal group-hover:border-signal/50 transition-colors">
                      <span className="material-symbols-outlined text-[18px]">
                        terminal
                      </span>
                    </span>
                    <div className="w-24 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-signal/80 rounded-full" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between font-mono text-[9px] text-neutral-500 uppercase tracking-wider">
                    <span>API GATEWAY</span>
                    <span className="text-signal">99.99% UPTIME</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action Pill Button */}
              <div>
                <Link
                  href="/ecosystem"
                  className="inline-flex items-center gap-2 rounded-full bg-[#181818] border border-neutral-700 px-5 py-2.5 text-xs font-mono font-bold text-white transition-all hover:bg-neutral-800 hover:border-signal group/btn"
                >
                  <span>Explore Cordinit Tech</span>
                  <span className="material-symbols-outlined text-[15px] text-signal transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
                    arrow_outward
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
