/*
  Warnings:

  - The primary key for the `Hashtag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[name]` on the table `Badge` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Hashtag` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Ratingtag` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_HashtagToPhotolog` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_HashtagToSplace` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `A` on the `_HashtagToPhotolog` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `A` on the `_HashtagToSplace` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_HashtagToPhotolog" DROP CONSTRAINT "_HashtagToPhotolog_A_fkey";

-- DropForeignKey
ALTER TABLE "_HashtagToSplace" DROP CONSTRAINT "_HashtagToSplace_A_fkey";

-- AlterTable
ALTER TABLE "Hashtag" DROP CONSTRAINT "Hashtag_pkey",
ADD COLUMN     "hashtagId" SERIAL NOT NULL,
ADD PRIMARY KEY ("hashtagId");

-- AlterTable
ALTER TABLE "_HashtagToPhotolog" DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "_HashtagToSplace" DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Badge.name_unique" ON "Badge"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Hashtag.name_unique" ON "Hashtag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Ratingtag.name_unique" ON "Ratingtag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_HashtagToPhotolog_AB_unique" ON "_HashtagToPhotolog"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_HashtagToSplace_AB_unique" ON "_HashtagToSplace"("A", "B");

-- AddForeignKey
ALTER TABLE "_HashtagToPhotolog" ADD FOREIGN KEY ("A") REFERENCES "Hashtag"("hashtagId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HashtagToSplace" ADD FOREIGN KEY ("A") REFERENCES "Hashtag"("hashtagId") ON DELETE CASCADE ON UPDATE CASCADE;
