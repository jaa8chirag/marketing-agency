"use client";

import React, { useRef, useState } from "react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Marquee from "@/components/ui/Marquee";
import { clientLogos } from "@/lib/content";

interface ClientVideoTestimonial {
  id: string;
  company: string;
  name: string;
  role: string;
  subtitle: string;
  poster: string;
  videoSrc?: string;
}

const clientVideos: ClientVideoTestimonial[] = [
  {
    id: "pros",
    company: "PROS.",
    name: "Susanne Senoff",
    role: "CISO & VP Security",
    subtitle: "“I think once you've got the foundation right, scaling is automatic.”",
    poster: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80",
    videoSrc: "/videos/hero-reel.mp4",
  },
  {
    id: "northbound",
    company: "NORTHBOUND",
    name: "Marcus Vance",
    role: "Head of Growth",
    subtitle: "“Areas where we used to spend days now take minutes.”",
    poster: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=80",
    videoSrc: "/videos/hero-reel.mp4",
  },
  {
    id: "solace",
    company: "SOLACE",
    name: "Sarah Jenkins",
    role: "Chief Executive Officer",
    subtitle: "“The brand work gave every channel a real engine to build on.”",
    poster: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop&q=80",
    videoSrc: "/videos/hero-reel.mp4",
  },
  {
    id: "genpact",
    company: "genpact",
    name: "Rohit Kohli",
    role: "Deputy CISO",
    subtitle: "“The first agency where creative and media were planned together.”",
    poster: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
    videoSrc: "/videos/hero-reel.mp4",
  },
  {
    id: "bridgewater",
    company: "BRIDGEWATER",
    name: "Igor Tsyganskiy",
    role: "President & CTO",
    subtitle: "“We went from wrangling requests to a production system that runs itself.”",
    poster: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80",
    videoSrc: "/videos/hero-reel.mp4",
  },
  {
    id: "fox",
    company: "FOX",
    name: "Melody Hild",
    role: "CISO & SVP",
    subtitle: "“The conversion lift alone paid for the entire engagement in 60 days.”",
    poster: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&auto=format&fit=crop&q=80",
    videoSrc: "/videos/hero-reel.mp4",
  },
];

