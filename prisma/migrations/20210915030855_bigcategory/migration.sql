/*
  Warnings:

  - You are about to drop the `Hashtag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_HashtagToPhotolog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_HashtagToSplace` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_HashtagToPhotolog" DROP CONSTRAINT "_HashtagToPhotolog_A_fkey";

-- DropForeignKey
ALTER TABLE "_HashtagToPhotolog" DROP CONSTRAINT "_HashtagToPhotolog_B_fkey";

-- DropForeignKey
ALTER TABLE "_HashtagToSplace" DROP CONSTRAINT "_HashtagToSplace_A_fkey";

-- DropForeignKey
ALTER TABLE "_HashtagToSplace" DROP CONSTRAINT "_HashtagToSplace_B_fkey";

-- DropTable
DROP TABLE "Hashtag";

-- DropTable
DROP TABLE "_HashtagToPhotolog";

-- DropTable
DROP TABLE "_HashtagToSplace";

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BigCategory" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToPhotolog" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_BigCategoryToPhotolog" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryToSplace" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_BigCategoryToSplace" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Category.name_unique" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BigCategory.name_unique" ON "BigCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToPhotolog_AB_unique" ON "_CategoryToPhotolog"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToPhotolog_B_index" ON "_CategoryToPhotolog"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BigCategoryToPhotolog_AB_unique" ON "_BigCategoryToPhotolog"("A", "B");

-- CreateIndex
CREATE INDEX "_BigCategoryToPhotolog_B_index" ON "_BigCategoryToPhotolog"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToSplace_AB_unique" ON "_CategoryToSplace"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToSplace_B_index" ON "_CategoryToSplace"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BigCategoryToSplace_AB_unique" ON "_BigCategoryToSplace"("A", "B");

-- CreateIndex
CREATE INDEX "_BigCategoryToSplace_B_index" ON "_BigCategoryToSplace"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToPhotolog" ADD FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToPhotolog" ADD FOREIGN KEY ("B") REFERENCES "Photolog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BigCategoryToPhotolog" ADD FOREIGN KEY ("A") REFERENCES "BigCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BigCategoryToPhotolog" ADD FOREIGN KEY ("B") REFERENCES "Photolog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToSplace" ADD FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToSplace" ADD FOREIGN KEY ("B") REFERENCES "Splace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BigCategoryToSplace" ADD FOREIGN KEY ("A") REFERENCES "BigCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BigCategoryToSplace" ADD FOREIGN KEY ("B") REFERENCES "Splace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
