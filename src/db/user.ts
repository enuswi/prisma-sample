import { abstractDb } from './abstractDb';

export class User extends abstractDb {
  public create = async (name: string, email: string, post?: {title: string}, profile?: {bio: string}) => {
    await this.prisma.user.create({
      data: {
        name,
        email,
      },
      posts: post
        ? {
          create: post,
        }
        : undefined,
      profile: profile
        ? {
          create: { bio: profile },
        }
        : undefined,
    });
  };

  public find = async (id: number) => {
    return await this.prisma.user.findFirst({
      where: {
        id,
      },
      include: {
        posts: true,
        profile: true,
      },
    });
  };
}