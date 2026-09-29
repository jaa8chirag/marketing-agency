// Baseline CSP — allows what the site actually loads (Google Fonts, GA4's
// gtag.js + its beacon endpoint, seeded photography from Unsplash/Picsum/
// Google) plus 'unsafe-inline' for the few inline <script> tags already in
// the codebase (theme-flash-prevention snippet, GA4 init, JSON-LD blocks).
// This is a pragmatic starting point, not a fully hardened nonce-based CSP
// (that needs per-request nonces threaded through every inline script,
// a bigger change) — tighten script-src further if/when those move to
// external files or get nonces.
const csp = [
  "default-src 'self'",
  // https://app.cal.com: the Cal.com booking embed (components/ui/CalEmbed.tsx)
  // injects its own <script> tag at runtime — without it here the script is
  // silently blocked and the "Pick a date & time" step spins forever.
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://app.cal.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https://images.unsplash.com https://plus.unsplash.com https://picsum.photos https://lh3.googleusercontent.com https://app.cal.com",
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://app.cal.com",
  // The embed script mounts the actual booking calendar in an iframe from
  // this origin — needs an explicit allow, same reason as script-src above.
  "frame-src https://app.cal.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
