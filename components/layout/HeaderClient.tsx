"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import type { NavCapability, SiteSettings } from "@/lib/queries";
import { trackEvent } from "@/lib/analytics";
import GenerativeArt from "@/components/ui/GenerativeArt";
import ThemeToggle from "@/components/ui/ThemeToggle";
import CyclingWord from "@/components/fx/CyclingWord";
import { TiltCard, TiltCardItem } from "@/components/spectrumui/tilt-card";

// Fallback used only when no siteSettings prop is passed (e.g. app/error.tsx,
// which renders HeaderClient directly without hitting the database).
const FALLBACK_NAV_LINKS = [
  { label: "Industries", href: "/industries" },
  { label: "Work", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

export default function HeaderClient({
  navCapabilities,
  siteSettings,
}: {
  navCapabilities: NavCapability[];
  siteSettings?: SiteSettings;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const navLinks = siteSettings?.primaryNavLinks.length ? siteSettings.primaryNavLinks : FALLBACK_NAV_LINKS;
  const ctaLabel = siteSettings?.primaryCtaLabel ?? "Book a Call";
  const ctaHref = siteSettings?.primaryCtaHref ?? "/contact?intent=book-a-call";
  const announcementText = siteSettings?.announcementText ?? null;
  const announcementHref = siteSettings?.announcementHref ?? ctaHref;

  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [announceOpen, setAnnounceOpen] = useState(true);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCapOpen, setMobileCapOpen] = useState(false);
  const megaCloseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openMega() {
    if (megaCloseTimeout.current) clearTimeout(megaCloseTimeout.current);
    setMegaOpen(true);
  }
  function scheduleCloseMega() {
    megaCloseTimeout.current = setTimeout(() => setMegaOpen(false), 150);
  }
  function closeMega() {
    if (megaCloseTimeout.current) clearTimeout(megaCloseTimeout.current);
    setMegaOpen(false);
  }

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

  useEffect(() => {
    document.body.classList.toggle("mega-menu-open", megaOpen);
    return () => document.body.classList.remove("mega-menu-open");
  }, [megaOpen]);

  const transparent = isHome && !scrolled && !megaOpen && !mobileOpen;
  const textTone = transparent ? "text-paper" : "text-fg";
  const mutedTone = transparent ? "text-paper/70" : "text-fgMuted";

  return (
    <>
      <a
        href="#main-content"
        className="fixed top-2 left-2 z-[100] -translate-y-24 focus:translate-y-0 bg-signal text-ink font-mono text-[11px] font-bold uppercase tracking-widest px-4 py-3 rounded transition-transform duration-200"
      >
        Skip to content
      </a>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
          transparent ? "bg-transparent" : "bg-surface/95 backdrop-blur-md border-b border-edge"
        }`}
      >
      {announceOpen && announcementText && (
        <div className={`w-full ${transparent ? "bg-black/30 backdrop-blur-sm" : "bg-ink"} text-paper`}>
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 h-9 flex items-center justify-between font-mono text-[11px]">
            <Link
              href={announcementHref}
              onClick={() => trackEvent("book_call_click", { href: announcementHref, location: "announcement-bar" })}
              className="flex items-center gap-2 hover:text-signal transition-colors"
            >
              <span className="text-signal">&#9679;</span>
              {announcementText}
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
              CORDINIT<span className="text-signal">.</span>{" "}
              <CyclingWord className="text-signal" />
            </span>
            <span className={`font-mono text-[9px] uppercase tracking-superwide mt-1 transition-colors ${mutedTone}`}>
              Creative &middot; Media &middot; Growth
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest font-bold">
          <div onMouseEnter={openMega} onMouseLeave={scheduleCloseMega}>
            <button
              type="button"
              className={`px-4 py-2.5 flex items-center gap-1.5 transition-colors ${
                megaOpen ? "text-signal" : `${textTone} hover:text-signal`
              }`}
            >
              Capabilities
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </button>
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
            href={ctaHref}
            onClick={() => trackEvent("book_call_click", { href: ctaHref, location: "nav-primary" })}
            className="inline-flex items-center gap-2 px-5 py-3 bg-signal text-ink font-mono text-[11px] font-bold uppercase tracking-widest hover:bg-lime transition-colors"
          >
            {ctaLabel}
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

      {megaOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm"
            aria-hidden="true"
            onMouseEnter={openMega}
            onMouseLeave={scheduleCloseMega}
            onClick={closeMega}
          />
          <div
            className="border-beam hidden lg:block absolute top-full left-0 w-full z-50 bg-ink/60 backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
            onMouseEnter={openMega}
            onMouseLeave={scheduleCloseMega}
          >
            <button
              type="button"
              aria-label="Close menu"
              onClick={closeMega}
              className="absolute top-6 right-6 sm:right-10 lg:right-14 z-10 w-10 h-10 rounded-full border border-paper/30 flex items-center justify-center text-paper hover:border-signal hover:text-signal transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
            <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-10 grid grid-cols-[300px_1fr] gap-12">
              <div className="flex flex-col justify-between border-r border-paper/15 pr-10">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-superwide text-paper/60 block mb-4">
                    Capabilities
                  </span>
                  <h3 className="normal-case font-display text-3xl font-bold leading-tight tracking-tight text-paper mb-4">
                    Ideas that create. Technology that connects. Growth that performs.
                  </h3>
                  <p className="normal-case font-sans text-sm text-paper/70 leading-relaxed">
                    Eight connected capabilities working from a single brief.
                  </p>
                </div>
                <Link
                  href="/capabilities"
                  onClick={() => setMegaOpen(false)}
                  className="mt-8 inline-flex items-center justify-center border border-paper/30 rounded-full px-5 py-3 font-mono text-[11px] uppercase tracking-widest font-bold text-paper hover:border-signal hover:text-signal transition-colors"
                >
                  Explore all capabilities
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-5">
                {navCapabilities.map((cap) => (
                  <TiltCard
                    key={cap.slug}
                    maxTilt={10}
                    scale={1.03}
                    perspective={900}
                    glare
                    glareColor="rgba(168, 255, 175, 0.12)"
                    containerClassName="h-[150px]"
                    className="group h-full rounded-2xl bg-ink border border-lineOnInk/70 overflow-hidden shadow-xl hover:border-signal/40 hover:shadow-[0_20px_45px_rgba(0,0,0,0.55)] transition-[border-color,box-shadow] duration-200"
                  >
                    <Link
                      href={`/capabilities/${cap.slug}`}
                      onClick={() => setMegaOpen(false)}
                      className="relative flex h-full w-full flex-col justify-between p-5"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className="absolute inset-y-0 right-0 w-[58%] overflow-hidden">
                        <GenerativeArt
                          seed={cap.slug}
                          imageUrl={cap.imageUrl}
                          interactive={false}
                          width={320}
                          height={300}
                          className="w-full h-full object-cover grayscale-[30%] contrast-105 brightness-[0.9] saturate-[0.85] scale-105 transition-[filter,transform] duration-700 ease-out group-hover:grayscale-0 group-hover:brightness-100 group-hover:saturate-100 group-hover:scale-115"
                        />
                        {/* Diagonal light sweep on hover */}
                        <div className="pointer-events-none absolute inset-0 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-paper/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                        {/* Localized vignette so the title stays legible without a flat black band */}
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(10,10,8,0.85)_0%,transparent_55%)]" />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/60 to-transparent" />
                      </div>

                      <TiltCardItem depth={30} className="relative z-10 max-w-[55%]">
                        <h4 className="normal-case font-display text-lg font-bold leading-snug text-paper">
                          {cap.name}
                        </h4>
                      </TiltCardItem>
                      <TiltCardItem depth={22} className="relative z-10">
                        <span className="inline-flex items-center gap-1 normal-case font-sans text-[13px] font-semibold text-paper/80 group-hover:text-lime transition-colors">
                          Explore
                          <span className="material-symbols-outlined text-[15px]">arrow_outward</span>
                        </span>
                      </TiltCardItem>
                    </Link>
                  </TiltCard>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

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
              href={ctaHref}
              onClick={() => {
                trackEvent("book_call_click", { href: ctaHref, location: "mobile-nav" });
                setMobileOpen(false);
              }}
              className="mt-6 text-center px-5 py-4 bg-signal text-ink"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      )}
      </header>
    </>
  );
}
