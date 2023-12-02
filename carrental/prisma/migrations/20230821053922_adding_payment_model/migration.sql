/*
  Warnings:

  - You are about to drop the column `paymentMethod` on the `TransactionEscrow` table. All the data in the column will be lost.
  - Made the column `paymentId` on table `TransactionEscrow` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "TransactionEscrow" DROP CONSTRAINT "TransactionEscrow_paymentId_fkey";

-- AlterTable
ALTER TABLE "TransactionEscrow" DROP COLUMN "paymentMethod",
ALTER COLUMN "paymentId" SET NOT NULL;

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL DEFAULT 'MPESA',
    "invoiceId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "referenceCode" TEXT,
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionEscrow" ADD CONSTRAINT "TransactionEscrow_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
