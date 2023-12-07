import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class RegisterDto {

  @IsNumber()
  @IsNotEmpty()
  organizationId = 0;

  @IsNumber()
  @IsNotEmpty()
  userTypeId = 0;

  @IsString()
  firstName = "";

  @IsString()
  lastName = "";

  @IsString()
  username = "";

  @IsEmail()
  @IsOptional()
  email = "";

  @IsString()
  @IsOptional()
  phoneNumber = "";

  @IsString()
  @IsOptional()
  countryCode?: string = '+254';

  @IsString()
  @IsNotEmpty()
  password = "";

  @IsBoolean()
  @IsOptional()
  isPhoneVerified?: boolean = false;

  @IsBoolean()
  @IsOptional()
  isEmailVerified?: boolean = false;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;

  @IsOptional()
  roleId?: number;

  @IsString()
  @IsOptional()
  refreshToken?: string;

  @IsString()
  @IsOptional()
  currentLatitude?: string;

  @IsString()
  @IsOptional()
  currentLongitude?: string;

  @IsString()
  @IsOptional()
  currentLocation?: string;

  @IsString()
  deviceId = "";
}
