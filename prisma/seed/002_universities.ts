import { PrismaClient } from '@prisma/client';
import universities from './data/universities.json';

export default async (prisma: PrismaClient) => {
  for (let i = 0; i < universities.length; i++) {
    const newUniversity = await prisma.university.upsert({
      where: { name: universities[i].name },
      update: {},
      create: {
        name: universities[i].name,
        content: universities[i].content,
        city_id: (await prisma.city.findUnique({ where: { name: universities[i].city } }))?.id || 1,
        delegate_id:
          (await prisma.user.findUnique({ where: { email: universities[i].delegate } }))?.id || 1,
      },
    });

    for (const faculty of universities[i].faculties) {
      const newFaculty = await prisma.faculty.upsert({
        where: { university_id_name: { university_id: newUniversity.id, name: faculty.name } },
        update: {},
        create: {
          name: faculty.name,
          university_id: newUniversity.id,
        },
      });

      for (const department of faculty.departments) {
        const newDepartment = await prisma.department.upsert({
          where: { faculty_id_name: { faculty_id: newFaculty.id, name: department.name } },
          update: {},
          create: {
            name: department.name,
            faculty_id: newFaculty.id,
          },
        });

        for (const flow of department.flows) {
          const newFlow = await prisma.flow.upsert({
            where: { department_id_name: { department_id: newDepartment.id, name: flow.name } },
            update: {},
            create: {
              name: flow.name,
              department_id: newDepartment.id,
            },
          });

          for (const group of flow.groups) {
            await prisma.group.upsert({
              where: { flow_id_name: { flow_id: newFlow.id, name: group.name } },
              update: {},
              create: {
                name: group.name,
                flow_id: newFlow.id,
              },
            });
          }
        }
      }
    }
  }
};
