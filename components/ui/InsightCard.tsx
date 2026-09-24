import Link from "next/link";
import type { Insight } from "@/lib/content";
import TiltCard from "./TiltCard";
import GenerativeArt from "./GenerativeArt";
import RevealOnScroll from "@/components/fx/RevealOnScroll";
import BorderBeamHover from "@/components/fx/BorderBeamHover";

export default function InsightCard({ insight, index = 0 }: { insight: Insight; index?: number }) {
  return (
    <RevealOnScroll variant="staggerFadeUp" index={index}>
      <TiltCard max={5}>
        <BorderBeamHover className="shape-asymmetric">
          <Link
            href={`/insights/${insight.slug}`}
            className="group block border border-edge bg-surface hover:border-ink transition-colors duration-300 shape-asymmetric overflow-hidden"
          >
            <GenerativeArt seed={insight.slug} label={insight.type} width={480} height={220} className="h-28 w-full" />
            <div className="p-7 flex flex-col justify-between group-hover:bg-ink group-hover:text-paper transition-colors duration-300">
              <h3 className="font-display text-lg sm:text-xl font-semibold tracking-tight leading-snug mb-6">
                {insight.title}
              </h3>
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-fgMuted group-hover:text-mutedOnInk pt-4 border-t border-edge group-hover:border-lineOnInk">
                <span>{insight.date}</span>
                <span>&middot;</span>
                <span>{insight.readingTime}</span>
              </div>
            </div>
          </Link>
        </BorderBeamHover>
      </TiltCard>
    </RevealOnScroll>
  );
}
