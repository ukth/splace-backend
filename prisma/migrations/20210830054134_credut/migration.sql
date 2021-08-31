/*
  Warnings:

  - You are about to drop the column `merchantId` on the `PaymentLog` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[merchantUId]` on the table `PaymentLog` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `merchantUId` to the `PaymentLog` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "PaymentLog.merchantId_unique";

-- AlterTable
ALTER TABLE "PaymentLog" DROP COLUMN "merchantId",
ADD COLUMN     "merchantUId" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "credit" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "PaymentLog.merchantUId_unique" ON "PaymentLog"("merchantUId");
