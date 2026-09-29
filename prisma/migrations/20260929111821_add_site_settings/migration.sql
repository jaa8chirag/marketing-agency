-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "primaryNavLinks" TEXT[],
    "footerNavLinks" TEXT[],
    "primaryCtaLabel" TEXT NOT NULL,
    "primaryCtaHref" TEXT NOT NULL,
    "announcementText" TEXT,
    "announcementHref" TEXT,
    "socialLinkedin" TEXT,
    "socialInstagram" TEXT,
    "socialYoutube" TEXT,
    "socialX" TEXT,
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "copyrightLine1" TEXT,
    "copyrightLine2" TEXT,
    "gaMeasurementId" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);
