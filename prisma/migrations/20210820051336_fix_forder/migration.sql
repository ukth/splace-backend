/*
  Warnings:

  - You are about to drop the `_FolderToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FolderToUser" DROP CONSTRAINT "_FolderToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_FolderToUser" DROP CONSTRAINT "_FolderToUser_B_fkey";

-- DropTable
DROP TABLE "_FolderToUser";

-- CreateTable
CREATE TABLE "_folderRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_folderRelation_AB_unique" ON "_folderRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_folderRelation_B_index" ON "_folderRelation"("B");

-- AddForeignKey
ALTER TABLE "_folderRelation" ADD FOREIGN KEY ("A") REFERENCES "Folder"("folderId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_folderRelation" ADD FOREIGN KEY ("B") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
