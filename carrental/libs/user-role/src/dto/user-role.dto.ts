import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UserRoleDto {
  @IsString()
  @IsNotEmpty()
  userId = "";

  @IsNumber()
  @IsNotEmpty()
  roleId = 0;
}
