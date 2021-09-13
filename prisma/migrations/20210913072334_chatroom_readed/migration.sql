-- CreateTable
CREATE TABLE "ChatroomReaded" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "chatroomId" INTEGER,
    "readedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChatroomReaded" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatroomReaded" ADD FOREIGN KEY ("chatroomId") REFERENCES "Chatroom"("id") ON DELETE SET NULL ON UPDATE CASCADE;
