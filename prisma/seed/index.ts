import { PrismaClient } from '@prisma/client';
import { CitySeed } from './CitySeed';
import { DelegateSeed } from './delegateSeed';
import { DepartmentSeed } from './departmentSeed';
import { EventTypeSeed } from './eventTypeSeed';
import { FacultySeed } from './facultySeed';
import { FlowSeed } from './flowSeed';
import { GroupSeed } from './groupSeed';
import { StudentSeed } from './studentSeed';
import { UniversitySeed } from './universitySeed';

const prisma = new PrismaClient();
async function main() {
  CitySeed();
  DelegateSeed();
  UniversitySeed();
  FacultySeed();
  DepartmentSeed();
  FlowSeed();
  GroupSeed();
  EventTypeSeed();
  StudentSeed();
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
