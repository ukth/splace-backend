-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" DROP NOT NULL;

-- CreateTable
CREATE TABLE "_hiddenRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_blockRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_hiddenRelation_AB_unique" ON "_hiddenRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_hiddenRelation_B_index" ON "_hiddenRelation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_blockRelation_AB_unique" ON "_blockRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_blockRelation_B_index" ON "_blockRelation"("B");

-- AddForeignKey
ALTER TABLE "_hiddenRelation" ADD FOREIGN KEY ("A") REFERENCES "Photolog"("photologId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_hiddenRelation" ADD FOREIGN KEY ("B") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_blockRelation" ADD FOREIGN KEY ("A") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_blockRelation" ADD FOREIGN KEY ("B") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
