/*
  Warnings:

  - You are about to drop the column `seriesId` on the `Photolog` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Photolog" DROP CONSTRAINT "Photolog_seriesId_fkey";

-- AlterTable
ALTER TABLE "Photolog" DROP COLUMN "seriesId";

-- CreateTable
CREATE TABLE "_seriesRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_seriesRelation_AB_unique" ON "_seriesRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_seriesRelation_B_index" ON "_seriesRelation"("B");

-- AddForeignKey
ALTER TABLE "_seriesRelation" ADD FOREIGN KEY ("A") REFERENCES "Photolog"("photologId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_seriesRelation" ADD FOREIGN KEY ("B") REFERENCES "Series"("seriesId") ON DELETE CASCADE ON UPDATE CASCADE;
