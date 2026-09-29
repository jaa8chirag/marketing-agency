"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

/** Cal.com's embed types this loosely (`booking: unknown`) since the exact
 * shape isn't part of their stable public API — narrowed defensively at
 * runtime below rather than trusted blindly. */
type CalBookingSuccessDetail = {
  data?: {
    date?: string;
    booking?: unknown;
  };
};

function extractBookingUid(booking: unknown): string | undefined {
  if (booking && typeof booking === "object" && "uid" in booking) {
    const uid = (booking as { uid?: unknown }).uid;
    return typeof uid === "string" ? uid : undefined;
  }
  return undefined;
}

export default function CalEmbed({
  name,
  email,
  notes,
  onBooked,
}: {
  name: string;
  email: string;
  notes?: string;
  onBooked: (booking: { uid: string; startTime?: string }) => void;
}) {
  const calLink = process.env.NEXT_PUBLIC_CAL_LINK;

  useEffect(() => {
    (async () => {
      const cal = await getCalApi();
      // Matches the site's brutalist dark/signal-green brand instead of Cal.com's default theme.
      cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#26D62E" } },
        hideEventTypeDetails: false,
      });
      cal("on", {
        action: "bookingSuccessful",
        callback: (event: CustomEvent<CalBookingSuccessDetail>) => {
          const detail = event.detail?.data;
          const uid = extractBookingUid(detail?.booking);
          if (uid) onBooked({ uid, startTime: detail?.date });
        },
      });
    })();
  }, [onBooked]);

  if (!calLink) {
    return (
      <div className="border border-edge p-8 text-center">
        <p className="text-fgMuted text-sm">
          Scheduling isn&apos;t configured yet — set <code>NEXT_PUBLIC_CAL_LINK</code> to a Cal.com event link.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[600px]">
      <Cal
        calLink={calLink}
        config={{ name, email, notes: notes ?? "" }}
        style={{ width: "100%", height: "100%", minHeight: "600px" }}
      />
    </div>
  );
}
