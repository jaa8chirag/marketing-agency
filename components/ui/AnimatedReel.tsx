"use client";

import { useEffect, useState } from "react";

// The Cordinit Media showreel — real brand video, looping, with a light
// HUD overlay (timecode, scrub bar, live indicator) for a broadcast feel.
export default function AnimatedReel({ className = "" }: { className?: string }) {
  const [timecode, setTimecode] = useState("00:00:00");

  useEffect(() => {
    let frame = 0;
    const id = setInterval(() => {
      frame += 3;
      const totalSeconds = Math.floor(frame / 30);
      const mins = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
      const secs = String(totalSeconds % 60).padStart(2, "0");
      const frames = String(frame % 30).padStart(2, "0");
      setTimecode(`00:${mins}:${secs}:${frames}`);
    }, 100);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={`absolute inset-0 bg-ink overflow-hidden ${className}`}>
      <video
        src="/videos/hero-reel.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-grain opacity-20 mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/35 pointer-events-none" />

      <div className="absolute top-6 left-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-paper/80">
        <span className="w-2 h-2 rounded-full bg-signal animate-ticker-blink" />
        Live Reel
      </div>
      <div className="absolute top-6 right-6 font-mono text-[10px] uppercase tracking-wider text-paper/60">
        {timecode}
      </div>

      <div className="absolute bottom-6 left-6 right-6">
        <div className="h-[2px] w-full bg-paper/20 overflow-hidden rounded-full">
          <div className="h-full w-full bg-signal animate-reel-scrub origin-left" />
        </div>
      </div>
    </div>
  );
}
