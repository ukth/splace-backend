/*
  Warnings:

  - A unique constraint covering the columns `[lastMessageId]` on the table `Chatroom` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lastMessageId` to the `Chatroom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chatroom" ADD COLUMN     "lastMessageId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Chatroom_lastMessageId_unique" ON "Chatroom"("lastMessageId");

-- AddForeignKey
ALTER TABLE "Chatroom" ADD FOREIGN KEY ("lastMessageId") REFERENCES "Message"("id") ON DELETE CASCADE ON UPDATE CASCADE;
