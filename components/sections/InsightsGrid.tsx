"use client";

import { useMemo, useState } from "react";
import InsightCard from "@/components/ui/InsightCard";
import type { Insight, Capability } from "@/lib/content";

const types: Insight["type"][] = ["Article", "Guide", "Report", "Perspective", "Video", "Whitepaper"];

export default function InsightsGrid({
  insights,
  capabilities,
}: {
  insights: Insight[];
  capabilities: Capability[];
}) {
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [capFilter, setCapFilter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return insights.filter((i) => {
      const typeMatch = typeFilter ? i.type === typeFilter : true;
      const capMatch = capFilter ? i.capability === capFilter : true;
      return typeMatch && capMatch;
    });
  }, [insights, typeFilter, capFilter]);

  return (
    <div>
      <div className="flex flex-col gap-6 mb-14">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-wider text-fgMuted mr-2">Type</span>
          <button
            type="button"
            onClick={() => setTypeFilter(null)}
            className={`px-3.5 py-2 font-mono text-[11px] uppercase tracking-wider font-bold border transition-colors ${
              !typeFilter ? "bg-ink text-paper border-ink" : "border-edge text-fgMuted hover:text-fg"
            }`}
          >
            All
          </button>
          {types.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTypeFilter(t === typeFilter ? null : t)}
              className={`px-3.5 py-2 font-mono text-[11px] uppercase tracking-wider font-bold border transition-colors ${
                typeFilter === t ? "bg-signal text-paper border-signal" : "border-edge text-fgMuted hover:text-fg"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-wider text-fgMuted mr-2">Capability</span>
          <button
            type="button"
            onClick={() => setCapFilter(null)}
            className={`px-3.5 py-2 font-mono text-[11px] uppercase tracking-wider font-bold border transition-colors ${
              !capFilter ? "bg-ink text-paper border-ink" : "border-edge text-fgMuted hover:text-fg"
            }`}
          >
            All
          </button>
          {capabilities.map((cap) => (
            <button
              key={cap.slug}
              type="button"
              onClick={() => setCapFilter(cap.slug === capFilter ? null : cap.slug)}
              className={`px-3.5 py-2 font-mono text-[11px] uppercase tracking-wider font-bold border transition-colors ${
                capFilter === cap.slug ? "bg-signal text-paper border-signal" : "border-edge text-fgMuted hover:text-fg"
              }`}
            >
              {cap.shortName}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="font-mono text-sm text-fgMuted py-16 text-center border border-edge">
          No insights match these filters yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((insight, idx) => (
            <InsightCard key={insight.slug} insight={insight} index={idx} />
          ))}
        </div>
      )}
    </div>
  );
}
