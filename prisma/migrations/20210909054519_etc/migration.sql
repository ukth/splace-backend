/*
  Warnings:

  - You are about to drop the `_hiddenMomentRelation` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[splaceId]` on the table `Item` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `intro` to the `Splace` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Splace` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Splace` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_hiddenMomentRelation" DROP CONSTRAINT "_hiddenMomentRelation_A_fkey";

-- DropForeignKey
ALTER TABLE "_hiddenMomentRelation" DROP CONSTRAINT "_hiddenMomentRelation_B_fkey";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "imageUrls" VARCHAR(255)[],
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Photolog" ADD COLUMN     "isPrivate" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Series" ADD COLUMN     "isPrivate" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Splace" ADD COLUMN     "intro" TEXT NOT NULL,
ADD COLUMN     "phone" VARCHAR(255) NOT NULL,
ADD COLUMN     "url" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phone" VARCHAR(255) NOT NULL,
ADD COLUMN     "url" VARCHAR(255);

-- DropTable
DROP TABLE "_hiddenMomentRelation";

-- CreateTable
CREATE TABLE "Specialtag" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "color" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PhotologToSpecialtag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_SpecialtagToSplace" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Specialtag.name_unique" ON "Specialtag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_PhotologToSpecialtag_AB_unique" ON "_PhotologToSpecialtag"("A", "B");

-- CreateIndex
CREATE INDEX "_PhotologToSpecialtag_B_index" ON "_PhotologToSpecialtag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SpecialtagToSplace_AB_unique" ON "_SpecialtagToSplace"("A", "B");

-- CreateIndex
CREATE INDEX "_SpecialtagToSplace_B_index" ON "_SpecialtagToSplace"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Item_splaceId_unique" ON "Item"("splaceId");

-- AddForeignKey
ALTER TABLE "_PhotologToSpecialtag" ADD FOREIGN KEY ("A") REFERENCES "Photolog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PhotologToSpecialtag" ADD FOREIGN KEY ("B") REFERENCES "Specialtag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecialtagToSplace" ADD FOREIGN KEY ("A") REFERENCES "Specialtag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpecialtagToSplace" ADD FOREIGN KEY ("B") REFERENCES "Splace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
