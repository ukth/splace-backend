/*
  Warnings:

  - You are about to drop the `paymentLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "paymentLog";

-- CreateTable
CREATE TABLE "PaymentLog" (
    "paymentLogId" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "merchantId" VARCHAR(255) NOT NULL,
    "amout" INTEGER NOT NULL,
    "creditGiven" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("paymentLogId")
);

-- CreateIndex
CREATE UNIQUE INDEX "PaymentLog.merchantId_unique" ON "PaymentLog"("merchantId");
