// Database-backed replacements for the static lookups that used to live in
// lib/content.ts. Same shapes (Capability, Service, Industry, CaseStudy,
// Insight — types still imported from lib/content.ts, unchanged), same
// function names/signatures, just async and backed by Postgres now. Pages
// import from here; components keep receiving plain props exactly as before.
import { cache } from "react";
import { prisma } from "@/lib/db";
import type { Capability, Service, Industry, CaseStudy, Insight } from "@/lib/content";

function mapService(row: {
  slug: string;
  name: string;
  hook: string;
  definition: string;
  forWhen: string[];
  deliverables: string[];
  outcomes: string[];
  approachSteps: { title: string; description: string }[];
}): Service {
  return {
    slug: row.slug,
    name: row.name,
    hook: row.hook,
    definition: row.definition,
    forWhen: row.forWhen,
    approach: row.approachSteps.map((s) => ({ title: s.title, description: s.description })),
    deliverables: row.deliverables,
    outcomes: row.outcomes,
  };
}

function mapCapability(row: {
  num: string;
  slug: string;
  name: string;
  shortName: string;
  clientNeed: string;
  tagline: string;
  summary: string;
  heroDescription: string;
  imageUrl: string | null;
  overview: string[];
  problems: string[];
  deliverables: string[];
  industrySlugs: string[];
  services: Parameters<typeof mapService>[0][];
}): Capability {
  return {
    num: row.num,
    slug: row.slug,
    name: row.name,
    shortName: row.shortName,
    clientNeed: row.clientNeed,
    tagline: row.tagline,
    summary: row.summary,
    heroDescription: row.heroDescription,
    imageUrl: row.imageUrl ?? undefined,
    overview: row.overview,
    problems: row.problems,
    deliverables: row.deliverables,
    industries: row.industrySlugs,
    services: row.services.map(mapService),
  };
}

function mapIndustry(row: {
  slug: string;
  name: string;
  eyebrow: string;
  summary: string;
  imageUrl: string | null;
  challenges: string[];
  capabilitySlugs: string[];
}): Industry {
  return {
    slug: row.slug,
    name: row.name,
    eyebrow: row.eyebrow,
    summary: row.summary,
    imageUrl: row.imageUrl ?? undefined,
    challenges: row.challenges,
    capabilities: row.capabilitySlugs,
  };
}

function mapCaseStudy(row: {
  slug: string;
  client: string;
  title: string;
  year: string;
  summary: string;
  imageUrl: string | null;
  challenge: string;
  objective: string;
  strategy: string;
  creative: string;
  execution: string;
  technology: string;
  media: string;
  industry: { slug: string };
  results: { metric: string; label: string }[];
  capabilities: { capability: { slug: string } }[];
}): CaseStudy {
  return {
    slug: row.slug,
    client: row.client,
    title: row.title,
    year: row.year,
    summary: row.summary,
    imageUrl: row.imageUrl ?? undefined,
    capabilities: row.capabilities.map((c) => c.capability.slug),
    industry: row.industry.slug,
    challenge: row.challenge,
    objective: row.objective,
    strategy: row.strategy,
    creative: row.creative,
    execution: row.execution,
    technology: row.technology,
    media: row.media,
    results: row.results.map((r) => ({ metric: r.metric, label: r.label })),
  };
}

function mapInsight(row: {
  slug: string;
  title: string;
  type: Insight["type"];
  summary: string;
  body: string[];
  author: string;
  date: string;
  readingTime: string;
  industrySlug: string | null;
  capability: { slug: string } | null;
}): Insight {
  return {
    slug: row.slug,
    title: row.title,
    type: row.type,
    summary: row.summary,
    body: row.body,
    capability: row.capability?.slug,
    industry: row.industrySlug ?? undefined,
    author: row.author,
    date: row.date,
    readingTime: row.readingTime,
  };
}

const serviceInclude = { approachSteps: { orderBy: { sortOrder: "asc" as const } } };
const capabilityInclude = { services: { include: serviceInclude, orderBy: { sortOrder: "asc" as const } } };
const caseStudyInclude = {
  industry: { select: { slug: true } },
  results: { orderBy: { sortOrder: "asc" as const } },
  capabilities: { include: { capability: { select: { slug: true } } } },
};
const insightInclude = { capability: { select: { slug: true } } };

