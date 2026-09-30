-- AlterTable
ALTER TABLE "Capability" ADD COLUMN "overview" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
