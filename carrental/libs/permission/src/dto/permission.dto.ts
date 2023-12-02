import { IsString } from 'class-validator';

export class PermissionDto {
  @IsString()
  name = "";
}
