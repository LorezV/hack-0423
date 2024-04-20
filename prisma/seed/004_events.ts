import { PrismaClient, UserType } from '@prisma/client';
import events from './data/events.json';
import dayjs from 'dayjs';

export default async (prisma: PrismaClient) => {
  for (const event of events) {
    const universityId =
      (await prisma.university.findUnique({ where: { name: event.university } }))?.id || 0;

    const eventType = await prisma.eventType.upsert({
      where: { name: event.type.name },
      update: {},
      create: { name: event.type.name, reward: Math.ceil(Math.random() * 10 + 1) },
    });

    const newEvent = await prisma.event.upsert({
      where: { name_university_id: { name: event.title, university_id: universityId } },
      update: {},
      create: {
        name: event.title,
        content: event.content,
        started_at: dayjs().add(-10, 'day').toDate(),
        finished_at: dayjs().add(-5, 'day').toDate(),
        type_id: eventType.id,
        university_id: universityId,
      },
    });

    const students = (
      await prisma.user.findMany({
        where: {
          type: UserType.STUDENT,
        },
      })
    ).filter(() => Math.random() > 0, 0.5);

    for (const student of students) {
      await prisma.participation.upsert({
        where: { user_id_event_id: { user_id: student.id, event_id: newEvent.id } },
        update: {},
        create: {
          approved: true,
          reward: eventType.reward,
          event_id: newEvent.id,
          user_id: student.id,
        },
      });
    }
  }
};
