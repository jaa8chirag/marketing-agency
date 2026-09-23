"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import GenerativeArt from "@/components/ui/GenerativeArt";
import { caseStudies } from "@/lib/content";

const words = ["CARE.", "WORK.", "GROW."];
const verbs = ["Make people", "Make experiences", "Make growth"];

const reel = caseStudies.slice(0, 4);

export default function HomeHero() {
  const [idx, setIdx] = useState(0);
  const [reelIdx, setReelIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % words.length), 2600);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setReelIdx((p) => (p + 1) % reel.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  const current = reel[reelIdx];

  return (
    <section className="relative pt-32 md:pt-40 pb-16 md:pb-20 border-b border-line overflow-hidden">
      <div className="absolute inset-0 content-grid opacity-[0.5] pointer-events-none" />
      <Container className="relative">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-2 h-2 rounded-full bg-signal animate-ticker-blink" />
          <span className="font-mono text-[11px] font-bold uppercase tracking-superwide text-muted">
            Cordinit Media &middot; Creative, Media &amp; Growth Company
          </span>
        </div>

        <h1 className="font-display text-[15vw] sm:text-[9vw] md:text-[7.2vw] lg:text-[104px] font-bold tracking-tightest leading-[0.92] text-ink text-balance">
          CREATIVE.
          <br />
          MEDIA.
          <br />
          <span className="text-signal">TECHNOLOGY.</span>
          <br />
          GROWTH.
        </h1>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-end">
          <p className="max-w-xl text-lg sm:text-xl text-muted leading-relaxed">
            Cordinit Media connects creative, production, digital, media and performance to
            help ambitious brands build, launch and grow. We&apos;re not a 360&deg; agency of
            disconnected departments &mdash; we&apos;re one system built around a single outcome.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/contact?intent=book-a-call">Book a Call</Button>
            <Button href="/work" variant="outline">See the Work</Button>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-line flex items-baseline gap-4 font-display text-2xl sm:text-4xl font-semibold tracking-tight">
          <span>{verbs[idx]}</span>
          <span key={idx} className="text-signal inline-block">{words[idx]}</span>
        </div>

        <div
          className="mt-10 relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] border border-line group"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <GenerativeArt seed={current.slug} interactive width={1400} height={700} className="w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent pointer-events-none" />

          <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
            <span className="px-3.5 py-1.5 bg-paper/90 backdrop-blur-md text-ink font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-signal animate-ticker-blink" />
              Selected Work &middot; {reelIdx + 1}/{reel.length}
            </span>
            <span className="hidden sm:inline px-3.5 py-1.5 bg-ink/60 backdrop-blur-md text-paper font-mono text-[11px] uppercase tracking-wider">
              {current.year}
            </span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-signal block mb-2">
                {current.client}
              </span>
              <p className="font-display text-xl sm:text-3xl font-bold text-paper max-w-xl leading-tight text-balance">
                {current.title}
              </p>
            </div>
            <Link
              href={`/work/${current.slug}`}
              className="shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-paper text-ink font-mono text-[11px] font-bold uppercase tracking-wider hover:bg-signal hover:text-paper transition-colors"
            >
              View Case Study
              <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          {reel.map((cs, i) => (
            <button
              key={cs.slug}
              type="button"
              onClick={() => setReelIdx(i)}
              className={`relative h-16 overflow-hidden border transition-colors ${
                reelIdx === i ? "border-ink" : "border-line hover:border-ink/40"
              }`}
            >
              <GenerativeArt seed={cs.slug} interactive={false} width={320} height={160} className="absolute inset-0 w-full h-full" />
              <span className="absolute inset-0 bg-ink/40 flex items-center justify-center font-mono text-[10px] uppercase tracking-wider text-paper px-2 text-center">
                {cs.client}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-line">
          {[
            { value: "08", label: "Connected capabilities" },
            { value: "31", label: "Specialist services" },
            { value: "100%", label: "CMS-editable platform" },
            { value: "1", label: "System, not silos" },
          ].map((stat) => (
            <div key={stat.label}>
              <span className="font-display text-3xl sm:text-5xl font-bold text-ink block">{stat.value}</span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted mt-2 block">{stat.label}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
