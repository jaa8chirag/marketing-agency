// Create-only top-up of the services taxonomy (prisma/services-extra.ts).
// Unlike prisma/seed.ts this never updates existing rows, so it is safe to run
// against a database whose content has been edited in the admin panel.
import "dotenv/config";
import { prisma } from "../lib/db";
import { extraServicesByCapability } from "./services-extra";

async function main() {
  let created = 0;
  for (const [capSlug, services] of Object.entries(extraServicesByCapability)) {
    const cap = await prisma.capability.findUnique({ where: { slug: capSlug }, include: { services: true } });
    if (!cap) { console.warn(`Capability ${capSlug} not found, skipping`); continue; }
    const have = new Set(cap.services.map((s) => s.slug));
    let order = cap.services.length;
    for (const svc of services) {
      if (have.has(svc.slug)) continue;
      await prisma.service.create({
        data: {
          slug: svc.slug, name: svc.name, hook: svc.hook, definition: svc.definition,
          forWhen: svc.forWhen, deliverables: svc.deliverables, outcomes: svc.outcomes,
          sortOrder: order++, capabilityId: cap.id,
          approachSteps: { create: svc.approach.map((a, i) => ({ title: a.title, description: a.description, sortOrder: i })) },
        },
      });
      created++;
    }
  }
  console.log(`Created ${created} services.`);

  // Link demo case studies to services (only where none are set yet): the
  // first two services of each capability the case study already belongs to.
  const studies = await prisma.caseStudy.findMany({
    where: { serviceSlugs: { isEmpty: true } },
    include: { capabilities: { include: { capability: { include: { services: { orderBy: { sortOrder: "asc" }, take: 2 } } } } } },
  });
  for (const cs of studies) {
    const slugs = cs.capabilities.flatMap((c) => c.capability.services.map((s) => `${c.capability.slug}/${s.slug}`));
    if (slugs.length) await prisma.caseStudy.update({ where: { id: cs.id }, data: { serviceSlugs: slugs } });
  }
  console.log(`Linked services on ${studies.length} case studies.`);
}
main().finally(() => prisma.$disconnect());
