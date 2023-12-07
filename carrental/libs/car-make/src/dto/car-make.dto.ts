import { IsString } from 'class-validator';

export class CarMakeDto {
  @IsString()
  name = "";
}
