"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hoveringLink, setHoveringLink] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const supportsFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!supportsFinePointer || prefersReducedMotion) return;
    setEnabled(true);
    document.body.style.cursor = "none";

    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    let targetX = ringX;
    let targetY = ringY;

    function handleMove(e: MouseEvent) {
      targetX = e.clientX;
      targetY = e.clientY;
      setVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
      const el = e.target as HTMLElement | null;
      setHoveringLink(Boolean(el?.closest("a, button, [role='button'], input, textarea, select")));
    }

    function handleLeave() {
      setVisible(false);
    }

    let raf: number;
    function animateRing() {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(animateRing);
    }
    raf = requestAnimationFrame(animateRing);

    window.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(raf);
      document.body.style.cursor = "";
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className={`fixed inset-0 z-[999] pointer-events-none transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-signal"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border transition-[width,height,border-color] duration-200 ease-out mix-blend-difference ${
          hoveringLink ? "w-12 h-12 border-paper" : "w-7 h-7 border-paper/60"
        }`}
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </div>
  );
}
