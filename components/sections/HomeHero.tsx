"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedReel from "@/components/ui/AnimatedReel";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomeHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Video panel starts fully below the viewport — completely hidden —
      // so the opening screen is clean, big text only.
      gsap.set(videoRef.current, { yPercent: 100 });
      gsap.set(endRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 0.6,
          pin: pinRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(textRef.current, { opacity: 0, scale: 0.9, ease: "power2.inOut" }, 0)
        .to(scrollCueRef.current, { opacity: 0, ease: "power1.out" }, 0)
        .to(videoRef.current, { yPercent: 0, ease: "power2.inOut" }, 0.12)
        .to(endRef.current, { opacity: 1, ease: "power1.out" }, 0.78);
    }, sectionRef);

    function handleLoad() {
      ScrollTrigger.refresh();
    }
    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[300vh] bg-ink">
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden bg-ink flex items-center justify-center">
        <div className="absolute inset-0 content-grid opacity-[0.06] pointer-events-none" />

        <div ref={videoRef} className="absolute inset-0 z-10" style={{ willChange: "transform" }}>
          <AnimatedReel />
        </div>

        <div ref={textRef} className="relative z-0 text-center px-6 pointer-events-none">
          <span className="font-mono text-[11px] font-bold uppercase tracking-superwide text-mutedOnInk mb-6 block">
            Cordinit Media
          </span>
          <h1 className="font-display font-bold tracking-tightest text-[13vw] sm:text-[8.5vw] lg:text-[6.4vw] leading-[0.98] text-paper">
            MAKE PEOPLE <span className="text-signal">CARE.</span>
            <br />
            MAKE IT <span className="text-signal">WORK.</span>
            <br />
            MAKE IT <span className="text-signal">GROW.</span>
          </h1>
        </div>

        <div
          ref={endRef}
          className="absolute inset-0 z-20 flex flex-col justify-end p-8 sm:p-14 pointer-events-none"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 pointer-events-auto">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-signal block mb-2">
                Showreel &middot; 2026
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-paper max-w-lg leading-tight">
                Creative, media and growth &mdash; made real.
              </h2>
            </div>
            <Link
              href="/contact?intent=book-a-call"
              className="group shrink-0 inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-paper text-ink font-mono text-[11px] font-bold uppercase tracking-widest hover:bg-signal transition-colors"
            >
              Let&apos;s Connect
              <span className="w-9 h-9 rounded-full bg-ink text-paper flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                <span className="material-symbols-outlined text-[18px]">arrow_outward</span>
              </span>
            </Link>
          </div>
        </div>

        <div
          ref={scrollCueRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-0 flex flex-col items-center gap-2"
        >
          <span className="w-10 h-10 rounded-full border border-paper/40 flex items-center justify-center animate-float">
            <span className="material-symbols-outlined text-paper/70 text-[16px]">arrow_downward</span>
          </span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-paper/50">Scroll</span>
        </div>
      </div>
    </section>
  );
}
