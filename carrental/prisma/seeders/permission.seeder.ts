import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedPermission() {
  await prisma.permission.createMany({
    data: [
      { name: 'view-reservation' },
      { name: 'update-reservation' },

      { name: 'view-invoices' },
      { name: 'update-invoices' },

      { name: 'create-car' },
      { name: 'create-car' },
      { name: 'read-car' },
      { name: 'update-car' },
      { name: 'delete-car' },

      { name: 'create-carbody' },
      { name: 'read-carbody' },
      { name: 'update-carbody' },
      { name: 'delete-carbody' },

      { name: 'create-carmake' },
      { name: 'read-carmake' },
      { name: 'update-carmake' },
      { name: 'delete-carmake' },

      { name: 'create-amenity' },
      { name: 'read-amenity' },
      { name: 'update-amenity' },
      { name: 'delete-amenity' },

      { name: 'create-client' },
      { name: 'read-client' },
      { name: 'update-client' },
      { name: 'delete-client' },

      { name: 'create-staff' },
      { name: 'read-staff' },
      { name: 'update-staff' },
      { name: 'delete-staff' },

      { name: 'create-roles' },
      { name: 'read-roles' },
      { name: 'update-roles' },
      { name: 'delete-roles' },
    ],
  });
}

seedPermission()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
