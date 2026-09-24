"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

// Kept to single words (capability names shortened, matching how the rest
// of the site already shortens them) so the fixed-width box below never
// needs to accommodate a wildly longer phrase.
const words = ["Media", "Production", "Creative", "Digital", "Influencer", "Performance", "Automation", "Growth"];

const SCRAMBLE_CHARS = "!<>-_\\/[]{}=+*^?#0123456789";

// Logo word — cycles through what Cordinit Media does via a character
// scramble (random glyphs resolving into the real word), not a slide, so
// there's no vertical bounce and the header never changes width.
export default function CyclingWord({ className = "" }: { className?: string }) {
  const [display, setDisplay] = useState(words[0]);
  const wordIndex = useRef(0);
  const scrambleTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    function scrambleTo(target: string) {
      let iteration = 0;
      const maxIterations = target.length * 3;
      if (scrambleTimer.current) clearInterval(scrambleTimer.current);
      scrambleTimer.current = setInterval(() => {
        setDisplay(
          target
            .split("")
            .map((char, i) => (i < iteration / 3 ? char : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]))
            .join("")
        );
        iteration++;
        if (iteration > maxIterations) {
          if (scrambleTimer.current) clearInterval(scrambleTimer.current);
          setDisplay(target);
        }
      }, 28);
    }

    const cycle = setInterval(() => {
      wordIndex.current = (wordIndex.current + 1) % words.length;
      scrambleTo(words[wordIndex.current]);
    }, 2200);

    return () => {
      clearInterval(cycle);
      if (scrambleTimer.current) clearInterval(scrambleTimer.current);
    };
  }, [prefersReduced]);

  return (
    <span className={`inline-block w-[108px] shrink-0 overflow-hidden whitespace-nowrap text-left align-bottom ${className}`}>
      {display}
    </span>
  );
}
