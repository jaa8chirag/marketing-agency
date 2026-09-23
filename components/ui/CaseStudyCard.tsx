import Link from "next/link";
import type { CaseStudy, Capability } from "@/lib/content";
import TiltCard from "./TiltCard";
import GenerativeArt from "./GenerativeArt";

export default function CaseStudyCard({
  caseStudy,
  capabilityNames,
}: {
  caseStudy: CaseStudy;
  capabilityNames: string[];
}) {
  return (
    <TiltCard max={5}>
      <Link
        href={`/work/${caseStudy.slug}`}
        className="group block border border-edge bg-surface hover:border-ink transition-colors duration-300"
      >
        <GenerativeArt
          seed={caseStudy.slug}
          index={caseStudy.year}
          label={caseStudy.client}
          width={480}
          height={300}
          className="h-40 w-full"
        />
        <div className="p-7 flex flex-col justify-between group-hover:bg-ink group-hover:text-paper transition-colors duration-300">
          <div className="flex flex-wrap gap-2 mb-4">
            {capabilityNames.slice(0, 2).map((name) => (
              <span
                key={name}
                className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 border border-edge group-hover:border-lineOnInk text-fgMuted group-hover:text-mutedOnInk"
              >
                {name}
              </span>
            ))}
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-signal block mb-2">
            {caseStudy.client}
          </span>
          <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight leading-snug mb-5">
            {caseStudy.title}
          </h3>
          <div className="flex gap-6 pt-4 border-t border-edge group-hover:border-lineOnInk">
            {caseStudy.results.slice(0, 2).map((r) => (
              <div key={r.label}>
                <span className="font-display text-xl font-bold block">{r.metric}</span>
                <span className="text-[11px] text-fgMuted group-hover:text-mutedOnInk">{r.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}

export function capabilityNamesFor(caseStudy: CaseStudy, capabilities: Capability[]) {
  return caseStudy.capabilities
    .map((slug) => capabilities.find((c) => c.slug === slug)?.name)
    .filter((n): n is string => Boolean(n));
}
