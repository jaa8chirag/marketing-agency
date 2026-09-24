"use client";

import { useEffect, useState } from "react";

// True only on desktop with a real mouse — used to gate cursor-follow,
// tilt and magnetic effects off on touch/mobile per the fx spec.
export function useFinePointer() {
  const [isFine, setIsFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 768px)");
    setIsFine(mq.matches);
    function handler(e: MediaQueryListEvent) {
      setIsFine(e.matches);
    }
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isFine;
}
