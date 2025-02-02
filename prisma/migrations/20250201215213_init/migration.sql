/*
  Warnings:

  - Added the required column `tür` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "tür" TEXT NOT NULL;
