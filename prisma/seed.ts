// One-time migration of the existing static content (lib/content.ts) into
// Postgres. Safe to re-run: every upsert is keyed on the same unique slug
// the static data already used, so re-running just refreshes rows instead
// of duplicating them.
import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/db";
import {
  capabilities,
  industries,
  caseStudies,
  insights,
  testimonials,
  clientLogos,
} from "../lib/content";

async function seedCapabilities() {
  for (const [capIdx, cap] of capabilities.entries()) {
    const capability = await prisma.capability.upsert({
      where: { slug: cap.slug },
      create: {
        num: cap.num,
        slug: cap.slug,
        name: cap.name,
        shortName: cap.shortName,
        clientNeed: cap.clientNeed,
        tagline: cap.tagline,
        summary: cap.summary,
        heroDescription: cap.heroDescription,
        problems: cap.problems,
        deliverables: cap.deliverables,
        industrySlugs: cap.industries,
        sortOrder: capIdx,
      },
      update: {
        num: cap.num,
        name: cap.name,
        shortName: cap.shortName,
        clientNeed: cap.clientNeed,
        tagline: cap.tagline,
        summary: cap.summary,
        heroDescription: cap.heroDescription,
        problems: cap.problems,
        deliverables: cap.deliverables,
        industrySlugs: cap.industries,
        sortOrder: capIdx,
      },
    });

    for (const [svcIdx, svc] of cap.services.entries()) {
      const service = await prisma.service.upsert({
        where: { capabilityId_slug: { capabilityId: capability.id, slug: svc.slug } },
        create: {
          slug: svc.slug,
          name: svc.name,
          hook: svc.hook,
          definition: svc.definition,
          forWhen: svc.forWhen,
          deliverables: svc.deliverables,
          outcomes: svc.outcomes,
          sortOrder: svcIdx,
          capabilityId: capability.id,
        },
        update: {
          name: svc.name,
          hook: svc.hook,
          definition: svc.definition,
          forWhen: svc.forWhen,
          deliverables: svc.deliverables,
          outcomes: svc.outcomes,
          sortOrder: svcIdx,
        },
      });

      // Simplest safe way to keep approach steps in sync on re-seed: replace.
      await prisma.serviceApproachStep.deleteMany({ where: { serviceId: service.id } });
      await prisma.serviceApproachStep.createMany({
        data: svc.approach.map((step, idx) => ({
          serviceId: service.id,
          title: step.title,
          description: step.description,
          sortOrder: idx,
        })),
      });
    }
  }
  console.log(`Seeded ${capabilities.length} capabilities.`);
}

async function seedIndustries() {
  for (const [idx, ind] of industries.entries()) {
    await prisma.industry.upsert({
      where: { slug: ind.slug },
      create: {
        slug: ind.slug,
        name: ind.name,
        eyebrow: ind.eyebrow,
        summary: ind.summary,
        challenges: ind.challenges,
        capabilitySlugs: ind.capabilities,
        sortOrder: idx,
      },
      update: {
        name: ind.name,
        eyebrow: ind.eyebrow,
        summary: ind.summary,
        challenges: ind.challenges,
        capabilitySlugs: ind.capabilities,
        sortOrder: idx,
      },
    });
  }
  console.log(`Seeded ${industries.length} industries.`);
}

async function seedCaseStudies() {
  for (const [idx, cs] of caseStudies.entries()) {
    const industry = await prisma.industry.findUnique({ where: { slug: cs.industry } });
    if (!industry) {
      console.warn(`Skipping case study "${cs.slug}" — unknown industry slug "${cs.industry}".`);
      continue;
    }

    const caseStudy = await prisma.caseStudy.upsert({
      where: { slug: cs.slug },
      create: {
        slug: cs.slug,
        client: cs.client,
        title: cs.title,
        year: cs.year,
        summary: cs.summary,
        challenge: cs.challenge,
        objective: cs.objective,
        strategy: cs.strategy,
        creative: cs.creative,
        execution: cs.execution,
        technology: cs.technology,
        media: cs.media,
        industryId: industry.id,
        sortOrder: idx,
      },
      update: {
        client: cs.client,
        title: cs.title,
        year: cs.year,
        summary: cs.summary,
        challenge: cs.challenge,
        objective: cs.objective,
        strategy: cs.strategy,
        creative: cs.creative,
        execution: cs.execution,
        technology: cs.technology,
        media: cs.media,
        industryId: industry.id,
        sortOrder: idx,
      },
    });

    await prisma.caseStudyResult.deleteMany({ where: { caseStudyId: caseStudy.id } });
    await prisma.caseStudyResult.createMany({
      data: cs.results.map((r, i) => ({
        caseStudyId: caseStudy.id,
        metric: r.metric,
        label: r.label,
        sortOrder: i,
      })),
    });

    await prisma.caseStudyCapability.deleteMany({ where: { caseStudyId: caseStudy.id } });
    const relatedCaps = await prisma.capability.findMany({ where: { slug: { in: cs.capabilities } } });
    await prisma.caseStudyCapability.createMany({
      data: relatedCaps.map((c) => ({ caseStudyId: caseStudy.id, capabilityId: c.id })),
    });
  }
  console.log(`Seeded ${caseStudies.length} case studies.`);
}