export async function getCapabilities(): Promise<Capability[]> {
  const rows = await prisma.capability.findMany({
    include: capabilityInclude,
    orderBy: { sortOrder: "asc" },
  });
  return rows.map(mapCapability);
}

export async function getCapability(slug: string): Promise<Capability | undefined> {
  const row = await prisma.capability.findUnique({ where: { slug }, include: capabilityInclude });
  return row ? mapCapability(row) : undefined;
}

export async function getService(
  capabilitySlug: string,
  serviceSlug: string
): Promise<{ capability: Capability; service: Service } | undefined> {
  const capability = await getCapability(capabilitySlug);
  const service = capability?.services.find((s) => s.slug === serviceSlug);
  return capability && service ? { capability, service } : undefined;
}

export async function getIndustries(): Promise<Industry[]> {
  const rows = await prisma.industry.findMany({ orderBy: { sortOrder: "asc" } });
  return rows.map(mapIndustry);
}

export async function getIndustry(slug: string): Promise<Industry | undefined> {
  const row = await prisma.industry.findUnique({ where: { slug } });
  return row ? mapIndustry(row) : undefined;
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const rows = await prisma.caseStudy.findMany({ include: caseStudyInclude, orderBy: { sortOrder: "asc" } });
  return rows.map(mapCaseStudy);
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | undefined> {
  const row = await prisma.caseStudy.findUnique({ where: { slug }, include: caseStudyInclude });
  return row ? mapCaseStudy(row) : undefined;
}

export async function getInsights(): Promise<Insight[]> {
  const rows = await prisma.insight.findMany({ include: insightInclude, orderBy: { sortOrder: "asc" } });
  return rows.map(mapInsight);
}

export async function getInsight(slug: string): Promise<Insight | undefined> {
  const row = await prisma.insight.findUnique({ where: { slug }, include: insightInclude });
  return row ? mapInsight(row) : undefined;
}

export async function relatedCaseStudies(opts: {
  capability?: string;
  industry?: string;
  exclude?: string;
}): Promise<CaseStudy[]> {
  const all = await getCaseStudies();
  return all
    .filter((c) => c.slug !== opts.exclude)
    .filter(
      (c) =>
        (opts.capability ? c.capabilities.includes(opts.capability) : true) ||
        (opts.industry ? c.industry === opts.industry : false)
    )
    .slice(0, 3);
}

export async function relatedInsights(opts: {
  capability?: string;
  industry?: string;
  exclude?: string;
}): Promise<Insight[]> {
  const all = await getInsights();
  return all
    .filter((i) => i.slug !== opts.exclude)
    .filter(
      (i) =>
        (opts.capability ? i.capability === opts.capability : true) ||
        (opts.industry ? i.industry === opts.industry : false)
    )
    .slice(0, 3);
}

export async function getTestimonials() {
  const rows = await prisma.testimonial.findMany({ orderBy: { sortOrder: "asc" } });
  return rows.map((t) => ({
    quote: t.quote,
    person: t.person,
    role: t.role ?? undefined,
    company: t.company,
    photoUrl: t.photoUrl ?? undefined,
  }));
}

export type TeamMember = {
  name: string;
  role: string;
  bio: string | null;
  photoUrl: string | null;
  linkedinUrl: string | null;
};

export async function getTeamMembers(): Promise<TeamMember[]> {
  const rows = await prisma.teamMember.findMany({ orderBy: { sortOrder: "asc" } });
  return rows.map((m) => ({
    name: m.name,
    role: m.role,
    bio: m.bio,
    photoUrl: m.photoUrl,
    linkedinUrl: m.linkedinUrl,
  }));
}

export type CtaBlock = {
  eyebrow: string;
  title: string;
  description: string | null;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string | null;
  secondaryHref: string | null;
};

// Returns null (not a default object) when a key has no row — callers decide
// their own fallback, since CTASection's hardcoded defaults already vary by
// call site and shouldn't be duplicated/overridden here.
export async function getCtaBlock(key: string): Promise<CtaBlock | null> {
  const row = await prisma.ctaBlock.findUnique({ where: { key } });
  if (!row) return null;
  return {
    eyebrow: row.eyebrow,
    title: row.title,
    description: row.description,
    primaryLabel: row.primaryLabel,
    primaryHref: row.primaryHref,
    secondaryLabel: row.secondaryLabel,
    secondaryHref: row.secondaryHref,
  };
}

export type ClientLogoItem = { name: string; logoUrl?: string };

export async function getClientLogos(): Promise<ClientLogoItem[]> {
  const rows = await prisma.clientLogo.findMany({ where: { approved: true }, orderBy: { sortOrder: "asc" } });
  return rows.map((r) => ({ name: r.name, logoUrl: r.logoUrl ?? undefined }));
}

export type NavCapability = {
  slug: string;
  name: string;
  num: string;
  imageUrl?: string;
  services: { slug: string; name: string }[];
};

export async function getNavCapabilities(): Promise<NavCapability[]> {
  const caps = await getCapabilities();
  return caps.map((c) => ({
    slug: c.slug,
    name: c.name,
    num: c.num,
    imageUrl: c.imageUrl,
    services: c.services.map((s) => ({ slug: s.slug, name: s.name })),
  }));
}

export async function getAreasOfInterest(): Promise<string[]> {
  const caps = await getCapabilities();
  return caps.map((c) => c.name).concat("Something else");
}

// ── Site Settings ────────────────────────────────────────────────────────
// Header/Footer read nav/social/copy from here instead of hardcoding it, so
// an admin can edit Settings in /admin without a code change.

export type NavLink = { label: string; href: string };

export type SiteSettings = {
  primaryNavLinks: NavLink[];
  footerNavLinks: NavLink[];
  primaryCtaLabel: string;
  primaryCtaHref: string;
  announcementText: string | null;
  announcementHref: string | null;
  socialLinkedin: string | null;
  socialInstagram: string | null;
  socialYoutube: string | null;
  socialX: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  copyrightLine1: string | null;
  copyrightLine2: string | null;
  gaMeasurementId: string | null;
};

// Used if the singleton row is somehow missing (e.g. seed hasn't run against
// this database yet) — matches what used to be hardcoded in the components.
const DEFAULT_SITE_SETTINGS: SiteSettings = {
  primaryNavLinks: [
    { label: "Industries", href: "/industries" },
    { label: "Work", href: "/work" },
    { label: "Insights", href: "/insights" },
    { label: "About", href: "/about" },
  ],
  footerNavLinks: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Case Studies", href: "/work" },
    { label: "Blog", href: "/insights" },
    { label: "Privacy", href: "/legal/privacy-policy" },
  ],
  primaryCtaLabel: "Book a Call",
  primaryCtaHref: "/contact?intent=book-a-call",
  announcementText: "Now booking Q1 2027 — Book a Call",
  announcementHref: "/contact?intent=book-a-call",
  socialLinkedin: "https://linkedin.com",
  socialInstagram: "https://instagram.com",
  socialYoutube: "https://youtube.com",
  socialX: "https://x.com",
  contactEmail: null,
  contactPhone: null,
  copyrightLine1: "Proudly created in India.",
  copyrightLine2: "All Right Reserved, All Wrong Reversed.",
  gaMeasurementId: null,
};

