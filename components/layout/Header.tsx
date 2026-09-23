"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import { navCapabilities, relatedCaseStudies, capabilities } from "@/lib/content";
import GenerativeArt from "@/components/ui/GenerativeArt";
import ThemeToggle from "@/components/ui/ThemeToggle";

const navLinks = [
  { label: "Industries", href: "/industries" },
  { label: "Work", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [announceOpen, setAnnounceOpen] = useState(true);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeCap, setActiveCap] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCapOpen, setMobileCapOpen] = useState(false);

  const active = navCapabilities[activeCap];
  const activeFull = capabilities[activeCap];
  const featured = relatedCaseStudies({ capability: activeFull.slug })[0];

  useEffect(() => {
    let lastY = window.scrollY;
    function onScroll() {
      const y = window.scrollY;
      // The homepage hero is a pinned, scroll-driven animation ~2 viewport
      // heights tall — keep the header transparent/still for its full
      // duration instead of going solid after the usual small scroll.
      const solidThreshold = isHome ? window.innerHeight * 1.9 : 32;
      setScrolled(y > solidThreshold);
      setHidden(y > lastY && y > solidThreshold + 40);
      lastY = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    if (!headerRef.current) return;
    gsap.to(headerRef.current, {
      yPercent: hidden ? -100 : 0,
      duration: 0.5,
      ease: "power3.out",
    });
  }, [hidden]);

  const transparent = isHome && !scrolled && !megaOpen && !mobileOpen;
  const textTone = transparent ? "text-paper" : "text-fg";
  const mutedTone = transparent ? "text-paper/70" : "text-fgMuted";

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        transparent ? "bg-transparent" : "bg-surface/95 backdrop-blur-md border-b border-edge"
      }`}
    >
      {announceOpen && (
        <div className={`w-full ${transparent ? "bg-black/30 backdrop-blur-sm" : "bg-ink"} text-paper`}>
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 h-9 flex items-center justify-between font-mono text-[11px]">
            <Link href="/contact?intent=book-a-call" className="flex items-center gap-2 hover:text-signal transition-colors">
              <span className="text-signal">&#9679;</span>
              Now booking Q1 2027 &mdash; Book a Call
              <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
            </Link>
            <button
              type="button"
              aria-label="Dismiss announcement"
              onClick={() => setAnnounceOpen(false)}
              className="text-paper/60 hover:text-paper transition-colors"
            >
              <span className="material-symbols-outlined text-[15px]">close</span>
            </button>
          </div>
        </div>
      )}

      <div className="max-w-[1440px] mx-auto h-20 px-6 sm:px-10 lg:px-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group shrink-0" onClick={() => setMegaOpen(false)}>
          <div className="w-9 h-9 bg-signal group-hover:bg-lime transition-colors flex items-center justify-center text-ink font-mono font-bold text-sm">
            C
          </div>
          <div className="flex flex-col leading-none">
            <span className={`font-display text-lg font-bold tracking-tight transition-colors ${textTone}`}>
              CORDINIT <span className="text-signal">MEDIA</span>
            </span>
            <span className={`font-mono text-[9px] uppercase tracking-superwide mt-1 transition-colors ${mutedTone}`}>
              Creative &middot; Media &middot; Growth
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest font-bold">
          <div
            className="relative"
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <button
              type="button"
              className={`px-4 py-2.5 flex items-center gap-1.5 transition-colors ${
                megaOpen ? "text-signal" : `${textTone} hover:text-signal`
              }`}
            >
              Capabilities
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </button>

            {megaOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[900px]">
                <div className="bg-ink text-paper border border-lineOnInk shadow-2xl grid grid-cols-[260px_1fr_280px]">
                  <div className="border-r border-lineOnInk py-3">
                    {navCapabilities.map((cap, idx) => (
                      <button
                        key={cap.slug}
                        type="button"
                        onMouseEnter={() => setActiveCap(idx)}
                        className={`w-full text-left px-6 py-2.5 flex items-center gap-3 transition-colors ${
                          activeCap === idx ? "bg-signal text-ink" : "text-mutedOnInk hover:text-paper"
                        }`}
                      >
                        <span className="text-[10px] font-bold">{cap.num}</span>
                        <span className="normal-case font-sans text-[13px] font-semibold tracking-normal">
                          {cap.name}
                        </span>
                      </button>
                    ))}
                    <Link
                      href="/capabilities"
                      className="block px-6 pt-4 mt-2 border-t border-lineOnInk text-lime normal-case font-sans text-[13px] font-semibold tracking-normal hover:text-paper transition-colors"
                    >
                      View all capabilities &rarr;
                    </Link>
                  </div>
                  <div className="p-6 border-r border-lineOnInk">
                    <span className="text-[10px] text-mutedOnInk block mb-4">Services</span>
                    <ul className="grid grid-cols-1 gap-1">
                      {active.services.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/capabilities/${active.slug}/${s.slug}`}
                            className="normal-case font-sans text-[14px] font-medium text-paper/90 hover:text-lime transition-colors flex items-center justify-between group py-1.5"
                          >
                            {s.name}
                            <span className="material-symbols-outlined text-[15px] opacity-0 group-hover:opacity-100 transition-opacity">
                              arrow_outward
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/capabilities/${active.slug}`}
                      className="inline-block mt-5 pt-4 border-t border-lineOnInk normal-case font-sans text-[13px] font-semibold text-signal hover:text-lime transition-colors"
                    >
                      Explore {active.name} &rarr;
                    </Link>
                  </div>
                  {featured && (
                    <Link href={`/work/${featured.slug}`} className="group block p-5">
                      <span className="text-[10px] text-mutedOnInk block mb-3">Featured Work</span>
                      <GenerativeArt
                        seed={featured.slug}
                        label={featured.client}
                        width={480}
                        height={320}
                        className="w-full aspect-[4/3] mb-3 border border-lineOnInk"
                      />
                      <p className="normal-case font-sans text-[13px] font-semibold text-paper/90 group-hover:text-lime transition-colors leading-snug">
                        {featured.title}
                      </p>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2.5 transition-colors hover:text-signal ${textTone}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle
            className={
              transparent
                ? "border-paper/30 text-paper hover:border-paper"
                : "border-edge text-fg hover:border-fg"
            }
          />
          <Link
            href="/careers"
            className={`font-mono text-[11px] uppercase tracking-widest font-bold transition-colors px-3 ${
              transparent ? "text-paper/70 hover:text-paper" : "text-fgMuted hover:text-fg"
            }`}
          >
            Careers
          </Link>
          <Link
            href="/contact?intent=book-a-call"
            className="inline-flex items-center gap-2 px-5 py-3 bg-signal text-ink font-mono text-[11px] font-bold uppercase tracking-widest hover:bg-lime transition-colors"
          >
            Book a Call
          </Link>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <ThemeToggle
            className={
              transparent
                ? "border-paper/30 text-paper hover:border-paper"
                : "border-edge text-fg hover:border-fg"
            }
          />
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`w-10 h-10 flex items-center justify-center border transition-colors ${
              transparent ? "border-paper/40 text-paper" : "border-edge text-fg"
            }`}
          >
            <span className="material-symbols-outlined">{mobileOpen ? "close" : "menu"}</span>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-surface z-40 overflow-y-auto border-t border-edge">
          <div className="px-6 py-6 flex flex-col gap-1 font-mono text-sm uppercase tracking-wider font-bold">
            <button
              type="button"
              onClick={() => setMobileCapOpen(!mobileCapOpen)}
              className="flex items-center justify-between py-4 border-b border-edge text-fg"
            >
              Capabilities
              <span className="material-symbols-outlined text-[18px]">
                {mobileCapOpen ? "remove" : "add"}
              </span>
            </button>
            {mobileCapOpen && (
              <div className="pb-4 border-b border-edge flex flex-col gap-4">
                {navCapabilities.map((cap) => (
                  <Link
                    key={cap.slug}
                    href={`/capabilities/${cap.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="normal-case font-sans text-[15px] font-semibold text-fg flex items-center gap-3"
                  >
                    <span className="text-signal font-mono text-xs">{cap.num}</span>
                    {cap.name}
                  </Link>
                ))}
              </div>
            )}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-4 border-b border-edge text-fg"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/careers"
              onClick={() => setMobileOpen(false)}
              className="py-4 border-b border-edge text-fg"
            >
              Careers
            </Link>
            <Link
              href="/contact?intent=book-a-call"
              onClick={() => setMobileOpen(false)}
              className="mt-6 text-center px-5 py-4 bg-signal text-ink"
            >
              Book a Call
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
