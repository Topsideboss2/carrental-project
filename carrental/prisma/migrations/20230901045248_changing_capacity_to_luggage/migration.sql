/*
  Warnings:

  - You are about to drop the column `capacity` on the `Car` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Car" DROP COLUMN "capacity",
ADD COLUMN     "luggage" INTEGER NOT NULL DEFAULT 1;
