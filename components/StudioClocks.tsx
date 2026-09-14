"use client";

import { useEffect, useState } from "react";

export default function StudioClocks() {
  const [times, setTimes] = useState({
    nyc: "--:--",
    ams: "--:--",
    tyo: "--:--",
    ldn: "--:--",
  });

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();

      const formatTime = (timeZone: string) => {
        return new Intl.DateTimeFormat("en-US", {
          timeZone,
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(now);
      };

      setTimes({
        nyc: formatTime("America/New_York"),
        ams: formatTime("Europe/Amsterdam"),
        tyo: formatTime("Asia/Tokyo"),
        ldn: formatTime("Europe/London"),
      });
    };

    updateTimes();
    const interval = setInterval(updateTimes, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden xl:flex items-center gap-2 py-1.5 px-3.5 border border-slate-200 bg-slate-50/80 rounded-full shadow-sm">
      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      <span className="font-mono text-[10px] uppercase text-slate-600 tracking-wider font-medium">
        NYC {times.nyc} • AMS {times.ams} • TYO {times.tyo} • LDN {times.ldn}
      </span>
    </div>
  );
}
