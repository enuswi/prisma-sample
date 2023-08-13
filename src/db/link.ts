import { abstractDb } from './abstractDb';
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

  update = async (id: number, description: string, url: string) => {
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

  delete = async (id: number) => {
    await this.prisma.link.delete({
      where: {
        id,
      }
    });
  };

  getList = async () => {
    return await this.prisma.link.findMany();
  };
}