import { PrismaClient } from '@prisma/client';

export class abstractDb {
  protected prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  deconstructor() {
    this.prisma.$disconnect();
  }
}
