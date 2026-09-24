"use client";

import { useState, type ReactNode } from "react";
import BorderBeam from "./BorderBeam";

// Hover-state wrapper around BorderBeam. Enter/leave are low-frequency
// events (unlike mousemove), so plain useState is fine here — no need
// for the ref-based pattern used by the per-pixel cursor effects.
export default function BorderBeamHover({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <BorderBeam active={hovered} cutoutClassName="bg-surface" />
    </div>
  );
}
