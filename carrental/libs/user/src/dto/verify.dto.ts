import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyDto {
  @IsNotEmpty()
  @IsString()
  userId = ""

  @IsNotEmpty()
  @IsString()
  code = ""
}

