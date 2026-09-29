"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

// Fires a single analytics event on mount. Lets Server Component pages
// (capability/service/case-study/insight detail templates) emit a view
// event without becoming client components themselves — drop this in
// anywhere in the tree, it renders nothing.
export default function TrackView({ event, params = {} }: { event: string; params?: Record<string, unknown> }) {
  useEffect(() => {
    trackEvent(event, params);
    // Only fire once per mount — params are captured at mount time.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  return null;
}
