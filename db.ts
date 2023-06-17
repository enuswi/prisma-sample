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

export class Link extends abstractDb {
  constructor() {
    super();
  }

  create = async (description: string, url: string) => {
    await this.prisma.link.create({
      data: {
        description,
        url,
      }
    });
  };

  getList = async () => {
    return await this.prisma.link.findMany();
  };
}

export class User extends abstractDb {
  create = async () => {
    await this.prisma.user.create({
      data: {
        name: 'Alice',
        email: 'alice@prisma.io',
        posts: {
          create: { title: 'Hello World' },
        },
        profile: {
          create: { bio: 'I like turtles' },
        },
      },
    });
  };
}

export class Post extends abstractDb {
}