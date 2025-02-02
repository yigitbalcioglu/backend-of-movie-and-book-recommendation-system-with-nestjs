/*
  Warnings:

  - The `yonetmen` column on the `Movie` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "yonetmen",
ADD COLUMN     "yonetmen" TEXT[];
