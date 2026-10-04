import type { Metadata } from "next";

/** Builds page metadata from an entity, honouring its admin-set SEO overrides. */
export function entityMetadata(
  entity: { seoTitle?: string; seoDescription?: string; ogImageUrl?: string },
  fallback: { title: string; description: string; path: string },
): Metadata {
  const title = entity.seoTitle || fallback.title;
  const description = entity.seoDescription || fallback.description;
  return {
    title,
    description,
    alternates: { canonical: fallback.path },
    openGraph: {
      title,
      description,
      url: fallback.path,
      ...(entity.ogImageUrl ? { images: [{ url: entity.ogImageUrl }] } : {}),
    },
    twitter: entity.ogImageUrl ? { card: "summary_large_image", title, description, images: [entity.ogImageUrl] } : undefined,
  };
}
