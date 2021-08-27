/*
  Warnings:

  - You are about to drop the column `masterId` on the `Scrap` table. All the data in the column will be lost.
  - You are about to drop the column `operatingTimes` on the `Splace` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Scrap" DROP CONSTRAINT "Scrap_masterId_fkey";

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "authorId" DROP NOT NULL,
ALTER COLUMN "photologId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "FixedContent" ALTER COLUMN "splaceId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Save" ALTER COLUMN "splaceId" DROP NOT NULL,
ALTER COLUMN "folderId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Scrap" DROP COLUMN "masterId",
ADD COLUMN     "savedUserId" INTEGER,
ALTER COLUMN "photologId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Splace" DROP COLUMN "operatingTimes",
ADD COLUMN     "ownerId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "authority" VARCHAR(255) NOT NULL DEFAULT E'user';

-- CreateTable
CREATE TABLE "TimeSet" (
    "timeSetId" SERIAL NOT NULL,
    "open" INTEGER NOT NULL,
    "close" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "splaceId" INTEGER,

    PRIMARY KEY ("timeSetId")
);

-- AddForeignKey
ALTER TABLE "TimeSet" ADD FOREIGN KEY ("splaceId") REFERENCES "Splace"("splaceId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scrap" ADD FOREIGN KEY ("savedUserId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
