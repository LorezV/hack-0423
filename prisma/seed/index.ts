import { PrismaClient } from '@prisma/client';
import { CitySeed } from './citySeed';
import { UniversitySeed } from './universitySeed';
import { UserSeed } from './userSeed';

const prisma = new PrismaClient();
async function main() {
  UserSeed();
  CitySeed();
  UniversitySeed();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    await prisma.$disconnect();
    console.log('seed error ', error);
    process.exit(1);
  });
