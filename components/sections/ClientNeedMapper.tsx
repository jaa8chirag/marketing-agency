"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import GenerativeArt from "@/components/ui/GenerativeArt";
import { capabilities } from "@/lib/content";

export default function ClientNeedMapper() {
  const [active, setActive] = useState(0);
  const current = capabilities[active];
  const listRef = useRef<HTMLUListElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  function handleListMove(e: React.MouseEvent<HTMLUListElement>) {
    const rect = listRef.current?.getBoundingClientRect();
    const preview = previewRef.current;
    if (!rect || !preview) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      preview.style.left = `${x + 28}px`;
      preview.style.top = `${y - 88}px`;
    });
  }

  function handleEnter() {
    if (previewRef.current) previewRef.current.style.opacity = "1";
  }

  function handleLeave() {
    if (previewRef.current) previewRef.current.style.opacity = "0";
  }

  return (
    <section className="py-24 md:py-32 border-b border-edge bg-surfaceMuted">
      <Container>
        <Reveal>
          <Eyebrow index="00">Where do you start?</Eyebrow>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tightest max-w-2xl text-balance mb-14">
            Tell us the problem. We&apos;ll show you the capability.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16">
          <Reveal>
            <ul
              ref={listRef}
              onMouseMove={handleListMove}
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
              className="relative border-t border-ink/15"
            >
              {capabilities.map((cap, idx) => (
                <li key={cap.slug} className="border-b border-ink/15">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(idx)}
                    onClick={() => setActive(idx)}
                    className={`w-full flex items-center justify-between gap-4 py-5 text-left transition-colors group ${
                      active === idx ? "text-signal" : "text-fg hover:text-signal"
                    }`}
                  >
                    <span className="font-display text-xl sm:text-2xl font-semibold tracking-tight">
                      {cap.clientNeed}
                    </span>
                    <span className="material-symbols-outlined shrink-0 transition-transform duration-200 group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </button>
                </li>
              ))}

              <div
                ref={previewRef}
                className="hidden md:block absolute z-20 w-[220px] h-[150px] pointer-events-none opacity-0 transition-opacity duration-200"
              >
                <GenerativeArt
                  seed={current.slug}
                  label={current.shortName}
                  index={current.num}
                  interactive={false}
                  width={440}
                  height={300}
                  className="w-full h-full border border-lineOnInk shadow-2xl"
                />
              </div>
            </ul>
          </Reveal>

          <Reveal delay={100}>
            <div className="bg-ink text-paper p-8 md:p-10 h-full flex flex-col justify-between min-h-[360px]">
              <div>
                <span className="font-mono text-[11px] text-signal font-bold">{current.num} // CAPABILITY</span>
                <h3 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mt-4 mb-5">
                  {current.name}
                </h3>
                <p className="text-mutedOnInk leading-relaxed mb-6">{current.summary}</p>
                <ul className="flex flex-col gap-2.5">
                  {current.services.slice(0, 4).map((s) => (
                    <li key={s.slug} className="flex items-center gap-3 text-sm text-paper/85">
                      <span className="w-1 h-1 bg-signal shrink-0" />
                      {s.name}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={`/capabilities/${current.slug}`}
                className="inline-flex items-center gap-2 mt-8 pt-6 border-t border-lineOnInk font-mono text-[11px] font-bold uppercase tracking-widest text-lime hover:text-paper transition-colors w-fit"
              >
                Explore {current.shortName}
                <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
