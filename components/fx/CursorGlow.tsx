"use client";

import { useRef, type ReactNode } from "react";
import { useFinePointer } from "@/lib/useFinePointer";

// Radial highlight that tracks the cursor inside a card. Ref-based direct
// style mutation (no React state) — same zero-rerender approach already
// used by TiltCard/Magnetic elsewhere in this codebase, since this is a
// per-pixel mousemove effect where that matters most.
export default function CursorGlow({
  children,
  color = "255, 255, 255",
  size = 240,
  opacity = 0.3,
  blend = "soft-light",
  className = "",
}: {
  children: ReactNode;
  color?: string;
  size?: number;
  opacity?: number;
  blend?: string;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const isFine = useFinePointer();

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!isFine) return;
    const rect = wrapRef.current?.getBoundingClientRect();
    const glow = glowRef.current;
    if (!rect || !glow) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glow.style.opacity = "1";
    glow.style.transform = `translate(${x - size / 2}px, ${y - size / 2}px)`;
  }

  function handleLeave() {
    if (glowRef.current) glowRef.current.style.opacity = "0";
  }

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`relative ${className}`}
    >
      {children}
      {isFine && (
        <div
          ref={glowRef}
          className="absolute top-0 left-0 rounded-full pointer-events-none opacity-0 transition-opacity duration-300"
          style={{
            width: size,
            height: size,
            background: `radial-gradient(circle, rgba(${color}, ${opacity}) 0%, transparent 70%)`,
            mixBlendMode: blend as React.CSSProperties["mixBlendMode"],
            willChange: "transform",
          }}
        />
      )}
    </div>
  );
}
