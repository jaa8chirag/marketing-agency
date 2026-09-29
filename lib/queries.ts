// Database-backed replacements for the static lookups that used to live in
// lib/content.ts. Same shapes (Capability, Service, Industry, CaseStudy,
// Insight — types still imported from lib/content.ts, unchanged), same
// function names/signatures, just async and backed by Postgres now. Pages
// import from here; components keep receiving plain props exactly as before.
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
  challenges: string[];
  capabilitySlugs: string[];
}): Industry {
  return {
    slug: row.slug,
    name: row.name,
    eyebrow: row.eyebrow,
    summary: row.summary,
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
  return rows.map((t) => ({ quote: t.quote, person: t.person, role: t.role ?? undefined, company: t.company }));
}

export async function getClientLogos(): Promise<string[]> {
  const rows = await prisma.clientLogo.findMany({ where: { approved: true }, orderBy: { sortOrder: "asc" } });
  return rows.map((r) => r.name);
}

export type NavCapability = {
  slug: string;
  name: string;
  num: string;
  services: { slug: string; name: string }[];
};

export async function getNavCapabilities(): Promise<NavCapability[]> {
  const caps = await getCapabilities();
  return caps.map((c) => ({
    slug: c.slug,
    name: c.name,
    num: c.num,
    services: c.services.map((s) => ({ slug: s.slug, name: s.name })),
  }));
}

export async function getAreasOfInterest(): Promise<string[]> {
  const caps = await getCapabilities();
  return caps.map((c) => c.name).concat("Something else");
}
