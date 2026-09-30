"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

// Fires `insight_read` once the reader actually scrolls this marker into
// view (dropped at the end of the article body) — distinct from
// `insight_view`, which fires the moment the page loads regardless of
// whether anyone reads past the first paragraph.
export default function ReadTracker({ event, params = {} }: { event: string; params?: Record<string, unknown> }) {
  const ref = useRef<HTMLDivElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true;
          trackEvent(event, params);
          observer.disconnect();
        }
      },
      { threshold: 0 }
    );
    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  return <div ref={ref} aria-hidden="true" className="h-px w-full" />;
}
