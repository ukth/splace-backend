/*
  Warnings:

  - The primary key for the `Badge` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `badgeId` on the `Badge` table. All the data in the column will be lost.
  - The primary key for the `BuyLog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `buyLogId` on the `BuyLog` table. All the data in the column will be lost.
  - The primary key for the `Comment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `commentId` on the `Comment` table. All the data in the column will be lost.
  - The primary key for the `FixedContent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `fixedContentId` on the `FixedContent` table. All the data in the column will be lost.
  - The primary key for the `Folder` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `folderId` on the `Folder` table. All the data in the column will be lost.
  - The primary key for the `Hashtag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `hashtagId` on the `Hashtag` table. All the data in the column will be lost.
  - The primary key for the `Item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `itemId` on the `Item` table. All the data in the column will be lost.
  - The primary key for the `PaymentLog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `paymentLogId` on the `PaymentLog` table. All the data in the column will be lost.
  - The primary key for the `Photolog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `photologId` on the `Photolog` table. All the data in the column will be lost.
  - The primary key for the `Ratingtag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ratingtagId` on the `Ratingtag` table. All the data in the column will be lost.
  - The primary key for the `Save` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `saveId` on the `Save` table. All the data in the column will be lost.
  - The primary key for the `Scrap` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `scrapId` on the `Scrap` table. All the data in the column will be lost.
  - The primary key for the `Series` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `seriesId` on the `Series` table. All the data in the column will be lost.
  - The primary key for the `Splace` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `splaceId` on the `Splace` table. All the data in the column will be lost.
  - The primary key for the `TimeSet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `timeSetId` on the `TimeSet` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_photologId_fkey";

-- DropForeignKey
ALTER TABLE "FixedContent" DROP CONSTRAINT "FixedContent_splaceId_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_splaceId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Moment" DROP CONSTRAINT "Moment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Photolog" DROP CONSTRAINT "Photolog_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Photolog" DROP CONSTRAINT "Photolog_splaceId_fkey";

-- DropForeignKey
ALTER TABLE "Save" DROP CONSTRAINT "Save_folderId_fkey";

-- DropForeignKey
ALTER TABLE "Save" DROP CONSTRAINT "Save_splaceId_fkey";

-- DropForeignKey
ALTER TABLE "Scrap" DROP CONSTRAINT "Scrap_photologId_fkey";

-- DropForeignKey
ALTER TABLE "Scrap" DROP CONSTRAINT "Scrap_savedUserId_fkey";

-- DropForeignKey
ALTER TABLE "Series" DROP CONSTRAINT "Series_authorId_fkey";

-- DropForeignKey
ALTER TABLE "TimeSet" DROP CONSTRAINT "TimeSet_splaceId_fkey";

-- DropForeignKey
ALTER TABLE "_BadgeToSplace" DROP CONSTRAINT "_BadgeToSplace_A_fkey";

-- DropForeignKey
ALTER TABLE "_BadgeToSplace" DROP CONSTRAINT "_BadgeToSplace_B_fkey";

-- DropForeignKey
ALTER TABLE "_ChatroomToUser" DROP CONSTRAINT "_ChatroomToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_HashtagToPhotolog" DROP CONSTRAINT "_HashtagToPhotolog_A_fkey";

-- DropForeignKey
ALTER TABLE "_HashtagToPhotolog" DROP CONSTRAINT "_HashtagToPhotolog_B_fkey";

-- DropForeignKey
ALTER TABLE "_HashtagToSplace" DROP CONSTRAINT "_HashtagToSplace_A_fkey";

-- DropForeignKey
ALTER TABLE "_HashtagToSplace" DROP CONSTRAINT "_HashtagToSplace_B_fkey";

-- DropForeignKey
ALTER TABLE "_RatingtagToSplace" DROP CONSTRAINT "_RatingtagToSplace_A_fkey";

-- DropForeignKey
ALTER TABLE "_RatingtagToSplace" DROP CONSTRAINT "_RatingtagToSplace_B_fkey";

-- DropForeignKey
ALTER TABLE "_blockRelation" DROP CONSTRAINT "_blockRelation_A_fkey";

-- DropForeignKey
ALTER TABLE "_blockRelation" DROP CONSTRAINT "_blockRelation_B_fkey";

-- DropForeignKey
ALTER TABLE "_folderRelation" DROP CONSTRAINT "_folderRelation_A_fkey";

-- DropForeignKey
ALTER TABLE "_folderRelation" DROP CONSTRAINT "_folderRelation_B_fkey";

-- DropForeignKey
ALTER TABLE "_followRelation" DROP CONSTRAINT "_followRelation_A_fkey";

-- DropForeignKey
ALTER TABLE "_followRelation" DROP CONSTRAINT "_followRelation_B_fkey";

-- DropForeignKey
ALTER TABLE "_hiddenLogsRelation" DROP CONSTRAINT "_hiddenLogsRelation_A_fkey";

-- DropForeignKey
ALTER TABLE "_hiddenLogsRelation" DROP CONSTRAINT "_hiddenLogsRelation_B_fkey";

-- DropForeignKey
ALTER TABLE "_hiddenMomentRelation" DROP CONSTRAINT "_hiddenMomentRelation_B_fkey";

-- DropForeignKey
ALTER TABLE "_hiddenSeriesRelation" DROP CONSTRAINT "_hiddenSeriesRelation_A_fkey";

-- DropForeignKey
ALTER TABLE "_hiddenSeriesRelation" DROP CONSTRAINT "_hiddenSeriesRelation_B_fkey";

-- DropForeignKey
ALTER TABLE "_likedCommentRelation" DROP CONSTRAINT "_likedCommentRelation_A_fkey";

-- DropForeignKey
ALTER TABLE "_likedCommentRelation" DROP CONSTRAINT "_likedCommentRelation_B_fkey";

-- DropForeignKey
ALTER TABLE "_likedRelation" DROP CONSTRAINT "_likedRelation_A_fkey";

-- DropForeignKey
ALTER TABLE "_likedRelation" DROP CONSTRAINT "_likedRelation_B_fkey";

-- DropForeignKey
ALTER TABLE "_seriesRelation" DROP CONSTRAINT "_seriesRelation_A_fkey";

-- DropForeignKey
ALTER TABLE "_seriesRelation" DROP CONSTRAINT "_seriesRelation_B_fkey";

-- AlterTable
ALTER TABLE "Badge" DROP CONSTRAINT "Badge_pkey",
DROP COLUMN "badgeId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "BuyLog" DROP CONSTRAINT "BuyLog_pkey",
DROP COLUMN "buyLogId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_pkey",
DROP COLUMN "commentId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "FixedContent" DROP CONSTRAINT "FixedContent_pkey",
DROP COLUMN "fixedContentId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_pkey",
DROP COLUMN "folderId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Hashtag" DROP CONSTRAINT "Hashtag_pkey",
DROP COLUMN "hashtagId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Item" DROP CONSTRAINT "Item_pkey",
DROP COLUMN "itemId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "PaymentLog" DROP CONSTRAINT "PaymentLog_pkey",
DROP COLUMN "paymentLogId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Photolog" DROP CONSTRAINT "Photolog_pkey",
DROP COLUMN "photologId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Ratingtag" DROP CONSTRAINT "Ratingtag_pkey",
DROP COLUMN "ratingtagId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Save" DROP CONSTRAINT "Save_pkey",
DROP COLUMN "saveId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Scrap" DROP CONSTRAINT "Scrap_pkey",
DROP COLUMN "scrapId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Series" DROP CONSTRAINT "Series_pkey",
DROP COLUMN "seriesId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Splace" DROP CONSTRAINT "Splace_pkey",
DROP COLUMN "splaceId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TimeSet" DROP CONSTRAINT "TimeSet_pkey",
DROP COLUMN "timeSetId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "userId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Photolog" ADD FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photolog" ADD FOREIGN KEY ("splaceId") REFERENCES "Splace"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Series" ADD FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeSet" ADD FOREIGN KEY ("splaceId") REFERENCES "Splace"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FixedContent" ADD FOREIGN KEY ("splaceId") REFERENCES "Splace"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Save" ADD FOREIGN KEY ("splaceId") REFERENCES "Splace"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Save" ADD FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scrap" ADD FOREIGN KEY ("photologId") REFERENCES "Photolog"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scrap" ADD FOREIGN KEY ("savedUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD FOREIGN KEY ("splaceId") REFERENCES "Splace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("photologId") REFERENCES "Photolog"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Moment" ADD FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_followRelation" ADD FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_followRelation" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_folderRelation" ADD FOREIGN KEY ("A") REFERENCES "Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_folderRelation" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likedRelation" ADD FOREIGN KEY ("A") REFERENCES "Photolog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likedRelation" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likedCommentRelation" ADD FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likedCommentRelation" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatroomToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_hiddenLogsRelation" ADD FOREIGN KEY ("A") REFERENCES "Photolog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_hiddenLogsRelation" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_hiddenSeriesRelation" ADD FOREIGN KEY ("A") REFERENCES "Series"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_hiddenSeriesRelation" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_hiddenMomentRelation" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_blockRelation" ADD FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_blockRelation" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_seriesRelation" ADD FOREIGN KEY ("A") REFERENCES "Photolog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_seriesRelation" ADD FOREIGN KEY ("B") REFERENCES "Series"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HashtagToPhotolog" ADD FOREIGN KEY ("A") REFERENCES "Hashtag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HashtagToPhotolog" ADD FOREIGN KEY ("B") REFERENCES "Photolog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BadgeToSplace" ADD FOREIGN KEY ("A") REFERENCES "Badge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BadgeToSplace" ADD FOREIGN KEY ("B") REFERENCES "Splace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RatingtagToSplace" ADD FOREIGN KEY ("A") REFERENCES "Ratingtag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RatingtagToSplace" ADD FOREIGN KEY ("B") REFERENCES "Splace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HashtagToSplace" ADD FOREIGN KEY ("A") REFERENCES "Hashtag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HashtagToSplace" ADD FOREIGN KEY ("B") REFERENCES "Splace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
