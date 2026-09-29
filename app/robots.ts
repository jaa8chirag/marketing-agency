import type { MetadataRoute } from "next";

const BASE_URL = "https://cordinitmedia.com";

export default function robots(): MetadataRoute.Robots {
  // Same reasoning as the robots metadata in app/layout.tsx: don't let
  // preview deployments get crawled. VERCEL_ENV is unset in local dev too,
  // so this also disallows crawling on localhost — correct, nothing to
  // index there either.
  if (process.env.VERCEL_ENV !== "production") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
