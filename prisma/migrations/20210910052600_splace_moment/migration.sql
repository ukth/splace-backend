/*
  Warnings:

  - You are about to drop the column `address` on the `Moment` table. All the data in the column will be lost.
  - You are about to drop the column `geolat` on the `Photolog` table. All the data in the column will be lost.
  - You are about to drop the column `geolog` on the `Photolog` table. All the data in the column will be lost.
  - You are about to drop the column `currentLat` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `currentLog` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Badge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BadgeToSplace` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BadgeToSplace" DROP CONSTRAINT "_BadgeToSplace_A_fkey";

-- DropForeignKey
ALTER TABLE "_BadgeToSplace" DROP CONSTRAINT "_BadgeToSplace_B_fkey";

-- AlterTable
ALTER TABLE "Moment" DROP COLUMN "address",
ADD COLUMN     "splaceId" INTEGER;

-- AlterTable
ALTER TABLE "Photolog" DROP COLUMN "geolat",
DROP COLUMN "geolog";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "currentLat",
DROP COLUMN "currentLog";

-- DropTable
DROP TABLE "Badge";

-- DropTable
DROP TABLE "_BadgeToSplace";

-- AddForeignKey
ALTER TABLE "Moment" ADD FOREIGN KEY ("splaceId") REFERENCES "Splace"("id") ON DELETE SET NULL ON UPDATE CASCADE;
