"use client";

import { useRef, useState } from "react";
import GenerativeArt from "./GenerativeArt";

export default function CompareSlider({
  beforeSeed,
  afterSeed,
  beforeLabel = "Before",
  afterLabel = "After",
  className = "",
}: {
  beforeSeed: string;
  afterSeed: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [split, setSplit] = useState(50);
  const [dragging, setDragging] = useState(false);

  function updateFromClientX(clientX: number) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSplit(Math.min(96, Math.max(4, pct)));
  }

  return (
    <div
      ref={ref}
      className={`relative select-none overflow-hidden border border-line cursor-ew-resize touch-none ${className}`}
      onPointerDown={(e) => {
        setDragging(true);
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        updateFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging) updateFromClientX(e.clientX);
      }}
      onPointerUp={() => setDragging(false)}
      onPointerLeave={() => setDragging(false)}
    >
      <GenerativeArt seed={afterSeed} label={afterLabel} interactive={false} width={960} height={480} className="absolute inset-0 w-full h-full" />

      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}>
        <GenerativeArt seed={beforeSeed} label={beforeLabel} interactive={false} width={960} height={480} className="absolute inset-0 w-full h-full" />
      </div>

      <div className="absolute top-0 bottom-0 w-px bg-paper pointer-events-none" style={{ left: `${split}%` }} />
      <div
        className="absolute top-1/2 w-9 h-9 -translate-y-1/2 -translate-x-1/2 bg-paper text-ink rounded-full flex items-center justify-center pointer-events-none shadow-lg"
        style={{ left: `${split}%` }}
      >
        <span className="material-symbols-outlined text-[18px]">drag_indicator</span>
      </div>
    </div>
  );
}
