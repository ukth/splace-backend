/*
  Warnings:

  - You are about to drop the column `amount` on the `PaymentLog` table. All the data in the column will be lost.
  - Added the required column `credit` to the `PaymentLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PaymentLog" DROP COLUMN "amount",
ADD COLUMN     "credit" INTEGER NOT NULL,
ALTER COLUMN "creditGiven" SET DEFAULT true;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lockedCredit" INTEGER NOT NULL DEFAULT 0;
