-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'PAID', 'COMPLETED', 'CANCELED');

-- CreateTable
CREATE TABLE "MpesaTransaction" (
    "id" SERIAL NOT NULL,
    "merchantRequestID" TEXT NOT NULL,
    "checkoutRequestID" TEXT NOT NULL,
    "transactionID" TEXT NOT NULL,
    "transactionTime" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "transactionAmount" DOUBLE PRECISION NOT NULL,
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "MpesaTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransactionEscrow" (
    "id" SERIAL NOT NULL,
    "transactionNumber" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "invoiceId" INTEGER NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL DEFAULT 'MPESA',
    "paymentId" INTEGER,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "TransactionEscrow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TransactionEscrow_transactionNumber_key" ON "TransactionEscrow"("transactionNumber");

-- AddForeignKey
ALTER TABLE "TransactionEscrow" ADD CONSTRAINT "TransactionEscrow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionEscrow" ADD CONSTRAINT "TransactionEscrow_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionEscrow" ADD CONSTRAINT "TransactionEscrow_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "MpesaTransaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
