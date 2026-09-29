"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Code-split so the Three.js/WebGL bundle (three, @react-three/fiber, drei)
// only ever loads on this one page — every other route pays zero cost for
// it. `ssr: false` because WebGL needs a real browser context.
const EcosystemOrbit = dynamic(() => import("./EcosystemOrbit"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[420px] sm:h-[520px] bg-ink rounded-2xl border border-lineOnInk flex items-center justify-center">
      <span className="font-mono text-[11px] uppercase tracking-wider text-mutedOnInk animate-pulse">
        Loading ecosystem view…
      </span>
    </div>
  ),
});

type CapabilityRef = { slug: string; name: string; shortName: string };

export default function EcosystemOrbitLoader({ capabilities }: { capabilities: CapabilityRef[] }) {
  const [showCanvas, setShowCanvas] = useState<boolean | null>(null);

  useEffect(() => {
    // A rotating 3D scene is exactly the kind of motion prefers-reduced-motion
    // exists to skip — don't even load the WebGL bundle in that case, just
    // fall back to the static badge below (the same info is real text
    // further down the page regardless).
    setShowCanvas(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  if (showCanvas === null) {
    return (
      <div className="w-full h-[420px] sm:h-[520px] bg-ink rounded-2xl border border-lineOnInk" aria-hidden="true" />
    );
  }

  if (!showCanvas) {
    return (
      <div className="w-full h-[280px] bg-ink rounded-2xl border border-lineOnInk flex flex-col items-center justify-center gap-3 text-center px-8">
        <span className="font-mono text-[11px] uppercase tracking-wider text-signal">Cordinit</span>
        <span className="font-display text-lg font-bold text-paper">
          Cordinit Technology &nbsp;&middot;&nbsp; Cordinit Media &nbsp;&middot;&nbsp; 8 Capabilities
        </span>
        <p className="font-mono text-[10px] text-mutedOnInk max-w-sm">
          Interactive 3D view skipped to respect your reduced-motion preference — full detail below.
        </p>
      </div>
    );
  }

  return <EcosystemOrbit capabilities={capabilities} />;
}
