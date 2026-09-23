"use client";

import { useEffect, useState } from "react";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import GenerativeArt from "@/components/ui/GenerativeArt";
import CompareSlider from "@/components/ui/CompareSlider";

export default function CaseStudyGallery({ slug, client }: { slug: string; client: string }) {
  const frames = [
    { seed: `${slug}-frame-02`, label: `${client} · Frame 02` },
    { seed: `${slug}-frame-03`, label: `${client} · Frame 03` },
    { seed: `${slug}-frame-04`, label: `${client} · Frame 04` },
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    if (openIdx === null) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIdx(null);
      if (e.key === "ArrowRight") setOpenIdx((i) => (i === null ? i : (i + 1) % frames.length));
      if (e.key === "ArrowLeft") setOpenIdx((i) => (i === null ? i : (i - 1 + frames.length) % frames.length));
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIdx]);

  return (
    <section className="py-20 md:py-28 border-b border-line bg-paperMuted">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
        <Reveal>
          <Eyebrow index="G">Gallery</Eyebrow>
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted mb-8">
            Drag the slider to compare concept vs. final &middot; click a frame to expand
          </p>
        </Reveal>

        <Reveal>
          <CompareSlider
            beforeSeed={`${slug}-concept`}
            afterSeed={`${slug}-final`}
            beforeLabel="Concept"
            afterLabel="Final"
            className="aspect-[16/8] w-full mb-4"
          />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {frames.map((frame, idx) => (
            <Reveal key={frame.seed} delay={idx * 40}>
              <button type="button" onClick={() => setOpenIdx(idx)} className="block w-full text-left">
                <GenerativeArt
                  seed={frame.seed}
                  label={frame.label}
                  className="aspect-[4/3] w-full cursor-zoom-in"
                />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {openIdx !== null && (
        <div
          className="fixed inset-0 z-[200] bg-ink/95 backdrop-blur-sm flex items-center justify-center p-6 sm:p-12"
          onClick={() => setOpenIdx(null)}
        >
          <button
            type="button"
            onClick={() => setOpenIdx(null)}
            className="absolute top-6 right-6 w-11 h-11 flex items-center justify-center border border-lineOnInk text-paper hover:bg-paper hover:text-ink transition-colors"
            aria-label="Close"
          >
            <span className="material-symbols-outlined">close</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIdx((i) => (i === null ? i : (i - 1 + frames.length) % frames.length));
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-lineOnInk text-paper hover:bg-paper hover:text-ink transition-colors"
            aria-label="Previous"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          <div className="w-full max-w-4xl aspect-[16/10]" onClick={(e) => e.stopPropagation()}>
            <GenerativeArt
              seed={frames[openIdx].seed}
              label={frames[openIdx].label}
              index={`${openIdx + 1} / ${frames.length}`}
              className="w-full h-full border border-lineOnInk"
            />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIdx((i) => (i === null ? i : (i + 1) % frames.length));
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-lineOnInk text-paper hover:bg-paper hover:text-ink transition-colors"
            aria-label="Next"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      )}
    </section>
  );
}
