import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Next.js dev-mode hot reload re-executes this module on every edit, which
// would open a fresh pool each time without this global-singleton guard.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Falls back to Vercel's native Postgres integration's own env var names
// (POSTGRES_PRISMA_URL is the pooled one it auto-injects) so connecting the
// Storage tab's Postgres database works with zero manual env var setup —
// see prisma7.config.ts for the matching fallback used by the CLI/migrations.
const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL;

// Fail fast with a clear message instead of letting the pg driver throw a
// cryptic connection error deep in a request — this only fires at cold
// start (module load), not per-request.
if (!connectionString) {
  throw new Error(
    "No database connection string found. Set DATABASE_URL (local/docker-compose) or ensure Vercel's " +
      "Postgres integration is connected (POSTGRES_PRISMA_URL/POSTGRES_URL)."
  );
}

const adapter = new PrismaPg({ connectionString });

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
