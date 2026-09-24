"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import GenerativeArt from "@/components/ui/GenerativeArt";
import { capabilities } from "@/lib/content";

// 8 distinct geometric & organic shapes for each capability
const SHAPE_PRESETS = [
  {
    id: "oval",
    name: "ASYMMETRIC OVAL",
    category: "ORGANIC CURVE",
    borderRadius: "44px 16px 48px 20px",
    clipPath: "none",
    tag: "GEOM // 01 · ASYM OVAL",
    icon: "lens",
    accent: "#26D62E",
  },
  {
    id: "zigzag",
    name: "SERRATED ZIG-ZAG",
    category: "BRUTALIST SAWTOOTH",
    borderRadius: "0px",
    // 20-point brutalist zigzag sawtooth cut along the bottom edge only (with safe clearance)
    clipPath:
      "polygon(0% 0%, 100% 0%, 100% calc(100% - 20px), 96% 100%, 92% calc(100% - 20px), 88% 100%, 84% calc(100% - 20px), 80% 100%, 76% calc(100% - 20px), 72% 100%, 68% calc(100% - 20px), 64% 100%, 60% calc(100% - 20px), 56% 100%, 52% calc(100% - 20px), 48% 100%, 44% calc(100% - 20px), 40% 100%, 36% calc(100% - 20px), 32% 100%, 28% calc(100% - 24px), 24% 100%, 20% calc(100% - 20px), 16% 100%, 12% calc(100% - 20px), 8% 100%, 4% calc(100% - 20px), 0% 100%)",
    tag: "GEOM // 02 · ZIG-ZAG SAW",
    icon: "waves",
    accent: "#2BEE34",
  },
  {
    id: "chamfer",
    name: "CYBER BEVEL CHAMFER",
    category: "ANGLED OCTAGON",
    borderRadius: "0px",
    clipPath:
      "polygon(24px 0%, calc(100% - 24px) 0%, 100% 24px, 100% calc(100% - 24px), calc(100% - 24px) 100%, 24px 100%, 0% calc(100% - 24px), 0% 24px)",
    tag: "GEOM // 03 · CYBER BEVEL",
    icon: "hexagon",
    accent: "#38EF7D",
  },
  {
    id: "arch",
    name: "MONUMENTAL ARCH",
    category: "CATHEDRAL VAULT",
    borderRadius: "60px 60px 16px 16px",
    clipPath: "none",
    tag: "GEOM // 04 · ARCH VAULT",
    icon: "expand_less",
    accent: "#00F5A0",
  },
  {
    id: "notched",
    name: "NOTCHED TICKET CUT",
    category: "PERFORATED STAMP",
    borderRadius: "0px",
    clipPath:
      "polygon(0% 0%, 100% 0%, 100% 44%, 98% 47%, 98% 53%, 100% 56%, 100% 100%, 0% 100%, 0% 56%, 2% 53%, 2% 47%, 0% 44%)",
    tag: "GEOM // 05 · TICKET NOTCH",
    icon: "confirmation_number",
    accent: "#26D62E",
  },
  {
    id: "tech-prism",
    name: "SCULPTED TECH PRISM",
    category: "ASYMMETRIC PRISM",
    // Clean modern brutalist shape that never clips or cuts any content
    borderRadius: "32px 10px 32px 10px",
    clipPath: "none",
    tag: "GEOM // 06 · TECH PRISM",
    icon: "token",
    accent: "#68D391",
  },
  {
    id: "blade",
    name: "FACETED TECH BLADE",
    category: "DIAMOND CUTOUT",
    borderRadius: "0px",
    clipPath:
      "polygon(0% 0%, calc(100% - 28px) 0%, 100% 28px, 100% 100%, 28px 100%, 0% calc(100% - 28px))",
    tag: "GEOM // 07 · FACETED BLADE",
    icon: "memory",
    accent: "#2BEE34",
  },
  {
    id: "squircle",
    name: "ORGANIC SQUIRCLE BLOB",
    category: "MORPHING FLUID",
    borderRadius: "40px 18px 40px 18px",
    clipPath: "none",
    tag: "GEOM // 08 · ORGANIC BLOB",
    icon: "grain",
    accent: "#38EF7D",
  },
];

