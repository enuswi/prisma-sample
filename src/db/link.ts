import { abstractDb } from './abstractDb';
export class Link extends abstractDb {
  constructor() {
    super();
  }

  public create = async (description: string, url: string) => {
    await this.prisma.link.create({
      data: {
        description,
        url,
      }
    });
  };

  public update = async (id: number, description: string, url: string) => {
    await this.prisma.link.update({
      where: {
        id,
      },
      data: {
        description,
        url,
      }
    });
  };

  public delete = async (id: number) => {
    //await this.prisma.link.delete({
    //  where: {
    //    id,
    //  }
    //});
    await this.prisma.link.update({
      where: {
        id,
      },
      data: {
        delete_falg: 1,
      }
    });
  };

  public getList = async () => {
    return await this.prisma.link.findMany();
  };

  public find = async (id: number) => {
    return await this.prisma.link.findFirst({
      where: {
        id,
      }
    });
  };
}