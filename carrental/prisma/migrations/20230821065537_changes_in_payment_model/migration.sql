/*
  Warnings:

  - You are about to drop the column `status` on the `MpesaTransaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MpesaTransaction" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "checkoutRequestID" TEXT,
ADD COLUMN     "merchantRequestID" TEXT;