export default function ClientNeedMapper() {
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [liveRot, setLiveRot] = useState(0);

  const current = capabilities[active] ?? capabilities[0];
  const activeShape = SHAPE_PRESETS[active % SHAPE_PRESETS.length];

  const listRef = useRef<HTMLUListElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Physics animation references for cursor following & 3D rotation
  const mousePos = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0, time: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const currentRot = useRef({ x: 0, y: 0, z: 0 });
  const targetRot = useRef({ x: 0, y: 0, z: 0 });
  const animFrameId = useRef<number | null>(null);

  // Physics loop: smoothly lerps position & 3D tilt angles with natural spring damping
  useEffect(() => {
    let running = true;

    function renderLoop() {
      if (!running) return;

      // Position smooth lerping (0.16 factor for snappy yet buttery feel)
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * 0.16;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * 0.16;

      // Rotation smooth lerping (0.12 factor)
      currentRot.current.x += (targetRot.current.x - currentRot.current.x) * 0.12;
      currentRot.current.y += (targetRot.current.y - currentRot.current.y) * 0.12;
      currentRot.current.z += (targetRot.current.z - currentRot.current.z) * 0.12;

      // Natural decay towards subtle resting angle
      const baseTilt = active % 2 === 0 ? 3.5 : -3.5;
      targetRot.current.z += (baseTilt - targetRot.current.z) * 0.06;
      targetRot.current.x *= 0.91;
      targetRot.current.y *= 0.91;

      // Apply 3D matrix transform to the floating preview
      if (previewRef.current) {
        const { x, y } = currentPos.current;
        const { x: rx, y: ry, z: rz } = currentRot.current;
        previewRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) perspective(900px) rotateX(${rx.toFixed(
          2
        )}deg) rotateY(${ry.toFixed(2)}deg) rotateZ(${rz.toFixed(2)}deg)`;
      }

      animFrameId.current = requestAnimationFrame(renderLoop);
    }

    animFrameId.current = requestAnimationFrame(renderLoop);
    return () => {
      running = false;
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [active]);

  function handleListMove(e: React.MouseEvent<HTMLUListElement>) {
    const rect = listRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const now = performance.now();
    const dt = Math.max(1, now - (lastMousePos.current.time || now));
    const dx = e.clientX - (lastMousePos.current.x || e.clientX);
    const dy = e.clientY - (lastMousePos.current.y || e.clientY);

    lastMousePos.current = { x: e.clientX, y: e.clientY, time: now };

    // Velocity normalized to standard 60fps frame
    const vx = (dx / dt) * 16;
    const vy = (dy / dt) * 16;

    // Target position for floating card: slight right & above cursor for clear visibility
    mousePos.current = {
      x: x + 28,
      y: y - 110,
    };

    // Calculate dynamic rotation: velocity-based bank & tilt
    // Moving cursor quickly right tilts up to +24deg; quickly left tilts up to -24deg
    const tiltZ = Math.max(-25, Math.min(25, vx * 1.15));
    const tiltX = Math.max(-18, Math.min(18, -vy * 0.7));
    const tiltY = Math.max(-20, Math.min(20, vx * 0.85));

    targetRot.current = {
      x: tiltX,
      y: tiltY,
      z: tiltZ,
    };

    setLiveRot(Math.round(tiltZ));
  }

  function handleItemHover(idx: number) {
    setActive(idx);
    // Dynamic kick on item switch for immediate physical feedback
    targetRot.current.z = idx % 2 === 0 ? 14 : -14;
    targetRot.current.x = -8;
  }

  function handleEnter() {
    setIsHovered(true);
    if (previewRef.current) {
      previewRef.current.style.opacity = "1";
    }
  }

  function handleLeave() {
    setIsHovered(false);
    if (previewRef.current) {
      previewRef.current.style.opacity = "0";
    }
  }

  return (
    <section className="py-24 md:py-32 border-b border-edge bg-surfaceMuted relative overflow-hidden">
      {/* Decorative ambient subtle background grid */}
      <div className="absolute inset-0 bg-grain opacity-15 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <Container className="relative z-10">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <Eyebrow index="00">Where do you start?</Eyebrow>
              <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tightest max-w-2xl text-balance">
                Tell us the problem. We&apos;ll show you the capability.
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-3 font-mono text-[11px] text-muted uppercase tracking-wider bg-surface px-4 py-2 border border-edge rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-signal animate-pulse" />
              <span>Hover items to morph geometries & tilt preview</span>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-start">
          {/* Left Column: Interactive Problem Statements List */}
          <Reveal>
            <ul
              ref={listRef}
              onMouseMove={handleListMove}
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
              className="relative border-t border-ink/15 select-none"
            >
              {capabilities.map((cap, idx) => {
                const isSelected = active === idx;
                const shapeInfo = SHAPE_PRESETS[idx % SHAPE_PRESETS.length];

                return (
                  <li key={cap.slug} className="border-b border-ink/15 relative">
                    <button
                      type="button"
                      onMouseEnter={() => handleItemHover(idx)}
                      onClick={() => handleItemHover(idx)}
                      className={`w-full flex items-center justify-between gap-4 py-5 px-3 -mx-3 rounded-lg text-left transition-all duration-300 group relative ${
                        isSelected
                          ? "text-signal font-semibold bg-ink/[0.04] dark:bg-paper/[0.04]"
                          : "text-fg hover:text-signal"
                      }`}
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <span
                          className={`font-mono text-xs transition-colors duration-200 ${
                            isSelected ? "text-signal font-bold" : "text-muted"
                          }`}
                        >
                          {cap.num}
                        </span>
                        <span className="font-display text-lg sm:text-2xl font-semibold tracking-tight truncate">
                          {cap.clientNeed}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {/* Dynamic shape pill badge for hovered state */}
                        <span
                          className={`hidden md:inline-flex items-center gap-1.5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider rounded border transition-all duration-200 ${
                            isSelected
                              ? "bg-signal/10 border-signal text-signal opacity-100 scale-100"
                              : "border-transparent text-muted opacity-0 scale-95"
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-signal" />
                          {shapeInfo.name}
                        </span>

                        <span
                          className={`material-symbols-outlined text-[20px] transition-transform duration-300 ${
                            isSelected
                              ? "text-signal translate-x-1"
                              : "text-muted group-hover:translate-x-1 group-hover:text-signal"
                          }`}
                        >
                          arrow_forward
                        </span>
                      </div>
                    </button>
                  </li>
                );
              })}

              {/* Dynamic Floating Preview Card: Follows Cursor with Kinetic Rotation & 3D Tilt */}
              <div
                ref={previewRef}
                style={{
                  willChange: "transform, opacity",
                  transformStyle: "preserve-3d",
                }}
                className="hidden md:block absolute top-0 left-0 z-30 pointer-events-none opacity-0 transition-opacity duration-300"
              >
                <div
                  className="w-[270px] sm:w-[290px] h-[190px] sm:h-[200px] p-2 bg-ink rounded-xl border border-lineOnInk/80 shadow-[0_24px_50px_rgba(0,0,0,0.65)] relative overflow-hidden backdrop-blur-md"
                  style={{
                    filter: `drop-shadow(${-liveRot * 1.2}px ${Math.abs(liveRot) * 0.8 + 18}px 28px rgba(0,0,0,0.55))`,
                  }}
                >
                  {/* Real-time telemetry HUD overlay */}
                  <div className="absolute top-2.5 left-3 right-3 z-20 flex items-center justify-between font-mono text-[10px] text-paper/85 pointer-events-none drop-shadow">
                    <div className="flex items-center gap-1.5 bg-ink/75 px-1.5 py-0.5 rounded border border-lineOnInk">
                      <span className="w-1.5 h-1.5 rounded-full bg-signal animate-ping" />
                      <span className="text-signal font-bold">{current.num}</span>
                      <span className="text-paper/60">// ROT: {liveRot >= 0 ? `+${liveRot}` : liveRot}°</span>
                    </div>
                    <span className="bg-ink/75 px-1.5 py-0.5 rounded border border-lineOnInk text-[9px] uppercase tracking-wider text-lime">
                      KINETIC
                    </span>
                  </div>

                  {/* Corner Crosshairs */}
                  <span className="absolute top-1 left-1 font-mono text-[10px] text-signal/70 pointer-events-none z-20">+</span>
                  <span className="absolute top-1 right-1 font-mono text-[10px] text-signal/70 pointer-events-none z-20">+</span>
                  <span className="absolute bottom-1 left-1 font-mono text-[10px] text-signal/70 pointer-events-none z-20">+</span>
                  <span className="absolute bottom-1 right-1 font-mono text-[10px] text-signal/70 pointer-events-none z-20">+</span>

                  {/* Image container with subtle parallax effect */}
                  <div className="w-full h-full rounded-lg overflow-hidden relative border border-lineOnInk">
                    <GenerativeArt
                      seed={current.slug}
                      label={current.shortName}
                      index={current.num}
                      interactive={false}
                      width={580}
                      height={400}
                      className="w-full h-full"
                    />

                    {/* Dynamic Glare Reflection Overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-transparent transition-opacity duration-200"
                      style={{
                        transform: `rotate(${liveRot * 2}deg) translateY(${liveRot * 1.5}px)`,
                      }}
                    />
                  </div>

                  {/* Bottom bar inside preview */}
                  <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between font-mono text-[9px] text-paper/80 bg-ink/80 px-2 py-0.5 rounded border border-lineOnInk pointer-events-none">
                    <span className="truncate max-w-[170px] text-paper font-semibold">{current.name}</span>
                    <span className="text-signal font-bold">[ACTIVE]</span>
                  </div>
                </div>
              </div>
            </ul>
          </Reveal>

          {/* Right Column: Shape-Morphing Details Card (Changes to Oval, Zig-Zag, Chamfer, Arch, etc. on each hover) */}
          <Reveal delay={120}>
            <div className="relative group/card">
              {/* Outer Glowing Contour Wrapper (morphs with matching shape) */}
              <div
                className="p-[2px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] bg-gradient-to-br from-signal/70 via-lime/30 to-signal/80 shadow-2xl"
                style={{
                  borderRadius: activeShape.borderRadius,
                  clipPath: activeShape.clipPath !== "none" ? activeShape.clipPath : undefined,
                }}
              >
                {/* Main Card Body with Matching Dynamic Shape */}
                <div
                  className="bg-ink text-paper p-7 sm:p-9 lg:p-11 pb-12 sm:pb-14 min-h-[480px] flex flex-col justify-between relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    borderRadius: activeShape.borderRadius,
                    clipPath: activeShape.clipPath !== "none" ? activeShape.clipPath : undefined,
                  }}
                >
                  {/* Subtle Blueprint Mesh & Watermark */}
                  <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at center, #26D62E 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />
                  <div className="absolute -right-4 -bottom-8 font-display text-[130px] font-black text-paper/[0.03] select-none pointer-events-none">
                    {current.num}
                  </div>

                  {/* Dynamic Shape Morph HUD Header Badge */}
                  <div className="relative z-10 flex items-center justify-between gap-3 border-b border-lineOnInk/60 pb-3 mb-5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-signal animate-pulse" />
                      <span className="font-mono text-[11px] text-signal font-bold uppercase tracking-wider">
                        {current.num} // CAPABILITY
                      </span>
                    </div>

                    {/* Shape Morph Indicator Tag */}
                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-lime bg-lineOnInk/60 px-3 py-1 rounded-full border border-signal/30">
                      <span className="material-symbols-outlined text-[13px]">{activeShape.icon}</span>
                      <span>{activeShape.name}</span>
                    </div>
                  </div>

                  {/* Immediate Content Rendering (No blank delay / exit pause) */}
                  <motion.div
                    key={current.slug}
                    initial={{ opacity: 0.35, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 flex-1 flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-2.5 text-balance">
                        {current.name}
                      </h3>

                      <p className="font-mono text-xs text-signal mb-3.5">
                        &ldquo;{current.tagline}&rdquo;
                      </p>

                      <p className="text-mutedOnInk text-sm sm:text-base leading-relaxed mb-5">
                        {current.summary}
                      </p>

                      {/* Services List with Interactive Pills */}
                      <div className="mb-5">
                        <span className="font-mono text-[10px] text-paper/60 uppercase tracking-widest block mb-2.5">
                          Core Deliverables & Services:
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {current.services.slice(0, 4).map((s) => (
                            <li
                              key={s.slug}
                              className="flex items-center gap-2.5 text-xs text-paper/85 bg-surfaceDim/20 border border-lineOnInk/60 rounded px-2.5 py-1.5"
                            >
                              <span className="w-1.5 h-1.5 bg-signal shrink-0 rounded-full" />
                              <span className="truncate">{s.name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Footer CTA & Interactive Exploration Link */}
                    <div className="pt-5 border-t border-lineOnInk/70 flex flex-wrap items-center justify-between gap-4 mt-4">
                      <Link
                        href={`/capabilities/${current.slug}`}
                        className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-ink bg-signal hover:bg-lime px-5 py-2.5 rounded transition-all duration-200 group/btn shadow-[0_0_20px_rgba(38,214,46,0.3)] hover:shadow-[0_0_30px_rgba(43,238,52,0.5)]"
                      >
                        <span>Explore {current.shortName}</span>
                        <span className="material-symbols-outlined text-[16px] transition-transform duration-200 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5">
                          arrow_outward
                        </span>
                      </Link>

                      <div className="font-mono text-[10px] text-mutedOnInk tracking-wider">
                        [SHAPE {active + 1}/8]
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

