import { IsString } from 'class-validator';

export class UserTypeDto {
  @IsString()
  name = "";
}
