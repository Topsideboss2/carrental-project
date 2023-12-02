import { IsString, IsInt } from 'class-validator';

export class ReservationDto {
  @IsString()
  userId = "";

  @IsInt()
  carId = 0;

  @IsString()
  startDate = new Date();

  @IsString()
  endDate = new Date();

  @IsString()
  pickUpLocation = ""

  @IsString()
  pickUpLatitude = ""

  @IsString()
  pickUpLongitude = ""

  @IsString()
  dropOffLocation = ""

  @IsString()
  dropOffLatitude = ""

  @IsString()
  dropOffLongitude = ""
}
