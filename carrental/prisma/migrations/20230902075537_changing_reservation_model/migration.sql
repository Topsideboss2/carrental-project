/*
  Warnings:

  - You are about to drop the column `isPickup` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `returnDate` on the `Reservation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "isPickup",
DROP COLUMN "returnDate",
ADD COLUMN     "pickUpLatitude" TEXT,
ADD COLUMN     "pickUpLocation" TEXT,
ADD COLUMN     "pickUpLongitude" TEXT;
