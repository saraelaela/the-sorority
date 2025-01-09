import { PrismaClient } from '@prisma/client';
import events from './events';

const prisma = new PrismaClient();

async function main() {
  for (let event of events) {
    await prisma.event.create({
      data: event,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
