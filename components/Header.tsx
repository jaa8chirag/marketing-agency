"use client";

import Link from "next/link";
import StudioClocks from "./StudioClocks";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
      <div className="max-w-[1600px] mx-auto h-20 px-6 sm:px-10 lg:px-12 flex items-center justify-between">
        {/* Custom Brand Logo & Name */}
        <Link href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-slate-900 overflow-hidden p-1 shadow-md group-hover:scale-105 group-hover:bg-accentBlue transition-all flex items-center justify-center">
            <img
              src="/images/arcade-logo.png"
              alt="ARCADE STUDIOS Logo"
              className="w-full h-full object-contain brightness-200"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-darkText group-hover:text-accentBlue transition-colors leading-none">
              ARCADE<span className="text-accentBlue">.</span>
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold mt-0.5">
              CREATIVE STUDIO
            </span>
          </div>
        </Link>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 font-sans text-xs uppercase tracking-widest font-semibold text-slate-600">
          <Link href="#work" className="hover:text-accentBlue transition-colors">
            Work
          </Link>
          <Link href="#capabilities" className="hover:text-accentBlue transition-colors">
            Capabilities
          </Link>
          <Link href="#culture" className="hover:text-accentBlue transition-colors">
            Culture
          </Link>
          <Link href="#impact" className="hover:text-accentBlue transition-colors">
            Impact
          </Link>
          <Link href="#contact" className="hover:text-accentBlue transition-colors">
            Studio
          </Link>
        </nav>

        {/* Right Section: Hub Clocks & CTA */}
        <div className="flex items-center gap-5">
          <StudioClocks />
          <Link
            href="#contact"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-darkText text-white rounded-full font-sans text-xs font-bold uppercase tracking-wider hover:bg-accentBlue shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            Start a Project
          </Link>
        </div>
      </div>
    </header>
  );
}
