"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import GenerativeArt from "@/components/ui/GenerativeArt";
import type { Capability } from "@/lib/content";

export default function CapabilitiesIndexList({ capabilities }: { capabilities: Capability[] }) {
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = listRef.current?.getBoundingClientRect();
    const preview = previewRef.current;
    if (!rect || !preview) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      preview.style.left = `${x + 28}px`;
      preview.style.top = `${y - 96}px`;
    });
  }

  const active = capabilities.find((c) => c.slug === activeSlug);

  return (
    <div
      ref={listRef}
      onMouseMove={handleMove}
      onMouseLeave={() => setActiveSlug(null)}
      className="relative grid grid-cols-1 border-t border-line"
    >
      {capabilities.map((cap, idx) => (
        <Reveal key={cap.slug} delay={idx * 30}>
          <Link
            href={`/capabilities/${cap.slug}`}
            onMouseEnter={() => setActiveSlug(cap.slug)}
            className="group grid grid-cols-1 lg:grid-cols-[100px_1fr_1fr_auto] gap-6 lg:gap-10 items-start lg:items-center py-10 border-b border-line hover:bg-paperMuted transition-colors px-2"
          >
            <span className="font-mono text-sm font-bold text-signal">{cap.num}</span>
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-2">{cap.name}</h2>
              <p className="text-muted text-sm max-w-md leading-relaxed">{cap.tagline}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {cap.services.map((s) => (
                <span key={s.slug} className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 border border-line text-muted">
                  {s.name}
                </span>
              ))}
            </div>
            <span className="material-symbols-outlined text-muted group-hover:text-signal group-hover:translate-x-1 transition-all justify-self-end">
              arrow_forward
            </span>
          </Link>
        </Reveal>
      ))}

      <div
        ref={previewRef}
        className={`hidden lg:block absolute z-20 w-[240px] h-[160px] pointer-events-none transition-opacity duration-200 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      >
        {active && (
          <GenerativeArt
            seed={active.slug}
            label={active.shortName}
            index={active.num}
            interactive={false}
            width={480}
            height={320}
            className="w-full h-full border border-line shadow-2xl"
          />
        )}
      </div>
    </div>
  );
}
