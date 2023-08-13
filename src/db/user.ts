import { abstractDb } from './abstractDb';

export class User extends abstractDb {
  public create = async (
    param: {
      email: string,
      post: { title: string },
      name?: string,
      profile?: { bio: string }
    }
    ) => {
    await this.prisma.user.create({
      data: {
        name: param.name ?? undefined,
        email: param.email,
        posts: {
          create: { title: param.post.title },
        },
        profile: param.profile
          ? {
            create: { bio: param.profile.bio },
          }
          : undefined,
        },
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

  public getList = async () => {
    return await this.prisma.user.findMany({
      include: {
        posts: true,
        profile: true,
      },
    });
  };
}