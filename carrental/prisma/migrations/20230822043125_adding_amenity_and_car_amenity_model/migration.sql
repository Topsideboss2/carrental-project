-- CreateTable
CREATE TABLE "Amenity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Amenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarAmenity" (
    "id" SERIAL NOT NULL,
    "carId" INTEGER NOT NULL,
    "amenityId" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "CarAmenity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CarAmenity" ADD CONSTRAINT "CarAmenity_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarAmenity" ADD CONSTRAINT "CarAmenity_amenityId_fkey" FOREIGN KEY ("amenityId") REFERENCES "Amenity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
