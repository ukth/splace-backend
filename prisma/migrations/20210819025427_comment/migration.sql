/*
  Warnings:

  - Added the required column `text` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "text" VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE "_likedCommentRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_likedCommentRelation_AB_unique" ON "_likedCommentRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_likedCommentRelation_B_index" ON "_likedCommentRelation"("B");

-- AddForeignKey
ALTER TABLE "_likedCommentRelation" ADD FOREIGN KEY ("A") REFERENCES "Comment"("commentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likedCommentRelation" ADD FOREIGN KEY ("B") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
