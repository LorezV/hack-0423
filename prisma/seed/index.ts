import { PrismaClient } from '@prisma/client';
import seedCities from './000_cities';
import seedDelegates from './001_delegates';
import seedUniversities from './002_universities';
import seedStudents from './003_students';
import seedEvents from './004_events';

const prisma = new PrismaClient();

async function main() {
  await seedCities(prisma);
  await seedDelegates(prisma);
  await seedUniversities(prisma);
  await seedStudents(prisma);
  await seedEvents(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
