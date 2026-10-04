import type { MetadataRoute } from "next";
import { getCapabilities, getIndustries, getCaseStudies, getInsights } from "@/lib/queries";

const BASE_URL = "https://cordinitmedia.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [capabilities, industries, caseStudies, insights] = await Promise.all([
    getCapabilities(),
    getIndustries(),
    getCaseStudies(),
    getInsights(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/capabilities`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/industries`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/solutions`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/work`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/insights`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/ecosystem`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/careers`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE_URL}/legal/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/legal/terms-of-service`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const capabilityRoutes: MetadataRoute.Sitemap = capabilities.flatMap((cap) => [
    { url: `${BASE_URL}/capabilities/${cap.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    ...cap.services.map((service) => ({
      url: `${BASE_URL}/capabilities/${cap.slug}/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]);

  const industryRoutes: MetadataRoute.Sitemap = industries.map((ind) => ({
    url: `${BASE_URL}/industries/${ind.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const workRoutes: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${BASE_URL}/work/${cs.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const insightRoutes: MetadataRoute.Sitemap = insights.map((insight) => ({
    url: `${BASE_URL}/insights/${insight.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = [
    ...["article", "guide", "report", "perspective", "video", "whitepaper"],
    ...capabilities.map((c) => c.slug),
    ...industries.map((i) => i.slug),
  ].map((category) => ({
    url: `${BASE_URL}/insights/category/${category}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.4,
  }));

  return [...staticRoutes, ...categoryRoutes, ...capabilityRoutes, ...industryRoutes, ...workRoutes, ...insightRoutes];
}
