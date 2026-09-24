"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";

const BRAND_LETTERS = ["C", "o", "r", "d", "i", "n", "i", "t"];

export default function Footer() {
  const [times, setTimes] = useState({
    india: "04:52 PM",
    london: "12:22 PM",
    amsterdam: "01:22 PM",
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    function updateClock() {
      const now = new Date();
      setTimes({
        india: new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(now),
        london: new Intl.DateTimeFormat("en-US", {
          timeZone: "Europe/London",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(now),
        amsterdam: new Intl.DateTimeFormat("en-US", {
          timeZone: "Europe/Amsterdam",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(now),
      });
    }
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    /* ──────────────────────────────────────────────────────────────
       CURTAIN REVEAL FOOTER CONTAINER
       The parent container creates the clipped scroll window.
       The inner footer is fixed at the bottom underneath the main page,
       so as the page above scrolls up, the footer is uncovered!
       ────────────────────────────────────────────────────────────── */
    <div
      className="relative w-full z-10"
      style={{
        clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
      }}
    >
      <div className="relative h-[540px] sm:h-[600px] lg:h-[640px] w-full">
        <footer className="fixed bottom-0 left-0 w-full h-[540px] sm:h-[600px] lg:h-[640px] z-0 flex flex-col justify-between overflow-hidden bg-surface">
          {/* ──────────────────────────────────────────────────────────────
              TOP SECTION: Real-Time World Clock Timezone Pills
             ────────────────────────────────────────────────────────────── */}
          <div className="py-6 sm:py-7 px-4 bg-surface flex flex-wrap items-center justify-center gap-3 sm:gap-6 border-t border-edge">
            {/* India Pill */}
            <div className="rounded-full border border-neutral-300 dark:border-neutral-700 bg-surface px-5 sm:px-6 py-2 shadow-xs transition-colors hover:border-signal">
              <span className="font-mono text-xs sm:text-sm font-medium text-fg">
                <span className="font-bold">India:</span> {mounted ? times.india : "04:52 PM"}
              </span>
            </div>

            {/* London Pill */}
            <div className="rounded-full border border-neutral-300 dark:border-neutral-700 bg-surface px-5 sm:px-6 py-2 shadow-xs transition-colors hover:border-signal">
              <span className="font-mono text-xs sm:text-sm font-medium text-fg">
                <span className="font-bold">London:</span> {mounted ? times.london : "12:22 PM"}
              </span>
            </div>

            {/* Amsterdam Pill */}
            <div className="rounded-full border border-neutral-300 dark:border-neutral-700 bg-surface px-5 sm:px-6 py-2 shadow-xs transition-colors hover:border-signal">
              <span className="font-mono text-xs sm:text-sm font-medium text-fg">
                <span className="font-bold">Amsterdam:</span> {mounted ? times.amsterdam : "01:22 PM"}
              </span>
            </div>
          </div>

          {/* ──────────────────────────────────────────────────────────────
              MIDDLE SECTION: INTERACTIVE KINETIC MAGNETIC BRAND NAME
              Letters dynamically tilt, stretch, ripple and illuminate
              in Signal Green when the cursor glides across!
             ────────────────────────────────────────────────────────────── */}
          <div className="w-full bg-[#0a0a0a] text-white flex-1 flex flex-col justify-between pt-6 sm:pt-10 pb-6 sm:pb-8 px-4 sm:px-8 select-none relative overflow-hidden group">
            {/* Ambient Refraction Glow Behind Typography */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[85vw] h-[26vw] max-h-[260px] rounded-full bg-gradient-to-r from-signal/20 via-white/10 to-emerald-400/20 blur-[100px] opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
            </div>

            <InteractiveKineticBrandName />

            {/* Thin Separator Line */}
            <div className="max-w-[1440px] mx-auto w-full h-px bg-neutral-800/80 my-4 sm:my-5 relative z-10" />

            {/* ──────────────────────────────────────────────────────────────
                BOTTOM BAR: Social Icons, Nav Links, and Copyright
               ────────────────────────────────────────────────────────────── */}
            <div className="max-w-[1440px] mx-auto px-2 w-full flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 relative z-10">
              {/* Left: Social Media Icon Tiles */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-neutral-900 border border-neutral-800 text-white flex items-center justify-center font-mono font-bold text-xs transition-all hover:bg-signal hover:text-ink hover:border-signal"
                >
                  in
                </a>
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-neutral-900 border border-neutral-800 text-white flex items-center justify-center transition-all hover:bg-signal hover:text-ink hover:border-signal"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-neutral-900 border border-neutral-800 text-white flex items-center justify-center transition-all hover:bg-signal hover:text-ink hover:border-signal"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </a>
                {/* Facebook / X */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-neutral-900 border border-neutral-800 text-white flex items-center justify-center font-mono font-bold text-xs transition-all hover:bg-signal hover:text-ink hover:border-signal"
                >
                  f
                </a>
              </div>

              {/* Center: Navigation Links */}
              <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-6 font-mono text-xs sm:text-[13px] text-neutral-400">
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
                <Link href="/work" className="hover:text-white transition-colors">
                  Case Studies
                </Link>
                <Link href="/insights" className="hover:text-white transition-colors">
                  Blog
                </Link>
                <Link href="/legal/privacy-policy" className="hover:text-white transition-colors">
                  Privacy
                </Link>
              </div>

              {/* Right: Copyright Text */}
              <div className="text-center md:text-right font-mono text-[10px] sm:text-[11px] text-neutral-500 leading-tight">
                <p className="text-neutral-400 font-semibold mb-0.5">Proudly created in India.</p>
                <p>All Right Reserved, All Wrong Reversed.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

// ─── INTERACTIVE KINETIC MAGNETIC BRAND COMPONENT ─────────────────────────────

function InteractiveKineticBrandName() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  function handleMouseMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  function handleMouseLeave() {
    setMousePos(null);
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={handleMouseMove}
      onPointerLeave={handleMouseLeave}
      className="w-full flex items-center justify-center text-center my-auto cursor-default relative z-10 py-6 touch-none"
    >
      <div className="flex items-baseline justify-center tracking-tightest leading-none font-display font-black text-[18vw] sm:text-[20vw] select-none">
        {BRAND_LETTERS.map((letter, i) => (
          <KineticChar
            key={i}
            char={letter}
            index={i}
            mousePos={mousePos}
            containerRef={containerRef}
          />
        ))}
      </div>
    </div>
  );
}

function KineticChar({
  char,
  index,
  mousePos,
  containerRef,
}: {
  char: string;
  index: number;
  mousePos: { x: number; y: number } | null;
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  const letterRef = useRef<HTMLSpanElement>(null);

  let intensity = 0;
  let deltaX = 0;
  let deltaY = 0;

  if (mousePos && letterRef.current && containerRef.current) {
    const contRect = containerRef.current.getBoundingClientRect();
    const lRect = letterRef.current.getBoundingClientRect();

    const charCenterX = lRect.left + lRect.width / 2 - contRect.left;
    const charCenterY = lRect.top + lRect.height / 2 - contRect.top;

    deltaX = mousePos.x - charCenterX;
    deltaY = mousePos.y - charCenterY;
    const dist = Math.hypot(deltaX, deltaY);

    const pullRadius = 240;
    if (dist < pullRadius) {
      intensity = Math.pow(1 - dist / pullRadius, 1.4);
    }
  }

  // Kinetic spring reaction parameters
  const y = -intensity * 38;
  const x = intensity * (deltaX > 0 ? 8 : -8);
  const scale = 1 + intensity * 0.16;
  const rotate = (deltaX / 240) * intensity * 15;

  return (
    <motion.span
      ref={letterRef}
      animate={{
        y,
        x,
        scale,
        rotate,
        color: intensity > 0.25 ? "#26D62E" : "#FFFFFF",
        textShadow:
          intensity > 0.2
            ? `0 0 ${intensity * 45}px rgba(38, 214, 46, ${intensity * 0.95}), 0 10px 25px rgba(0,0,0,0.9)`
            : "0 4px 15px rgba(0,0,0,0.5)",
      }}
      transition={{
        type: "spring",
        stiffness: 450,
        damping: 22,
        mass: 0.18,
      }}
      className="inline-block transform-gpu origin-bottom will-change-transform cursor-pointer"
    >
      {char}
    </motion.span>
  );
}
