-- DropForeignKey
ALTER TABLE "Chatroom" DROP CONSTRAINT "Chatroom_lastMessageId_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_splaceId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_chatroomId_fkey";

-- DropForeignKey
ALTER TABLE "Moment" DROP CONSTRAINT "Moment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Photolog" DROP CONSTRAINT "Photolog_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Series" DROP CONSTRAINT "Series_authorId_fkey";

-- AlterTable
ALTER TABLE "Splace" ADD COLUMN     "thumbnail" TEXT;

-- AddForeignKey
ALTER TABLE "Photolog" ADD CONSTRAINT "Photolog_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Series" ADD CONSTRAINT "Series_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_splaceId_fkey" FOREIGN KEY ("splaceId") REFERENCES "Splace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chatroom" ADD CONSTRAINT "Chatroom_lastMessageId_fkey" FOREIGN KEY ("lastMessageId") REFERENCES "Message"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatroomId_fkey" FOREIGN KEY ("chatroomId") REFERENCES "Chatroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Moment" ADD CONSTRAINT "Moment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "BigCategory.name_unique" RENAME TO "BigCategory_name_key";

-- RenameIndex
ALTER INDEX "Category.name_unique" RENAME TO "Category_name_key";

-- RenameIndex
ALTER INDEX "PaymentLog.merchantUId_unique" RENAME TO "PaymentLog_merchantUId_key";

-- RenameIndex
ALTER INDEX "Ratingtag.name_unique" RENAME TO "Ratingtag_name_key";

-- RenameIndex
ALTER INDEX "Specialtag.name_unique" RENAME TO "Specialtag_name_key";

-- RenameIndex
ALTER INDEX "User.username_unique" RENAME TO "User_username_key";
