-- CreateEnum
CREATE TYPE "CarDrive" AS ENUM ('TWO_WHEEL_DRIVE', 'FOUR_WHEEL_DRIVE');

-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "drive" "CarDrive" NOT NULL DEFAULT 'TWO_WHEEL_DRIVE',
ADD COLUMN     "exteriorColor" TEXT,
ADD COLUMN     "interiorColor" TEXT;

-- AlterTable
ALTER TABLE "CarAmenity" ALTER COLUMN "value" DROP NOT NULL;
