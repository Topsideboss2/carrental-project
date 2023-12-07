import { IsString } from 'class-validator';

export class AmenityDto {
  @IsString()
  name = "";
}
