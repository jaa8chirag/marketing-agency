"use client";

import { useState } from "react";
import GenerativeArt from "./GenerativeArt";

export default function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  const [paused, setPaused] = useState(false);

  return (
    <div
      className="relative overflow-hidden border-y border-line bg-paperMuted py-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex w-max items-center animate-marquee gap-10"
        style={{ animationPlayState: paused ? "paused" : "running" }}
      >
        {doubled.map((item, idx) => (
          <div key={idx} className="flex items-center gap-10 shrink-0">
            <span className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-ink/25 hover:text-ink transition-colors whitespace-nowrap uppercase cursor-default">
              {item}
            </span>
            <GenerativeArt
              seed={item}
              interactive={false}
              width={120}
              height={120}
              className="w-14 h-14 shrink-0 border border-line hover:scale-110 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
