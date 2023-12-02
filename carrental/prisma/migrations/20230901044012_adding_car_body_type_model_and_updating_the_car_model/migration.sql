/*
  Warnings:

  - Added the required column `carBodyTypeId` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('CAR', 'VAN', 'MINIBUS', 'PRESTIGE');

-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "carBodyTypeId" INTEGER NOT NULL,
ADD COLUMN     "engineCapacity" INTEGER NOT NULL DEFAULT 1000,
ADD COLUMN     "seats" INTEGER NOT NULL DEFAULT 4,
ADD COLUMN     "vehicleType" "VehicleType" NOT NULL DEFAULT 'CAR';

-- CreateTable
CREATE TABLE "CarBodyType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "CarBodyType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_carBodyTypeId_fkey" FOREIGN KEY ("carBodyTypeId") REFERENCES "CarBodyType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
