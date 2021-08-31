-- CreateTable
CREATE TABLE "paymentLog" (
    "paymentLogId" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "merchantId" VARCHAR(255) NOT NULL,
    "amout" INTEGER NOT NULL,
    "creditGiven" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("paymentLogId")
);

-- CreateIndex
CREATE UNIQUE INDEX "paymentLog.merchantId_unique" ON "paymentLog"("merchantId");
