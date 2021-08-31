/*
  Warnings:

  - You are about to drop the column `amout` on the `PaymentLog` table. All the data in the column will be lost.
  - Added the required column `amount` to the `PaymentLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PaymentLog" DROP COLUMN "amout",
ADD COLUMN     "amount" INTEGER NOT NULL;
