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
        imageUrl: cap.imageUrl,
        overview: cap.overview,
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
        // Deliberately omitted: imageUrl. `cap.imageUrl` is always undefined
        // here (not set in lib/content.ts) — Prisma treats an `undefined`
        // update value as "leave this field alone", so re-running the seed
        // never wipes out an image an admin set manually in /admin/capabilities.
        overview: cap.overview,
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
        imageUrl: ind.imageUrl,
        challenges: ind.challenges,
        capabilitySlugs: ind.capabilities,
        sortOrder: idx,
      },
      update: {
        name: ind.name,
        eyebrow: ind.eyebrow,
        summary: ind.summary,
        imageUrl: ind.imageUrl,
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
        imageUrl: cs.imageUrl,
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
        // Deliberately omitted: imageUrl — see the same note in seedCapabilities above.
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

// Stock portraits (Unsplash, images.unsplash.com is already allowlisted in
// next.config.mjs's remotePatterns + CSP img-src) — placeholder faces for
// placeholder people/companies, same convention as the rest of the seeded
// demo content, swap for real photos once real testimonials exist.
const testimonialPhotos = [
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
];

async function seedTestimonials() {
  await prisma.testimonial.deleteMany();
  await prisma.testimonial.createMany({
    data: testimonials.map((t, idx) => ({
      quote: t.quote,
      person: t.person,
      company: t.company,
      photoUrl: testimonialPhotos[idx % testimonialPhotos.length],
      sortOrder: idx,
    })),
  });
  console.log(`Seeded ${testimonials.length} testimonials.`);
}

const teamMembers = [
  {
    name: "Ananya Kapoor",
    role: "Founding Partner, Strategy & Client Partnerships",
    bio: "Fifteen years split between client-side brand leadership and agency strategy — joined the founders to make sure every engagement starts with a defensible reason, not just a deliverable list.",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
    linkedinUrl: "https://linkedin.com",
  },
  {
    name: "Rohan Mehta",
    role: "Executive Creative Director, Brand & Creative",
    bio: "Has led creative for brands across FMCG, fintech and hospitality. Believes the best campaigns are the ones a competitor wishes they'd made first.",
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80",
    linkedinUrl: "https://linkedin.com",
  },
  {
    name: "Priya Nair",
    role: "Head of Media, Media & Performance",
    bio: "Ex-programmatic trading desk lead. Obsessed with the gap between reported metrics and actual business outcomes — closes it for every account she runs.",
    photoUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=500&auto=format&fit=crop&q=80",
    linkedinUrl: "https://linkedin.com",
  },
  {
    name: "Kabir Singh",
    role: "Head of Technology, Digital Experiences & Automation",
    bio: "Builds the systems that make the rest of the agency's work actually scale — from headless commerce builds to the CRM automations most agencies bolt on as an afterthought.",
    photoUrl: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=500&auto=format&fit=crop&q=80",
    linkedinUrl: "https://linkedin.com",
  },
];

async function seedTeamMembers() {
  await prisma.teamMember.deleteMany();
  await prisma.teamMember.createMany({
    data: teamMembers.map((m, idx) => ({ ...m, sortOrder: idx })),
  });
  console.log(`Seeded ${teamMembers.length} team members.`);
}

async function seedCtaBlocks() {
  // Matches exactly what was previously hardcoded as CTASection's default
  // props — seeding this means nothing visually changes until an admin
  // actually edits it in /admin/cta-blocks.
  await prisma.ctaBlock.upsert({
    where: { key: "default" },
    create: {
      key: "default",
      eyebrow: "Start a Project",
      title: "Have a brief? Let's make something worth talking about.",
      description: "Tell us what you're building and we'll bring the right specialists into the room.",
      primaryLabel: "Book a Call",
      primaryHref: "/contact?intent=book-a-call",
      secondaryLabel: "See the Work",
      secondaryHref: "/work",
    },
    update: {},
  });
  console.log("Seeded CTA blocks.");
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
  await seedTeamMembers();
  await seedCtaBlocks();
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
