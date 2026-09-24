"use client";

import { motion } from "motion/react";

// A rotating gradient sweep clipped down to a thin ring around the card's
// own border-radius — the only animated property is `transform: rotate`,
// so it stays inside the "transform/opacity/filter/clip-path only" rule.
export default function BorderBeam({
  active,
  thickness = 2,
  cutoutClassName = "bg-surface",
}: {
  active: boolean;
  thickness?: number;
  cutoutClassName?: string;
}) {
  return (
    <div className="absolute inset-0 rounded-[inherit] overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, #26D62E 6%, #2BEE34 10%, transparent 22%, transparent 100%)",
        }}
        animate={active ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 3.2, repeat: active ? Infinity : 0, ease: "linear" }}
      />
      <div
        className={`absolute rounded-[inherit] ${cutoutClassName}`}
        style={{ inset: thickness }}
      />
    </div>
  );
}
