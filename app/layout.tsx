import type { Metadata } from "next";
import { Sora, Space_Mono } from "next/font/google";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/layout/SmoothScroll";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import "./globals.css";
import "@/styles/shapes.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cordinitmedia.com"),
  title: {
    default: "Cordinit Media — Creative, Media & Growth Company",
    template: "%s — Cordinit Media",
  },
  description:
    "Cordinit Media connects creative, production, digital, media and performance to help ambitious brands build, launch and grow. Creative + Technology + Performance.",
  keywords: [
    "creative agency",
    "media company",
    "cordinit media",
    "brand strategy",
    "content production",
    "performance marketing",
    "digital experiences",
    "growth agency",
  ],
  authors: [{ name: "Cordinit Media" }],
  openGraph: {
    title: "Cordinit Media — Creative, Media & Growth Company",
    description:
      "Creative + Technology + Performance. Make people care. Make experiences work. Make growth measurable.",
    type: "website",
    siteName: "Cordinit Media",
  },
  // Vercel sets VERCEL_ENV to "production" | "preview" | "development".
  // Preview-deployment URLs are still publicly reachable, and without this
  // they'd otherwise be crawlable/indexable — a duplicate-content and
  // "unfinished work leaked to Google" risk that's easy to miss.
  robots:
    process.env.VERCEL_ENV === "production"
      ? { index: true, follow: true }
      : { index: false, follow: false },
  alternates: { canonical: "/" },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Cordinit Media",
  url: "https://cordinitmedia.com",
  description:
    "Cordinit Media connects creative, production, digital, media and performance to help ambitious brands build, launch and grow.",
  sameAs: ["https://linkedin.com", "https://instagram.com", "https://youtube.com", "https://x.com"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sora.variable} ${spaceMono.variable}`}
    >
      <head>
        <script
          // Runs before paint so the correct theme class is set before
          // React hydrates — prevents a light/dark flash on load.
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('theme')==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="bg-surface font-sans text-fg antialiased selection:bg-signal selection:text-ink transition-colors duration-300" suppressHydrationWarning>
        <GoogleAnalytics />
        <SmoothScroll />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
