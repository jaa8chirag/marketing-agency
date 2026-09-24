"use client";

import Link from "next/link";
import type { Insight } from "@/lib/content";
import GenerativeArt from "./GenerativeArt";
import RevealOnScroll from "@/components/fx/RevealOnScroll";

export default function InsightCard({
  insight,
  index = 0,
}: {
  insight: Insight;
  index?: number;
}) {
  const isVideo = insight.type.toLowerCase().includes("video");

  return (
    <RevealOnScroll variant="cascadeGrid" index={index} className="h-full">
      <Link
        href={`/insights/${insight.slug}`}
        className="group relative flex flex-col justify-between h-full rounded-2xl overflow-hidden border border-edge bg-surface transition-all duration-300 hover:-translate-y-2 hover:border-signal/50 hover:shadow-[0_24px_50px_rgba(0,0,0,0.35)] p-2.5 sm:p-3"
      >
        <div>
          {/* Top Media Thumbnail Container */}
          <div className="relative h-52 sm:h-56 w-full rounded-xl overflow-hidden bg-ink border border-line/20 dark:border-lineOnInk/60">
            <GenerativeArt
              seed={insight.slug}
              interactive={false}
              width={640}
              height={400}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Cinematic Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent pointer-events-none" />

            {/* Floating Format Pill & Circular Action Icon */}
            <div className="absolute inset-x-0 top-0 p-3.5 flex items-center justify-between pointer-events-none">
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold text-paper bg-ink/80 border border-lineOnInk/80 px-2.5 py-1 rounded-full backdrop-blur-md uppercase tracking-wider">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isVideo ? "bg-signal animate-pulse" : "bg-signal"
                  }`}
                />
                {insight.type}
              </span>

              <span className="w-8 h-8 rounded-full bg-paper text-ink flex items-center justify-center shadow-lg transition-all duration-300 group-hover:bg-signal group-hover:rotate-45 group-hover:scale-110">
                <span className="material-symbols-outlined text-[16px]">
                  arrow_outward
                </span>
              </span>
            </div>

            {/* Bottom Meta on Media: Reading Time Tag */}
            <div className="absolute bottom-3 left-3 pointer-events-none">
              <span className="font-mono text-[10px] font-semibold text-paper/90 bg-ink/80 border border-lineOnInk/60 px-2 py-0.5 rounded backdrop-blur-xs">
                {insight.readingTime}
              </span>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-4 sm:p-5">
            {/* Date & Capability */}
            <div className="flex items-center justify-between text-fgMuted font-mono text-[11px] uppercase tracking-wider mb-2.5">
              <span>{insight.date}</span>
              {insight.capability && (
                <span className="text-signal/90 font-medium">
                  {insight.capability.replace("-", " ")}
                </span>
              )}
            </div>

            {/* Article Headline */}
            <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight leading-snug text-fg group-hover:text-signal transition-colors mb-2.5">
              {insight.title}
            </h3>

            {/* Excerpt / Summary */}
            <p className="text-sm font-sans text-fgMuted line-clamp-2 leading-relaxed">
              {insight.summary}
            </p>
          </div>
        </div>

        {/* Card Footer: Read Action */}
        <div className="px-4 sm:px-5 pb-4 pt-3 border-t border-edge/60 flex items-center justify-between mt-auto">
          <span className="font-mono text-xs font-semibold text-fgMuted group-hover:text-fg transition-colors">
            {insight.author ?? "Editorial Team"}
          </span>
          <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-signal group-hover:translate-x-1 transition-transform">
            <span>Read</span>
            <span>→</span>
          </span>
        </div>
      </Link>
    </RevealOnScroll>
  );
}
