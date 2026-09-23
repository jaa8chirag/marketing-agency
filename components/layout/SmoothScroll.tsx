"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Real smooth-scroll (not the CSS scroll-behavior hack, which fights
// GSAP ScrollTrigger's scrub calculations and causes stutter). Lenis
// intercepts wheel/touch input and eases the actual page scroll, then
// keeps ScrollTrigger in sync on every frame via gsap's own ticker so
// the hero's scroll-driven animation and normal page scroll feel the
// same buttery speed.
export default function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    function update(time: number) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return null;
}
