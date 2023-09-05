import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.message.deleteMany();
  await prisma.message.create({
    data: {
      content: 'salemou 3alaykom',
      authorId: 'fakroun',
      kladId: 'fazefa',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    prisma.$disconnect;
  });
