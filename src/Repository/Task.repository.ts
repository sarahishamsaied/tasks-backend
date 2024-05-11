import { EnumStatus, PrismaClient, Task } from '@prisma/client';

class TaskRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async get(userId: string): Promise<Task[]> {
    return this.prisma.task.findMany({ where: { userId, isDeleted: false } });
  }

  async create(task: Omit<Task, 'id' | 'createdAt' | 'isDeleted' | 'deletedAt'>): Promise<Task> {
    return this.prisma.task.create({ data: task });
  }

  async findById(id: string): Promise<Task | null> {
    return this.prisma.task.findUnique({ where: { id } });
  }

  async update(id: string, task: Partial<Task>): Promise<Task> {
    return this.prisma.task.update({ where: { id }, data: task });
  }

  async updateStatus(id: string, status: EnumStatus): Promise<Task> {
    return this.prisma.task.update({ where: { id }, data: { status } });
  }

  async delete(id: string): Promise<Task> {
    return this.prisma.task.update({ where: { id }, data: { deletedAt: new Date(), isDeleted: true } });
  }

  async changeTaskStatus(): Promise<string> {
    console.log('Updating task status');
    const currentTime = new Date();
    const tasksToUpdate = await this.prisma.task.findMany({
      where: {
        AND: [{ startDate: { lte: currentTime } }, { endDate: { gte: currentTime } }],
      },
    });
    tasksToUpdate.forEach(async (task) => {
      console.log('Updating task status to IN_PROGRESS');
      await this.prisma.task.update({ where: { id: task.id }, data: { status: EnumStatus.IN_PROGRESS } });
    });
    console.log('Task status updated');
    return 'Task status updated';
  }
}

export default TaskRepository;
