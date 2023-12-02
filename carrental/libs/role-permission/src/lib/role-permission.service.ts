import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { RolePermissionDto } from '../dto/role-permission.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class RolePermissionService {
  async getPermissionsForRole(roleId: number): Promise<number[]> {
    const rolePermissions = await prisma.rolePermission.findMany({
      where: {
        roleId,
      },
      select: {
        permissionId: true,
      },
    });

    return rolePermissions.map((rp) => rp.permissionId);
  }

  async updateRolePermissions(data: RolePermissionDto): Promise<number[]> {
    const { roleId, permissions } = data;

    const existingPermissions = await this.getPermissionsForRole(roleId);

    const permissionsToAdd = permissions.filter(
      (permissionId) => !existingPermissions.includes(permissionId)
    );

    const permissionsToRemove = existingPermissions.filter(
      (permissionId) => !permissions.includes(permissionId)
    );

    await this.createPermissionsBasedOnRoleId(roleId, permissionsToAdd);

    await this.deletePermissionsBasedOnRoleId(roleId, permissionsToRemove);

    return permissions;
  }

  async deletePermissionsBasedOnRoleId(roleId: number, permissions: number[]) {
    try {
      for (const permissionId of permissions) {
        await prisma.rolePermission.deleteMany({
          where: {
            roleId,
            permissionId,
          },
        });
      }

      return 'Deleted successfully'
    } catch (error) {
      throw new InternalServerErrorException(error as string);
    }
  }

  async createPermissionsBasedOnRoleId(roleId: number, permissions: number[]) {
    try {
      for (const permissionId of permissions) {
        await prisma.rolePermission.create({
          data: {
            roleId,
            permissionId,
          },
        });
      }

      return 'Created successfully'
    } catch (error) {
      throw new InternalServerErrorException(error as string)
    }
  }

  async deleteRolePermissionsBasedOnPermissionId(permissionId: number) {
    return await prisma.rolePermission.deleteMany({
      where: {
        permissionId,
      }
    })
  }

  async deleteRolePermissionsBasedOnRoleId(roleId: number) {
    return await prisma.rolePermission.deleteMany({
      where: {
        roleId,
      }
    })
  }
}
