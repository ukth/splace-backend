/*
  Warnings:

  - You are about to drop the column `folderId` on the `Scrap` table. All the data in the column will be lost.
  - Added the required column `title` to the `Photolog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `masterId` to the `Scrap` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Scrap" DROP CONSTRAINT "Scrap_folderId_fkey";

-- AlterTable
CREATE SEQUENCE "item_itemid_seq";
ALTER TABLE "Item" ALTER COLUMN "itemId" SET DEFAULT nextval('item_itemid_seq');
ALTER SEQUENCE "item_itemid_seq" OWNED BY "Item"."itemId";

-- AlterTable
ALTER TABLE "Photolog" ADD COLUMN     "title" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "Scrap" DROP COLUMN "folderId",
ADD COLUMN     "masterId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Comment" (
    "commentId" SERIAL NOT NULL,
    "authorId" INTEGER NOT NULL,
    "photologId" INTEGER NOT NULL,

    PRIMARY KEY ("commentId")
);

-- AddForeignKey
ALTER TABLE "Scrap" ADD FOREIGN KEY ("masterId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("authorId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("photologId") REFERENCES "Photolog"("photologId") ON DELETE CASCADE ON UPDATE CASCADE;
