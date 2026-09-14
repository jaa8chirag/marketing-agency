"use client";

import { useState, useEffect } from "react";

const showcaseTabs = [
  {
    id: "nike",
    label: "01. NIKE FUTURE COUTURE",
    title: "NIKE — DIGITAL COUTURE CAMPAIGN",
    tag: "EDITORIAL CAMPAIGN / VIRTUAL FASHION",
    image: "/images/nike-campaign.jpg",
    badge: "CANNES LION GOLD",
  },
  {
    id: "spotify",
    label: "02. AURA OS DESKTOP",
    title: "AURA OS — SPOTIFY NEXT-GEN PLATFORM",
    tag: "DIGITAL PRODUCT DESIGN / DESIGN SYSTEM",
    image: "/images/spotify-ui.jpg",
    badge: "FWA OF THE YEAR",
  },
  {
    id: "spatial",
    label: "03. SPATIAL GALLERY",
    title: "LEVI’S — SPATIAL ARCHITECTURE INSTALLATION",
    tag: "SPATIAL COMPUTING / INTERACTIVE SCULPTURE",
    image: "/images/spatial-gallery.jpg",
    badge: "D&AD PENCIL",
  },
  {
    id: "monolith",
    label: "04. MONOLITH AI ENGINE",
    title: "MONOLITH OS — GENERATIVE AI WORKSPACE",
    tag: "AI PLATFORM / WEBGL RUNTIME",
    image: "/images/monolith.jpg",
    badge: "WEBBY WINNER",
  },
];

const techChips = [
  { name: "WebGPU", icon: "deployed_code" },
  { name: "React 19", icon: "code" },
  { name: "VisionOS", icon: "view_in_ar" },
  { name: "ComfyUI AI", icon: "auto_awesome" },
  { name: "Three.js", icon: "3d_rotation" },
  { name: "WASM / Rust", icon: "memory" },
];

