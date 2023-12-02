import { IsNumber, IsString } from 'class-validator';

export class CarAmenityDto {
  @IsNumber()
  carId = 0;

  @IsNumber()
  amenityId = 0;

  @IsString()
  value = "";
}
