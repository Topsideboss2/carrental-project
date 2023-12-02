import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty()
  @IsString()
  email = '';

  @IsNotEmpty()
  @IsString()
  password = '';

  @IsNotEmpty()
  @IsString()
  deviceId = '';
}

export class ForgotPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  email = ""
}

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  email = ""

  @IsNotEmpty()
  @IsString()
  password = ""

  @IsNotEmpty()
  @IsString()
  confirmPassword = ""
}
