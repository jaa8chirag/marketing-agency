import Script from "next/script";

// Only renders when NEXT_PUBLIC_GA_MEASUREMENT_ID is set — local dev and any
// environment without a real GA4 property configured stays script-free.
// trackEvent() (lib/analytics.ts) still safely no-ops without this loaded,
// since it just pushes onto window.dataLayer either way.
export default function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!measurementId) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}