export default function SocialProof() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeMuted, setActiveMuted] = useState<Record<string, boolean>>({
    pros: true,
    northbound: true,
    solace: true,
    genpact: true,
    bridgewater: true,
    fox: true,
  });
  const [playingId, setPlayingId] = useState<string | null>(null);

  function scrollByCard(direction: 1 | -1) {
    if (trackRef.current) {
      const cardWidth = 320;
      trackRef.current.scrollBy({ left: direction * (cardWidth + 20), behavior: "smooth" });
    }
  }

  function toggleMute(e: React.MouseEvent, id: string) {
    e.stopPropagation();
    setActiveMuted((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <section className="py-24 md:py-32 border-b border-edge bg-surface relative overflow-hidden" id="clients">
      {/* Client Logos Marquee */}
      <div className="mb-20">
        <Marquee items={clientLogos} />
      </div>

      <Container>
        {/* Section Header: Matching Screenshot */}
        <div className="text-center max-w-3xl mx-auto mb-14 px-4">
          <Eyebrow index="05">Client Stories</Eyebrow>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tightest text-balance mt-3">
            Trusted by security teams all over the world
          </h2>
        </div>
      </Container>

      {/* Interactive Video Cards Carousel */}
      <div className="relative w-full">
        {/* Left Floating Arrow Button */}
        <button
          type="button"
          aria-label="Previous client video"
          onClick={() => scrollByCard(-1)}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-ink/85 text-paper border border-lineOnInk/90 flex items-center justify-center hover:bg-signal hover:text-ink hover:border-signal transition-all shadow-[0_8px_30px_rgba(0,0,0,0.8)] backdrop-blur-md group"
        >
          <span className="material-symbols-outlined text-[22px] transition-transform group-hover:-translate-x-0.5">
            arrow_back
          </span>
        </button>

        {/* Right Floating Arrow Button */}
        <button
          type="button"
          aria-label="Next client video"
          onClick={() => scrollByCard(1)}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-ink/85 text-paper border border-lineOnInk/90 flex items-center justify-center hover:bg-signal hover:text-ink hover:border-signal transition-all shadow-[0_8px_30px_rgba(0,0,0,0.8)] backdrop-blur-md group"
        >
          <span className="material-symbols-outlined text-[22px] transition-transform group-hover:translate-x-0.5">
            arrow_forward
          </span>
        </button>

        {/* Carousel Scroll Track */}
        <div
          ref={trackRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth px-6 sm:px-12 lg:px-20 pb-6 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {clientVideos.map((video) => {
            const isMuted = activeMuted[video.id] ?? true;
            const isHoveredOrPlaying = playingId === video.id;

            return (
              <div
                key={video.id}
                onMouseEnter={() => setPlayingId(video.id)}
                onMouseLeave={() => setPlayingId(null)}
                className="group relative shrink-0 snap-center w-[270px] sm:w-[295px] h-[480px] sm:h-[510px] rounded-[24px] sm:rounded-[28px] overflow-hidden bg-ink border border-neutral-800 shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-signal/50 hover:shadow-[0_25px_60px_rgba(0,0,0,0.7)] cursor-pointer select-none"
              >
                {/* Background Image / Video Clip */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={video.poster}
                  alt={video.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Looping video on hover if active */}
                {video.videoSrc && isHoveredOrPlaying && (
                  <video
                    src={video.videoSrc}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-300"
                  />
                )}

                {/* Atmospheric cinematic vignette & dark gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/25 to-ink/75 z-10 pointer-events-none" />

                {/* ──────────────────────────────────────────────────────────
                    TOP BAR: Client Logo & Sound Toggle
                   ────────────────────────────────────────────────────────── */}
                <div className="absolute top-0 inset-x-0 p-5 z-20 flex items-center justify-between">
                  {/* Company Logo / Name */}
                  <span className="font-display font-black text-lg sm:text-xl tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] uppercase">
                    {video.company}
                  </span>

                  {/* Sound / Mute Toggle Button */}
                  <button
                    type="button"
                    onClick={(e) => toggleMute(e, video.id)}
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                    className="w-9 h-9 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all hover:bg-signal hover:text-ink hover:border-signal"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {isMuted ? "volume_off" : "volume_up"}
                    </span>
                  </button>
                </div>

                {/* ──────────────────────────────────────────────────────────
                    CENTER: Dynamic Speech Subtitles
                   ────────────────────────────────────────────────────────── */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-5 z-20 pointer-events-none flex flex-col items-center">
                  <p className="font-display font-semibold text-base sm:text-[17px] leading-snug text-white/95 text-center drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)] max-w-[240px]">
                    {video.subtitle}
                  </p>

                  {/* Subtle Audio Waveform Indicator on Hover */}
                  <div className="flex items-center gap-1 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="w-1 h-3 rounded-full bg-signal animate-pulse" />
                    <span className="w-1 h-5 rounded-full bg-signal animate-pulse delay-75" />
                    <span className="w-1 h-2 rounded-full bg-signal animate-pulse delay-150" />
                    <span className="w-1 h-6 rounded-full bg-signal animate-pulse delay-100" />
                    <span className="w-1 h-3 rounded-full bg-signal animate-pulse delay-200" />
                  </div>
                </div>

                {/* ──────────────────────────────────────────────────────────
                    BOTTOM BAR: Speaker Name, Role, & Action Arrow
                   ────────────────────────────────────────────────────────── */}
                <div className="absolute bottom-0 inset-x-0 p-5 z-20 flex items-end justify-between gap-3">
                  <div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-tight leading-snug drop-shadow-md">
                      {video.name}
                    </h3>
                    <p className="font-mono text-xs font-semibold text-signal uppercase tracking-wider mt-0.5 drop-shadow">
                      {video.role}
                    </p>
                  </div>

                  {/* Circular White Action Button */}
                  <div className="shrink-0 w-9 h-9 rounded-full bg-white text-ink flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:bg-signal">
                    <span className="material-symbols-outlined text-[18px]">
                      arrow_forward
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
