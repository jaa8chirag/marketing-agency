"use client";

import { useState } from "react";
import Link from "next/link";
import { navCapabilities } from "@/lib/content";

const navLinks = [
  { label: "Industries", href: "/industries" },
  { label: "Work", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeCap, setActiveCap] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCapOpen, setMobileCapOpen] = useState(false);

  const active = navCapabilities[activeCap];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-paper/95 backdrop-blur-md border-b border-line">
      <div className="max-w-[1440px] mx-auto h-20 px-6 sm:px-10 lg:px-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group shrink-0" onClick={() => setMegaOpen(false)}>
          <div className="w-9 h-9 bg-ink group-hover:bg-signal transition-colors flex items-center justify-center text-paper font-mono font-bold text-sm">
            C
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-lg font-bold tracking-tight text-ink">
              CORDINIT <span className="text-signal">MEDIA</span>
            </span>
            <span className="font-mono text-[9px] uppercase tracking-superwide text-muted mt-1">
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
              className={`px-4 py-2.5 flex items-center gap-1.5 transition-colors ${megaOpen ? "text-signal" : "text-ink hover:text-signal"}`}
            >
              Capabilities
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </button>

            {megaOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[720px]">
                <div className="bg-ink text-paper border border-lineOnInk shadow-2xl grid grid-cols-[280px_1fr]">
                  <div className="border-r border-lineOnInk py-3">
                    {navCapabilities.map((cap, idx) => (
                      <button
                        key={cap.slug}
                        type="button"
                        onMouseEnter={() => setActiveCap(idx)}
                        className={`w-full text-left px-6 py-2.5 flex items-center gap-3 transition-colors ${
                          activeCap === idx ? "bg-signal text-paper" : "text-mutedOnInk hover:text-paper"
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
                  <div className="p-6">
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
                </div>
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2.5 text-ink hover:text-signal transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/careers"
            className="font-mono text-[11px] uppercase tracking-widest font-bold text-muted hover:text-ink transition-colors px-3"
          >
            Careers
          </Link>
          <Link
            href="/contact?intent=book-a-call"
            className="inline-flex items-center gap-2 px-5 py-3 bg-ink text-paper font-mono text-[11px] font-bold uppercase tracking-widest hover:bg-signal transition-colors"
          >
            Book a Call
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden w-10 h-10 flex items-center justify-center border border-line"
        >
          <span className="material-symbols-outlined">{mobileOpen ? "close" : "menu"}</span>
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-paper z-40 overflow-y-auto border-t border-line">
          <div className="px-6 py-6 flex flex-col gap-1 font-mono text-sm uppercase tracking-wider font-bold">
            <button
              type="button"
              onClick={() => setMobileCapOpen(!mobileCapOpen)}
              className="flex items-center justify-between py-4 border-b border-line text-ink"
            >
              Capabilities
              <span className="material-symbols-outlined text-[18px]">
                {mobileCapOpen ? "remove" : "add"}
              </span>
            </button>
            {mobileCapOpen && (
              <div className="pb-4 border-b border-line flex flex-col gap-4">
                {navCapabilities.map((cap) => (
                  <Link
                    key={cap.slug}
                    href={`/capabilities/${cap.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="normal-case font-sans text-[15px] font-semibold text-ink flex items-center gap-3"
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
                className="py-4 border-b border-line text-ink"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/careers"
              onClick={() => setMobileOpen(false)}
              className="py-4 border-b border-line text-ink"
            >
              Careers
            </Link>
            <Link
              href="/contact?intent=book-a-call"
              onClick={() => setMobileOpen(false)}
              className="mt-6 text-center px-5 py-4 bg-ink text-paper"
            >
              Book a Call
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