// Rows are stored as "Label | /href" per line (see admin form) — same
// convention as other array fields in this project, no repeating-group UI.
function parseNavLinks(lines: string[]): NavLink[] {
  return lines
    .map((line): NavLink | null => {
      const [label, href] = line.split("|").map((s) => s.trim());
      return label && href ? { label, href } : null;
    })
    .filter((link): link is NavLink => link !== null);
}

// Wrapped in React's cache() because a single page render calls this from
// three independent places (root layout, Header, Footer) — without request
// memoization that's 3x the Postgres queries per page, which is what tipped
// local Docker Postgres over its connection limit during `next build`'s
// parallel static generation.
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const row = await prisma.siteSettings.findUnique({ where: { id: "singleton" } });
  if (!row) return DEFAULT_SITE_SETTINGS;

  return {
    primaryNavLinks: parseNavLinks(row.primaryNavLinks),
    footerNavLinks: parseNavLinks(row.footerNavLinks),
    primaryCtaLabel: row.primaryCtaLabel,
    primaryCtaHref: row.primaryCtaHref,
    announcementText: row.announcementText,
    announcementHref: row.announcementHref,
    socialLinkedin: row.socialLinkedin,
    socialInstagram: row.socialInstagram,
    socialYoutube: row.socialYoutube,
    socialX: row.socialX,
    contactEmail: row.contactEmail,
    contactPhone: row.contactPhone,
    copyrightLine1: row.copyrightLine1,
    copyrightLine2: row.copyrightLine2,
    gaMeasurementId: row.gaMeasurementId,
  };
});
