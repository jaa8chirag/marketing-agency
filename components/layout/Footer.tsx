"use client";

import { useState } from "react";
import Link from "next/link";
import { navCapabilities, industries } from "@/lib/content";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubscribed(true);
  }

  return (
    <footer className="bg-ink text-paper border-t border-lineOnInk">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_2fr] gap-16 pb-16 border-b border-lineOnInk">
          <div>
            <span className="font-display text-3xl font-bold tracking-tight block mb-4">
              CORDINIT <span className="text-signal">MEDIA</span>
            </span>
            <p className="text-mutedOnInk max-w-sm leading-relaxed mb-8">
              Creative, media and growth for ambitious brands. Part of the Cordinit ecosystem.
            </p>
            <form onSubmit={handleSubscribe} className="max-w-sm">
              <label className="font-mono text-[11px] uppercase tracking-widest text-mutedOnInk block mb-3">
                Insights, straight to your inbox
              </label>
              {subscribed ? (
                <p className="font-mono text-xs text-lime uppercase tracking-wider py-3">
                  You&apos;re subscribed &mdash; thank you.
                </p>
              ) : (
                <div className="flex border border-lineOnInk">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Work email"
                    className="flex-1 bg-transparent px-4 py-3 text-sm text-paper placeholder:text-mutedOnInk focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 bg-paper text-ink font-mono text-[11px] font-bold uppercase hover:bg-signal hover:text-paper transition-colors"
                  >
                    Subscribe
                  </button>
                </div>
              )}
            </form>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-mutedOnInk block mb-4">
                Capabilities
              </span>
              <ul className="flex flex-col gap-3">
                {navCapabilities.map((cap) => (
                  <li key={cap.slug}>
                    <Link href={`/capabilities/${cap.slug}`} className="text-sm text-paper/85 hover:text-signal transition-colors">
                      {cap.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-mutedOnInk block mb-4">
                Industries
              </span>
              <ul className="flex flex-col gap-3">
                {industries.map((ind) => (
                  <li key={ind.slug}>
                    <Link href={`/industries/${ind.slug}`} className="text-sm text-paper/85 hover:text-signal transition-colors">
                      {ind.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-mutedOnInk block mb-4">
                Company
              </span>
              <ul className="flex flex-col gap-3">
                <li><Link href="/work" className="text-sm text-paper/85 hover:text-signal transition-colors">Work</Link></li>
                <li><Link href="/insights" className="text-sm text-paper/85 hover:text-signal transition-colors">Insights</Link></li>
                <li><Link href="/about" className="text-sm text-paper/85 hover:text-signal transition-colors">About</Link></li>
                <li><Link href="/ecosystem" className="text-sm text-paper/85 hover:text-signal transition-colors">Ecosystem</Link></li>
                <li><Link href="/careers" className="text-sm text-paper/85 hover:text-signal transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="text-sm text-paper/85 hover:text-signal transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-mutedOnInk block mb-4">
                Connect
              </span>
              <ul className="flex flex-col gap-3">
                <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-sm text-paper/85 hover:text-signal transition-colors">Instagram</a></li>
                <li><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-sm text-paper/85 hover:text-signal transition-colors">LinkedIn</a></li>
                <li><a href="https://x.com" target="_blank" rel="noreferrer" className="text-sm text-paper/85 hover:text-signal transition-colors">X / Twitter</a></li>
                <li><Link href="/legal/privacy-policy" className="text-sm text-paper/85 hover:text-signal transition-colors">Privacy Policy</Link></li>
                <li><Link href="/legal/terms-of-service" className="text-sm text-paper/85 hover:text-signal transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-wider text-mutedOnInk">
          <span>&copy; 2026 Cordinit Media. Part of the Cordinit ecosystem.</span>
          <Link href="/ecosystem" className="hover:text-paper transition-colors">
            Cordinit &middot; Cordinit Technology &middot; Cordinit Media
          </Link>
        </div>
      </div>
    </footer>
  );
}
