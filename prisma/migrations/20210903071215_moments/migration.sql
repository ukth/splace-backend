/*
  Warnings:

  - The primary key for the `Chatroom` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `chatroomId` on the `Chatroom` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_chatroomId_fkey";

-- DropForeignKey
ALTER TABLE "_ChatroomToUser" DROP CONSTRAINT "_ChatroomToUser_A_fkey";

-- AlterTable
ALTER TABLE "Chatroom" DROP CONSTRAINT "Chatroom_pkey",
DROP COLUMN "chatroomId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Moment" (
    "id" SERIAL NOT NULL,
    "text" TEXT,
    "authorId" INTEGER NOT NULL,
    "videoUrl" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "address" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_hiddenMomentRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_hiddenMomentRelation_AB_unique" ON "_hiddenMomentRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_hiddenMomentRelation_B_index" ON "_hiddenMomentRelation"("B");

-- AddForeignKey
ALTER TABLE "Message" ADD FOREIGN KEY ("chatroomId") REFERENCES "Chatroom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Moment" ADD FOREIGN KEY ("authorId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatroomToUser" ADD FOREIGN KEY ("A") REFERENCES "Chatroom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_hiddenMomentRelation" ADD FOREIGN KEY ("A") REFERENCES "Moment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_hiddenMomentRelation" ADD FOREIGN KEY ("B") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