async function seedInsights() {
  for (const [idx, insight] of insights.entries()) {
    let capabilityId: string | undefined;
    if (insight.capability) {
      const cap = await prisma.capability.findUnique({ where: { slug: insight.capability } });
      capabilityId = cap?.id;
    }

    await prisma.insight.upsert({
      where: { slug: insight.slug },
      create: {
        slug: insight.slug,
        title: insight.title,
        type: insight.type,
        summary: insight.summary,
        body: insight.body,
        author: insight.author,
        date: insight.date,
        readingTime: insight.readingTime,
        industrySlug: insight.industry,
        capabilityId,
        sortOrder: idx,
      },
      update: {
        title: insight.title,
        type: insight.type,
        summary: insight.summary,
        body: insight.body,
        author: insight.author,
        date: insight.date,
        readingTime: insight.readingTime,
        industrySlug: insight.industry,
        capabilityId,
        sortOrder: idx,
      },
    });
  }
  console.log(`Seeded ${insights.length} insights.`);
}

async function seedTestimonials() {
  await prisma.testimonial.deleteMany();
  await prisma.testimonial.createMany({
    data: testimonials.map((t, idx) => ({
      quote: t.quote,
      person: t.person,
      company: t.company,
      sortOrder: idx,
    })),
  });
  console.log(`Seeded ${testimonials.length} testimonials.`);
}

async function seedClientLogos() {
  await prisma.clientLogo.deleteMany();
  await prisma.clientLogo.createMany({
    data: clientLogos.map((name, idx) => ({ name, sortOrder: idx })),
  });
  console.log(`Seeded ${clientLogos.length} client logos.`);
}

async function seedAdminUser() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    console.warn("ADMIN_EMAIL / ADMIN_PASSWORD not set — skipping admin user seed.");
    return;
  }
  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.adminUser.upsert({
    where: { email },
    create: { email, passwordHash },
    update: { passwordHash },
  });
  console.log(`Seeded admin user ${email}.`);
}

async function seedSiteSettings() {
  // Matches exactly what was previously hardcoded in HeaderClient.tsx /
  // Footer.tsx — seeding these values means nothing visually changes until
  // an admin actually edits Settings in /admin.
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    create: {
      id: "singleton",
      primaryNavLinks: ["Industries | /industries", "Work | /work", "Insights | /insights", "About | /about"],
      footerNavLinks: [
        "About | /about",
        "Contact | /contact",
        "Case Studies | /work",
        "Blog | /insights",
        "Privacy | /legal/privacy-policy",
      ],
      primaryCtaLabel: "Book a Call",
      primaryCtaHref: "/contact?intent=book-a-call",
      announcementText: "Now booking Q1 2027 — Book a Call",
      announcementHref: "/contact?intent=book-a-call",
      socialLinkedin: "https://linkedin.com",
      socialInstagram: "https://instagram.com",
      socialYoutube: "https://youtube.com",
      socialX: "https://x.com",
      copyrightLine1: "Proudly created in India.",
      copyrightLine2: "All Right Reserved, All Wrong Reversed.",
    },
    update: {},
  });
  console.log("Seeded site settings.");
}

async function main() {
  await seedCapabilities();
  await seedIndustries();
  await seedCaseStudies();
  await seedInsights();
  await seedTestimonials();
  await seedClientLogos();
  await seedAdminUser();
  await seedSiteSettings();
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
