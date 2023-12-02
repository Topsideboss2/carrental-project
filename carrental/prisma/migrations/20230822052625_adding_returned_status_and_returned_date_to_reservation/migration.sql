-- AlterEnum
ALTER TYPE "ReservationStatus" ADD VALUE 'RETURNED';

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "returnDate" TIMESTAMP(3);
