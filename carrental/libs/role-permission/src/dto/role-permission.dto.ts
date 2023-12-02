import { IsArray, IsNumber } from 'class-validator';

export class RolePermissionDto {
  @IsNumber()
  roleId = 0;

  @IsArray()
  permissions: number[] = [];
}
