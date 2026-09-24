"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import GenerativeArt from "@/components/ui/GenerativeArt";
import { duration, easing } from "@/lib/motion";
import type { Capability } from "@/lib/content";

export default function CapabilitiesAccordion({ capabilities }: { capabilities: Capability[] }) {
  const [openSlug, setOpenSlug] = useState<string | null>(capabilities[0]?.slug ?? null);

  return (
    <div className="bg-ink text-paper rounded-2xl sm:rounded-3xl px-6 sm:px-10 lg:px-14 py-16 md:py-20">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tightest text-balance">
          What We Can <span className="text-signal">Build Together.</span>
        </h2>
        <p className="mt-4 text-mutedOnInk leading-relaxed">
          From brand systems and cinematic production to full-funnel performance and automation
          &mdash; our capabilities configure to match whatever you&apos;re trying to grow.
        </p>
      </div>

      <div className="border-t border-lineOnInk">
        {capabilities.map((cap, idx) => {
          const isOpen = openSlug === cap.slug;

          return (
            <div key={cap.slug} className="border-b border-lineOnInk">
              <button
                type="button"
                onClick={() => setOpenSlug(isOpen ? null : cap.slug)}
                aria-expanded={isOpen}
                className="w-full flex items-center gap-4 sm:gap-8 py-6 text-left group"
              >
                <span className="font-mono text-sm text-mutedOnInk w-8 shrink-0">{cap.num}</span>
                <span className="font-display text-lg sm:text-xl font-bold tracking-tight w-full sm:w-64 shrink-0 group-hover:text-signal transition-colors">
                  {cap.name}
                </span>
                <span className="hidden sm:block flex-1 text-sm text-mutedOnInk truncate">
                  {cap.tagline}
                </span>
                <span
                  className={`shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-colors duration-300 ${
                    isOpen ? "bg-signal border-signal text-ink" : "border-lineOnInk text-paper"
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[18px] transition-transform duration-300"
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                    expand_more
                  </span>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: duration.base, ease: easing.standard }}
                    className="overflow-hidden"
                  >
                    <div className="relative mb-8 aspect-[16/8] sm:aspect-[21/9] rounded-xl overflow-hidden">
                      <GenerativeArt
                        seed={cap.slug}
                        width={960}
                        height={480}
                        interactive={false}
                        className="absolute inset-0 w-full h-full"
                      />

                      <div className="absolute bottom-4 right-4 left-4 sm:left-auto sm:w-80 bg-paper text-ink rounded-xl p-5 shadow-2xl">
                        <span className="w-8 h-8 rounded-full bg-signal text-ink flex items-center justify-center mb-3">
                          <span className="material-symbols-outlined text-[16px]">bolt</span>
                        </span>
                        <h3 className="font-display text-lg font-bold tracking-tight mb-1.5">{cap.name}</h3>
                        <p className="text-xs text-muted leading-relaxed mb-4">{cap.summary}</p>
                        <Link
                          href={`/capabilities/${cap.slug}`}
                          className="inline-flex items-center gap-1.5 text-signal font-mono text-xs font-bold uppercase tracking-wider hover:text-ink transition-colors"
                        >
                          Explore
                          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
