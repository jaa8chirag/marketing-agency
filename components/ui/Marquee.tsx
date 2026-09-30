"use client";

import { useState } from "react";
import GenerativeArt from "./GenerativeArt";

export interface MarqueeItem {
  name: string;
  logoUrl?: string;
}

export default function Marquee({ items }: { items: (string | MarqueeItem)[] }) {
  // Accepts plain strings too (back-compat with any other caller passing
  // names only) — normalises to {name, logoUrl} either way.
  const normalized: MarqueeItem[] = items.map((item) => (typeof item === "string" ? { name: item } : item));
  const doubled = [...normalized, ...normalized];
  const [paused, setPaused] = useState(false);

  return (
    <div
      className="relative overflow-hidden border-y border-edge bg-surfaceMuted py-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex w-max items-center animate-marquee gap-10"
        style={{ animationPlayState: paused ? "paused" : "running" }}
      >
        {doubled.map((item, idx) => (
          <div key={idx} className="flex items-center gap-10 shrink-0">
            <span className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-fg/25 hover:text-fg transition-colors whitespace-nowrap uppercase cursor-default">
              {item.name}
            </span>
            {item.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.logoUrl}
                alt={item.name}
                referrerPolicy="no-referrer"
                className="w-14 h-14 shrink-0 border border-edge object-contain bg-surface p-1.5 hover:scale-110 transition-transform duration-300"
              />
            ) : (
              <GenerativeArt
                seed={item.name}
                interactive={false}
                width={120}
                height={120}
                className="w-14 h-14 shrink-0 border border-edge hover:scale-110 transition-transform duration-300"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
