import { IsString } from 'class-validator';

export class CarBodyDto {
  @IsString()
  name = "";
}