export default function Hero() {
  const [activeTab, setActiveTab] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [timecode, setTimecode] = useState("00:48");
  const [fps, setFps] = useState(60);

  // Auto-switch showcase tabs every 6 seconds if not hovered
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % showcaseTabs.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Timecode animation simulation
  useEffect(() => {
    let seconds = 48;
    const interval = setInterval(() => {
      seconds = (seconds + 1) % 180;
      const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
      const secs = String(seconds % 60).padStart(2, "0");
      setTimecode(`${mins}:${secs}`);
      setFps(Math.floor(58 + Math.random() * 3));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentShowcase = showcaseTabs[activeTab];

  return (
    <section className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-12 pt-12 md:pt-16 pb-20 border-b border-slate-200 relative">
      {/* Background Animated Gradient Mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-emerald-500/10 blur-3xl pointer-events-none -z-10 rounded-full animate-pulse" />

      {/* Top Modular Engine Banner */}
      <div className="flex flex-wrap items-center justify-between gap-y-3 pb-8 mb-8 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1.5 rounded-full bg-darkText text-white font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            CORDINIT HQ ENGINE 4.0 // ONLINE
          </span>
          <span className="font-mono text-xs text-slate-500 hidden sm:inline-block">
            LATENCY: 12.4ms • {fps} FPS
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-slate-600 font-semibold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-accentBlue" />
          COMMISSIONS OPEN Q3/Q4 2026
        </div>
      </div>

      {/* Monumental Headline */}
      <div className="mb-12">
        <h1 className="font-display text-[42px] sm:text-[68px] md:text-[84px] lg:text-[100px] font-extrabold tracking-tightest leading-[0.96] text-darkText max-w-[1500px]">
          CRAFTING DIGITAL REALITIES AT THE INTERSECTION OF{" "}
          <span className="bg-gradient-to-r from-accentBlue via-indigo-600 to-emerald-500 bg-clip-text text-transparent underline decoration-slate-200 underline-offset-8">
            DESIGN, AI &amp; SPATIAL COMPUTING.
          </span>
        </h1>
      </div>

      {/* Interactive Modular Tech Chips Row */}
      <div className="flex flex-wrap items-center gap-2.5 mb-10">
        <span className="font-mono text-xs text-slate-400 font-bold uppercase mr-2 tracking-wider">
          TECH STACK &gt;
        </span>
        {techChips.map((chip, idx) => (
          <span
            key={idx}
            className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-mono text-xs font-semibold flex items-center gap-1.5 hover:bg-darkText hover:text-white hover:border-darkText transition-all cursor-pointer shadow-sm hover:scale-105"
          >
            <span className="material-symbols-outlined text-[16px] text-accentBlue">
              {chip.icon}
            </span>
            {chip.name}
          </span>
        ))}
      </div>

      {/* Modular Interactive Showcase Frame */}
      <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 shadow-2xl group cursor-pointer">
        <img
          key={currentShowcase.id}
          alt={currentShowcase.title}
          className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
          src={currentShowcase.image}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/30 pointer-events-none" />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="pointer-events-auto w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white text-darkText shadow-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-accentBlue group-hover:text-white transition-all duration-300"
            aria-label="Play Showreel"
          >
            <span className="material-symbols-outlined text-[36px] sm:text-[44px] ml-1">
              play_arrow
            </span>
          </button>
        </div>

        {/* HUD Top Bar */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-wider px-3.5 py-1.5 bg-white/90 backdrop-blur-md text-darkText font-bold rounded-full shadow-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              [ 4K SHOWREEL 2026 // LIVE ]
            </span>
            <span className="hidden sm:inline font-mono text-[11px] uppercase tracking-wider px-3.5 py-1.5 bg-black/60 backdrop-blur-md text-white rounded-full">
              TIMECODE {timecode}
            </span>
          </div>

          <button
            type="button"
            aria-label="Toggle Sound"
            onClick={(e) => {
              e.stopPropagation();
              setIsMuted(!isMuted);
            }}
            className="pointer-events-auto flex items-center gap-2 px-4 py-1.5 bg-black/70 backdrop-blur-md text-white rounded-full font-mono text-[11px] uppercase tracking-wider hover:bg-black transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">
              {isMuted ? "volume_off" : "volume_up"}
            </span>
            <span className="hidden sm:inline">{isMuted ? "SOUND OFF" : "SOUND ON"}</span>
            {!isMuted && (
              <div className="flex items-end gap-0.5 h-3 ml-1">
                <span className="w-0.5 bg-emerald-400 h-full animate-bounce" />
                <span className="w-0.5 bg-emerald-400 h-2/3 animate-pulse" />
                <span className="w-0.5 bg-emerald-400 h-4/5 animate-bounce" />
              </div>
            )}
          </button>
        </div>

        {/* Bottom Banner Info */}
        <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pointer-events-none">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="px-3 py-1 bg-accentBlue text-white font-mono text-[10px] uppercase font-bold rounded-full">
                {currentShowcase.badge}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-300">
                {currentShowcase.tag}
              </span>
            </div>
            <p className="font-display text-xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
              {currentShowcase.title}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="pointer-events-auto hidden sm:flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-darkText bg-white px-5 py-2.5 rounded-full font-bold shadow-lg hover:bg-accentBlue hover:text-white transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            WATCH 4K SHOWREEL [02:15]
          </button>
        </div>
      </div>

      {/* Modular Switcher Tabs below Frame */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
        {showcaseTabs.map((tab, idx) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(idx)}
            className={`p-4 rounded-2xl border text-left font-mono text-xs uppercase transition-all flex flex-col justify-between ${
              activeTab === idx
                ? "bg-slate-900 text-white border-slate-900 shadow-lg"
                : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-100"
            }`}
          >
            <span
              className={`font-bold block mb-1 ${
                activeTab === idx ? "text-emerald-400" : "text-accentBlue"
              }`}
            >
              {tab.label}
            </span>
            <span className="text-[10px] tracking-wider truncate text-slate-400 font-medium">
              {tab.tag}
            </span>
          </button>
        ))}
      </div>

      {/* Modular Metrics Counters Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-12 border-t border-slate-200">
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
          <span className="font-display text-3xl sm:text-4xl font-extrabold text-darkText block mb-1">
            240+
          </span>
          <span className="font-mono text-[10px] uppercase font-bold text-accentBlue tracking-wider block">
            GLOBAL INNOVATION AWARDS
          </span>
          <span className="font-sans text-xs text-slate-500 font-medium">
            Cannes Lions, D&amp;AD &amp; FWA of the Year
          </span>
        </div>

        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
          <span className="font-display text-3xl sm:text-4xl font-extrabold text-darkText block mb-1">
            4
          </span>
          <span className="font-mono text-[10px] uppercase font-bold text-accentBlue tracking-wider block">
            GLOBAL PRODUCTION HUBS
          </span>
          <span className="font-sans text-xs text-slate-500 font-medium">
            New York, Amsterdam, Tokyo &amp; London
          </span>
        </div>

        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
          <span className="font-display text-3xl sm:text-4xl font-extrabold text-darkText block mb-1">
            $2.4B+
          </span>
          <span className="font-mono text-[10px] uppercase font-bold text-accentBlue tracking-wider block">
            ENTERPRISE SCALE
          </span>
          <span className="font-sans text-xs text-slate-500 font-medium">
            Market capitalization unlocked post-launch
          </span>
        </div>

        <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
          <span className="font-display text-3xl sm:text-4xl font-extrabold text-darkText block mb-1">
            99.9%
          </span>
          <span className="font-mono text-[10px] uppercase font-bold text-accentBlue tracking-wider block">
            DEPLOYMENT UPTIME
          </span>
          <span className="font-sans text-xs text-slate-500 font-medium">
            High-availability global edge runtime
          </span>
        </div>
      </div>

      {/* 4K Video Player Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8">
          <div className="relative w-full max-w-6xl aspect-video bg-slate-900 rounded-2xl border border-slate-700 flex flex-col justify-between overflow-hidden shadow-2xl">
            <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between font-mono text-xs text-slate-300">
              <span className="text-white font-bold uppercase tracking-wider">
                [ CORDINIT HQ 2026 GLOBAL SHOWREEL ]
              </span>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded uppercase transition-colors"
              >
                CLOSE [ESC]
              </button>
            </div>

            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
              <img
                src={currentShowcase.image}
                alt="Showreel full frame"
                className="w-full h-full object-cover contrast-110 brightness-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-center justify-center">
                <div className="text-center px-6">
                  <span className="inline-block p-4 bg-white/10 backdrop-blur-md rounded-full mb-4 border border-white/20">
                    <span className="material-symbols-outlined text-4xl text-white animate-pulse">
                      play_circle
                    </span>
                  </span>
                  <h3 className="font-display text-2xl sm:text-4xl font-extrabold uppercase text-white mb-2">
                    CORDINIT ENGINE &amp; SPATIAL COMPUTING
                  </h3>
                  <p className="font-mono text-xs text-slate-300 uppercase">
                    3840x2160 Ultra HD • Dolby Atmos 7.1 Surround Output
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between font-mono text-xs">
              <span className="text-slate-400">TIMECODE: {timecode} / 02:15</span>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-5 py-2 bg-accentBlue text-white rounded-full font-bold uppercase hover:bg-blue-600 transition-colors shadow-md"
              >
                BACK TO SITE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
