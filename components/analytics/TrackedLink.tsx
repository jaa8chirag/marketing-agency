"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackEvent } from "@/lib/analytics";

// Drop-in replacement for next/link that also fires a tracked click event —
// lets Server Component pages (industry/capability listing cards, etc.)
// track an "explore" click without becoming client components themselves.
export default function TrackedLink({
  event,
  params,
  onClick,
  ...props
}: ComponentProps<typeof Link> & { event: string; params?: Record<string, unknown> }) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        trackEvent(event, params);
        onClick?.(e);
      }}
    />
  );
}
