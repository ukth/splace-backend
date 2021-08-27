/*
  Warnings:

  - The primary key for the `Scrap` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `saveId` on the `Scrap` table. All the data in the column will be lost.
  - You are about to drop the `RatingTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RatingTagToSplace` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_RatingTagToSplace" DROP CONSTRAINT "_RatingTagToSplace_A_fkey";

-- DropForeignKey
ALTER TABLE "_RatingTagToSplace" DROP CONSTRAINT "_RatingTagToSplace_B_fkey";

-- AlterTable
ALTER TABLE "Scrap" DROP CONSTRAINT "Scrap_pkey",
DROP COLUMN "saveId",
ADD COLUMN     "scrapId" SERIAL NOT NULL,
ADD PRIMARY KEY ("scrapId");

-- DropTable
DROP TABLE "RatingTag";

-- DropTable
DROP TABLE "_RatingTagToSplace";

-- CreateTable
CREATE TABLE "Ratingtag" (
    "ratingtagId" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("ratingtagId")
);

-- CreateTable
CREATE TABLE "_RatingtagToSplace" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RatingtagToSplace_AB_unique" ON "_RatingtagToSplace"("A", "B");

-- CreateIndex
CREATE INDEX "_RatingtagToSplace_B_index" ON "_RatingtagToSplace"("B");

-- AddForeignKey
ALTER TABLE "_RatingtagToSplace" ADD FOREIGN KEY ("A") REFERENCES "Ratingtag"("ratingtagId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RatingtagToSplace" ADD FOREIGN KEY ("B") REFERENCES "Splace"("splaceId") ON DELETE CASCADE ON UPDATE CASCADE;
