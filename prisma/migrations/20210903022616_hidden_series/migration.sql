/*
  Warnings:

  - You are about to drop the `_hiddenRelation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_hiddenRelation" DROP CONSTRAINT "_hiddenRelation_A_fkey";

-- DropForeignKey
ALTER TABLE "_hiddenRelation" DROP CONSTRAINT "_hiddenRelation_B_fkey";

-- DropTable
DROP TABLE "_hiddenRelation";

-- CreateTable
CREATE TABLE "_hiddenLogsRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_hiddenSeriesRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_hiddenLogsRelation_AB_unique" ON "_hiddenLogsRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_hiddenLogsRelation_B_index" ON "_hiddenLogsRelation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_hiddenSeriesRelation_AB_unique" ON "_hiddenSeriesRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_hiddenSeriesRelation_B_index" ON "_hiddenSeriesRelation"("B");

-- AddForeignKey
ALTER TABLE "_hiddenLogsRelation" ADD FOREIGN KEY ("A") REFERENCES "Photolog"("photologId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_hiddenLogsRelation" ADD FOREIGN KEY ("B") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_hiddenSeriesRelation" ADD FOREIGN KEY ("A") REFERENCES "Series"("seriesId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_hiddenSeriesRelation" ADD FOREIGN KEY ("B") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
