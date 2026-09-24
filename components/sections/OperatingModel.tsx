"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

// The original 6 clean steps strictly alternating: Left -> Right -> Left -> Right -> Left -> Right
const ROADMAP_STEPS = [
  {
    num: "01",
    step: "Think",
    description: "Strategy, positioning and research that define the right problem to solve.",
    dotPos: { top: "5.8%", left: "50%" },
    textPos: { top: "3.8%", right: "56%", align: "right" as const }, // LEFT
  },
  {
    num: "02",
    step: "Create",
    description: "Brand, campaign and content concepts built on that strategic foundation.",
    dotPos: { top: "22.2%", left: "46.2%" },
    textPos: { top: "20.5%", left: "53%", align: "left" as const }, // RIGHT
  },
  {
    num: "03",
    step: "Build",
    description: "Websites, digital products and platforms engineered to last.",
    dotPos: { top: "40.8%", left: "71.2%" },
    textPos: { top: "39%", right: "35%", align: "right" as const }, // LEFT
  },
  {
    num: "04",
    step: "Launch",
    description: "Media and go-to-market execution across every relevant channel.",
    dotPos: { top: "59.3%", left: "28.8%" },
    textPos: { top: "57.8%", left: "36%", align: "left" as const }, // RIGHT
  },
  {
    num: "05",
    step: "Grow",
    description: "Performance marketing and optimisation that compound over time.",
    dotPos: { top: "79.1%", left: "71.2%" },
    textPos: { top: "77.5%", right: "35%", align: "right" as const }, // LEFT
  },
  {
    num: "06",
    step: "Scale",
    description: "Automation, AI and systems that let growth outpace headcount.",
    dotPos: { top: "94.2%", left: "46.2%" },
    textPos: { top: "92.5%", left: "53%", align: "left" as const }, // RIGHT
  },
];

// Balanced continuous winding S-curve bezier path
const WINDING_PATH =
  "M 260 50 C 260 120 240 120 240 190 C 240 270 370 270 370 350 C 370 430 150 430 150 510 C 150 600 370 600 370 680 C 370 750 240 750 240 810";

