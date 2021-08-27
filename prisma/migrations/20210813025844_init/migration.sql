-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "profileMessage" VARCHAR(255),
    "profileImageUrl" VARCHAR(255),
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Photolog" (
    "photologId" SERIAL NOT NULL,
    "imageUrls" VARCHAR(255)[],
    "photoSize" INTEGER NOT NULL,
    "text" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" INTEGER NOT NULL,
    "splaceId" INTEGER,
    "seriesId" INTEGER,

    PRIMARY KEY ("photologId")
);

-- CreateTable
CREATE TABLE "Series" (
    "seriesId" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" INTEGER NOT NULL,

    PRIMARY KEY ("seriesId")
);

-- CreateTable
CREATE TABLE "Splace" (
    "splaceId" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "geolog" DECIMAL(10,8),
    "geolat" DECIMAL(10,8),
    "address" VARCHAR(255),
    "operatingTimes" VARCHAR(255)[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("splaceId")
);

-- CreateTable
CREATE TABLE "FixedContent" (
    "fixedContentId" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "imageUrl" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "splaceId" INTEGER NOT NULL,

    PRIMARY KEY ("fixedContentId")
);

-- CreateTable
CREATE TABLE "RatingTag" (
    "ratingTagId" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("ratingTagId")
);

-- CreateTable
CREATE TABLE "Badge" (
    "badgeId" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("badgeId")
);

-- CreateTable
CREATE TABLE "Save" (
    "saveId" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "splaceId" INTEGER NOT NULL,
    "folderId" INTEGER NOT NULL,

    PRIMARY KEY ("saveId")
);

-- CreateTable
CREATE TABLE "Scrap" (
    "saveId" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "photologId" INTEGER NOT NULL,
    "folderId" INTEGER NOT NULL,

    PRIMARY KEY ("saveId")
);

-- CreateTable
CREATE TABLE "Folder" (
    "folderId" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("folderId")
);

-- CreateTable
CREATE TABLE "Hashtag" (
    "name" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Item" (
    "itemId" INTEGER NOT NULL,
    "splaceId" INTEGER NOT NULL,

    PRIMARY KEY ("itemId")
);

-- CreateTable
CREATE TABLE "_followRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FolderToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_likedRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_HashtagToPhotolog" (
    "A" VARCHAR(255) NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_BadgeToSplace" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RatingTagToSplace" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_HashtagToSplace" (
    "A" VARCHAR(255) NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_followRelation_AB_unique" ON "_followRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_followRelation_B_index" ON "_followRelation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FolderToUser_AB_unique" ON "_FolderToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_FolderToUser_B_index" ON "_FolderToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_likedRelation_AB_unique" ON "_likedRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_likedRelation_B_index" ON "_likedRelation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_HashtagToPhotolog_AB_unique" ON "_HashtagToPhotolog"("A", "B");

-- CreateIndex
CREATE INDEX "_HashtagToPhotolog_B_index" ON "_HashtagToPhotolog"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BadgeToSplace_AB_unique" ON "_BadgeToSplace"("A", "B");

-- CreateIndex
CREATE INDEX "_BadgeToSplace_B_index" ON "_BadgeToSplace"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RatingTagToSplace_AB_unique" ON "_RatingTagToSplace"("A", "B");

-- CreateIndex
CREATE INDEX "_RatingTagToSplace_B_index" ON "_RatingTagToSplace"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_HashtagToSplace_AB_unique" ON "_HashtagToSplace"("A", "B");

-- CreateIndex
CREATE INDEX "_HashtagToSplace_B_index" ON "_HashtagToSplace"("B");

-- AddForeignKey
ALTER TABLE "Photolog" ADD FOREIGN KEY ("authorId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photolog" ADD FOREIGN KEY ("splaceId") REFERENCES "Splace"("splaceId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photolog" ADD FOREIGN KEY ("seriesId") REFERENCES "Series"("seriesId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Series" ADD FOREIGN KEY ("authorId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FixedContent" ADD FOREIGN KEY ("splaceId") REFERENCES "Splace"("splaceId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Save" ADD FOREIGN KEY ("splaceId") REFERENCES "Splace"("splaceId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Save" ADD FOREIGN KEY ("folderId") REFERENCES "Folder"("folderId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scrap" ADD FOREIGN KEY ("photologId") REFERENCES "Photolog"("photologId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scrap" ADD FOREIGN KEY ("folderId") REFERENCES "Folder"("folderId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD FOREIGN KEY ("splaceId") REFERENCES "Splace"("splaceId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_followRelation" ADD FOREIGN KEY ("A") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_followRelation" ADD FOREIGN KEY ("B") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FolderToUser" ADD FOREIGN KEY ("A") REFERENCES "Folder"("folderId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FolderToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likedRelation" ADD FOREIGN KEY ("A") REFERENCES "Photolog"("photologId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likedRelation" ADD FOREIGN KEY ("B") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HashtagToPhotolog" ADD FOREIGN KEY ("A") REFERENCES "Hashtag"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HashtagToPhotolog" ADD FOREIGN KEY ("B") REFERENCES "Photolog"("photologId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BadgeToSplace" ADD FOREIGN KEY ("A") REFERENCES "Badge"("badgeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BadgeToSplace" ADD FOREIGN KEY ("B") REFERENCES "Splace"("splaceId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RatingTagToSplace" ADD FOREIGN KEY ("A") REFERENCES "RatingTag"("ratingTagId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RatingTagToSplace" ADD FOREIGN KEY ("B") REFERENCES "Splace"("splaceId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HashtagToSplace" ADD FOREIGN KEY ("A") REFERENCES "Hashtag"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HashtagToSplace" ADD FOREIGN KEY ("B") REFERENCES "Splace"("splaceId") ON DELETE CASCADE ON UPDATE CASCADE;
