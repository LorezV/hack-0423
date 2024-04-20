import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const universities = [
  { name: 'ОГУ', content: 'туда сюда 1', city: 'Оренбург', delegate_id: 1 },
  { name: 'ОГПУ', content: 'туда сюда 2', city: 'Оренбург', delegate_id: 2 },
  { name: 'ОГАУ', content: 'туда сюда 3', city: 'Оренбург', delegate_id: 3 },
];

export async function UniversitySeed() {
  try {
    await Promise.all(
      universities.map(async (university) => {
        const { city, ...data } = university;
        const optionalCity = await prisma.city.findFirst({ where: { name: city } });

        if (optionalCity?.id) {
          await prisma.university.upsert({
            where: { name: data.name },
            create: {
              ...data,
              city_id: optionalCity.id,
              delegate_id: data.delegate_id,
            },
            update: {
              ...data,
            },
          });
        }
      }),
    );

    console.log('University seed completed successfully');
  } catch (error) {
    console.error('University seed failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}
