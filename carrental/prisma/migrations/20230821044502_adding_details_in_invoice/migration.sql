/*
  Warnings:

  - Added the required column `amount` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PAID', 'UNPAID');

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "status" "PaymentStatus" NOT NULL DEFAULT 'UNPAID';
