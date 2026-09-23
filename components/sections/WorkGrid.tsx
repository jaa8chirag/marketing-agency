"use client";

import { useMemo, useState } from "react";
import CaseStudyCard from "@/components/ui/CaseStudyCard";
import type { CaseStudy, Capability, Industry } from "@/lib/content";

export default function WorkGrid({
  caseStudies,
  capabilities,
  industries,
}: {
  caseStudies: CaseStudy[];
  capabilities: Capability[];
  industries: Industry[];
}) {
  const [capFilter, setCapFilter] = useState<string | null>(null);
  const [indFilter, setIndFilter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return caseStudies.filter((cs) => {
      const capMatch = capFilter ? cs.capabilities.includes(capFilter) : true;
      const indMatch = indFilter ? cs.industry === indFilter : true;
      return capMatch && indMatch;
    });
  }, [caseStudies, capFilter, indFilter]);

  return (
    <div>
      <div className="flex flex-col gap-6 mb-14">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted mr-2">Capability</span>
          <button
            type="button"
            onClick={() => setCapFilter(null)}
            className={`px-3.5 py-2 font-mono text-[11px] uppercase tracking-wider font-bold border transition-colors ${
              !capFilter ? "bg-ink text-paper border-ink" : "border-line text-muted hover:text-ink"
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
                capFilter === cap.slug ? "bg-signal text-paper border-signal" : "border-line text-muted hover:text-ink"
              }`}
            >
              {cap.shortName}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted mr-2">Industry</span>
          <button
            type="button"
            onClick={() => setIndFilter(null)}
            className={`px-3.5 py-2 font-mono text-[11px] uppercase tracking-wider font-bold border transition-colors ${
              !indFilter ? "bg-ink text-paper border-ink" : "border-line text-muted hover:text-ink"
            }`}
          >
            All
          </button>
          {industries.map((ind) => (
            <button
              key={ind.slug}
              type="button"
              onClick={() => setIndFilter(ind.slug === indFilter ? null : ind.slug)}
              className={`px-3.5 py-2 font-mono text-[11px] uppercase tracking-wider font-bold border transition-colors ${
                indFilter === ind.slug ? "bg-signal text-paper border-signal" : "border-line text-muted hover:text-ink"
              }`}
            >
              {ind.name}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="font-mono text-sm text-muted py-16 text-center border border-line">
          No work matches these filters yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((cs) => (
            <CaseStudyCard
              key={cs.slug}
              caseStudy={cs}
              capabilityNames={cs.capabilities
                .map((slug) => capabilities.find((c) => c.slug === slug)?.name)
                .filter((n): n is string => Boolean(n))}
            />
          ))}
        </div>
      )}
    </div>
  );
}
