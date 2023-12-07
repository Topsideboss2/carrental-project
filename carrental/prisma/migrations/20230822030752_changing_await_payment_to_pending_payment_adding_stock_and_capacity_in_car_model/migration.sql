/*
  Warnings:

  - The values [AWAIT_PAYMENT] on the enum `ReservationStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('VIDEO', 'IMAGE');

-- AlterEnum
BEGIN;
CREATE TYPE "ReservationStatus_new" AS ENUM ('PENDING', 'APPROVED', 'CANCELLED', 'PENDING_PAYMENT', 'PAID', 'DELIVERING', 'COMPLETED', 'REJECTED');
ALTER TABLE "Reservation" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Reservation" ALTER COLUMN "status" TYPE "ReservationStatus_new" USING ("status"::text::"ReservationStatus_new");
ALTER TYPE "ReservationStatus" RENAME TO "ReservationStatus_old";
ALTER TYPE "ReservationStatus_new" RENAME TO "ReservationStatus";
DROP TYPE "ReservationStatus_old";
ALTER TABLE "Reservation" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "capacity" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "isPickup" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "CarMedia" (
    "id" SERIAL NOT NULL,
    "carId" INTEGER NOT NULL,
    "mediaType" "MediaType" NOT NULL DEFAULT 'IMAGE',
    "mediaUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "CarMedia_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CarMedia" ADD CONSTRAINT "CarMedia_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
