-- AlterTable
ALTER TABLE "Lead" ADD COLUMN "calBookingUid" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Lead_calBookingUid_key" ON "Lead"("calBookingUid");