export default function OperatingModel() {
  const [activeStep, setActiveStep] = useState(0);
  const current = ROADMAP_STEPS[activeStep];

  return (
    <section
      className="py-24 md:py-32 border-b border-edge bg-ink text-paper relative overflow-hidden"
      id="operating-model"
    >
      {/* Subtle Background Blueprint Grid */}
      <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #26D62E 1px, transparent 1px), linear-gradient(to bottom, #26D62E 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ─── LEFT SIDE: Clean Narrative & Active Step Focus (5 cols) ─── */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <Reveal>
              <Eyebrow index="02" tone="paper">
                How We Operate
              </Eyebrow>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tightest max-w-xl text-balance mb-6">
                One model, from first brief to compounding growth.
              </h2>
              <p className="text-mutedOnInk text-base leading-relaxed mb-10">
                Creative, technology and performance working from a single brief &mdash; not
                disconnected departments handing work off to each other.
              </p>
            </Reveal>

            {/* Active Step Highlight Card (Clean & Focused) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl border border-lineOnInk/80 bg-[#161718] p-7 relative overflow-hidden shadow-xl"
              >
                {/* Background Large Number Watermark */}
                <div className="absolute -right-4 -bottom-6 font-display text-[120px] font-black text-paper/[0.03] select-none pointer-events-none">
                  {current.num}
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-signal animate-pulse" />
                  <span className="font-mono text-xs font-bold text-signal uppercase tracking-wider">
                    PHASE {current.num}
                  </span>
                </div>

                <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-paper mb-3">
                  {current.step}
                </h3>

                <p className="text-sm sm:text-base text-mutedOnInk leading-relaxed mb-6">
                  {current.description}
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-lineOnInk/60">
                  <div className="font-mono text-xs text-mutedOnInk">
                    Step {activeStep + 1} of 6
                  </div>
                  <div className="flex-1 h-[2px] bg-lineOnInk/60 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-signal transition-all duration-300"
                      style={{ width: `${((activeStep + 1) / 6) * 100}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ─── RIGHT SIDE: Winding S-Curve Roadmap (7 cols) ─── */}
          <div className="lg:col-span-7">
            <Reveal delay={100}>
              <div className="relative rounded-3xl border border-lineOnInk/80 bg-[#121314] p-6 sm:p-10 shadow-2xl overflow-hidden min-h-[760px] sm:min-h-[800px] flex items-center justify-center">
                {/* Ambient Soft Glow */}
                <div className="absolute top-1/3 right-0 w-72 h-72 bg-signal/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-1/3 left-0 w-72 h-72 bg-lime/5 rounded-full blur-3xl pointer-events-none" />

                {/* Serpentine Roadmap SVG & Nodes Container */}
                <div className="relative w-full max-w-[480px] h-[720px] sm:h-[750px] select-none">
                  {/* SVG Winding Path */}
                  <svg
                    viewBox="0 0 520 860"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0 w-full h-full pointer-events-none"
                  >
                    <defs>
                      <linearGradient id="curveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#26D62E" stopOpacity="0.9" />
                        <stop offset="40%" stopColor="#2BEE34" stopOpacity="0.8" />
                        <stop offset="75%" stopColor="#38EF7D" stopOpacity="0.85" />
                        <stop offset="100%" stopColor="#26D62E" stopOpacity="1" />
                      </linearGradient>

                      <filter id="greenGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>

                    {/* Inactive Base Path */}
                    <path
                      d={WINDING_PATH}
                      stroke="#282828"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Glowing Active Winding Path */}
                    <path
                      d={WINDING_PATH}
                      stroke="url(#curveGrad)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      filter="url(#greenGlow)"
                      className="opacity-75"
                    />

                    {/* Continuous Travelling Laser Particle along the curve */}
                    <motion.circle
                      r="6"
                      className="fill-lime"
                      style={{
                        offsetPath: `path("${WINDING_PATH}")`,
                        filter: "drop-shadow(0 0 10px #26D62E)",
                      }}
                      animate={{
                        offsetDistance: ["0%", "100%"],
                      }}
                      transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                    {/* Directional Chevron Markers */}
                    <g fill="#26D62E" opacity="0.6">
                      <polygon points="245,116 253,118 247,126" />
                      <polygon points="310,265 318,272 311,277" />
                      <polygon points="256,426 248,432 254,438" />
                      <polygon points="265,595 274,601 267,607" />
                      <polygon points="315,745 307,751 314,757" />
                    </g>
                  </svg>

                  {/* ─── 6 MILESTONE NODES (Clean: Original 6 Points Only) ─── */}
                  {ROADMAP_STEPS.map((item, idx) => {
                    const isSelected = activeStep === idx;
                    const isLastNode = idx === ROADMAP_STEPS.length - 1;

                    return (
                      <div key={item.step} className="contents">
                        {/* Circular Milestone Dot on the curve */}
                        <div
                          style={{
                            top: item.dotPos.top,
                            left: item.dotPos.left,
                            transform: "translate(-50%, -50%)",
                          }}
                          onClick={() => setActiveStep(idx)}
                          className="absolute z-20 cursor-pointer flex items-center justify-center group/dot"
                        >
                          {isSelected && (
                            <span className="absolute -inset-2 rounded-full bg-signal/35 animate-ping" />
                          )}

                          {isLastNode ? (
                            /* Double concentric circle for final continuous step (matching reference image) */
                            <div
                              className={`w-7 h-7 rounded-full border-2 p-0.5 flex items-center justify-center transition-all duration-300 ${
                                isSelected
                                  ? "border-lime bg-signal/20 shadow-[0_0_18px_#26D62E] scale-110"
                                  : "border-signal/70 bg-[#121314] hover:border-signal"
                              }`}
                            >
                              <div
                                className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                                  isSelected
                                    ? "bg-lime shadow-[0_0_10px_#2BEE34]"
                                    : "bg-signal group-hover/dot:scale-110"
                                }`}
                              />
                            </div>
                          ) : (
                            /* Clean circular node */
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                                isSelected
                                  ? "border-lime bg-lime shadow-[0_0_16px_#26D62E] scale-125"
                                  : "border-white/80 bg-[#161718] hover:border-signal hover:scale-110"
                              }`}
                            >
                              <div
                                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                                  isSelected ? "bg-ink" : "bg-signal"
                                }`}
                              />
                            </div>
                          )}
                        </div>

                        {/* Node Label (Original 6 Points: Number, Title, Description) */}
                        <div
                          style={{
                            top: item.textPos.top,
                            ...(item.textPos.left ? { left: item.textPos.left } : {}),
                            ...(item.textPos.right ? { right: item.textPos.right } : {}),
                            textAlign: item.textPos.align,
                          }}
                          onClick={() => setActiveStep(idx)}
                          className={`absolute z-10 max-w-[210px] cursor-pointer transition-all duration-200 p-2 rounded-lg ${
                            isSelected
                              ? "bg-[#18191B]/95 border border-signal/40 shadow-lg scale-105"
                              : "hover:bg-[#18191B]/60 border border-transparent"
                          }`}
                        >
                          <div className="font-mono text-[11px] font-bold text-signal uppercase tracking-wider mb-0.5">
                            {item.num} // {item.step}
                          </div>

                          <div className="text-xs text-mutedOnInk leading-relaxed">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
