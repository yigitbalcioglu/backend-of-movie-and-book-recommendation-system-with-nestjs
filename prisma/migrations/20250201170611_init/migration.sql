/*
  Warnings:

  - Added the required column `ISBN` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `book_img` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `book_type` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `explanation` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publication_year` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publisher` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "ISBN" TEXT NOT NULL,
ADD COLUMN     "book_img" TEXT NOT NULL,
ADD COLUMN     "book_type" TEXT NOT NULL,
ADD COLUMN     "embedding" DOUBLE PRECISION[],
ADD COLUMN     "explanation" TEXT NOT NULL,
ADD COLUMN     "publication_year" INTEGER NOT NULL,
ADD COLUMN     "publisher" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ozet" TEXT NOT NULL,
    "oyuncular" TEXT[],
    "yonetmen" TEXT NOT NULL,
    "publish_date" TIMESTAMP(3) NOT NULL,
    "sure" INTEGER NOT NULL,
    "embedding" DOUBLE PRECISION[],

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);
