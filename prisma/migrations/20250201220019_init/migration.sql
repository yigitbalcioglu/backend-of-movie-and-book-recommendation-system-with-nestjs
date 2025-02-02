/*
  Warnings:

  - You are about to drop the column `name` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `publish_date` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `yonetmen` on the `Movie` table. All the data in the column will be lost.
  - Added the required column `film` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vizyon` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "name",
DROP COLUMN "publish_date",
DROP COLUMN "yonetmen",
ADD COLUMN     "film" TEXT NOT NULL,
ADD COLUMN     "vizyon" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "yönetmen" TEXT;
