/*
  Warnings:

  - Changed the type of `open` on the `TimeSet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `close` on the `TimeSet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "TimeSet" DROP COLUMN "open",
ADD COLUMN     "open" TIME NOT NULL,
DROP COLUMN "close",
ADD COLUMN     "close" TIME NOT NULL;
