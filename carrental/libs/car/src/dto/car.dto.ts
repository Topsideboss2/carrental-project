import { FuelType, TransmissionType, VehicleType } from '@prisma/client';
import { IsInt, IsString, IsNumber, IsArray } from 'class-validator';

export class CarDto {

  @IsInt()
  carMakeId = 0;

  @IsString()
  model = "";

  @IsNumber()
  year = 0;

  @IsNumber()
  dailyRate = 0;

  @IsString()
  transmission = "" as TransmissionType;

  @IsString()
  fuelType = "" as FuelType;

  @IsNumber()
  stock = 1;

  @IsNumber()
  luggage = 1

  @IsNumber()
  seats = 4

  @IsNumber()
  engineCapacity = 1000

  @IsNumber()
  carBodyTypeId = 0

  @IsString()
  pickUpLocation = ""

  @IsString()
  pickUpLatitude = ""

  @IsString()
  pickUpLongitude = ""

  @IsString()
  vehicleType = "" as VehicleType

  @IsArray()
  carAmenities = [] as CarAmenityDto[]
}

export class CarAmenityDto {
  @IsInt()
  amenityId = 0;

  @IsString()
  value = ""
}
