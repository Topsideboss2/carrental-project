import { MediaType } from '@prisma/client';
import { IsInt, IsString, IsNumber } from 'class-validator';

export class CarMediaDto {

  @IsInt()
  carId = 0;

  @IsString()
  mediaType = "" as MediaType;

  @IsString()
  mediaUrl = "";

}
