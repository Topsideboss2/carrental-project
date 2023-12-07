import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';


const prisma = new PrismaClient();

async function seedUser() {
  const role = await prisma.role.create({
    data: {
      name: 'Admin',
    },
  });

  const permissions: number[] = [];

  for (let i = 1; i <= 33; i++) {
    permissions.push(i);
  }

  permissions.forEach(async (element) => {
    await prisma.rolePermission.create({
      data: {
        roleId: role.id,
        permissionId: element,
      },
    });
  });
  const hashedPassword = await bcrypt.hash('password', 10);
  const user = await prisma.user.create({
    data: {
      userType: 'ADMIN',
      firstName: 'John',
      lastName: 'Doe',
      email: 'admin@carrental.com',
      phoneNumber: '254741424797',
      countryCode: '+254',
      password: hashedPassword,
      gender: 'MALE',
      pwd: false,
      nationality: 'Kenyan',
      isEmailVerified: true
    },
  });

  await prisma.userRole.create({
    data: {
      userId: user.id,
      roleId: role.id
    }
  })
}

seedUser()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
