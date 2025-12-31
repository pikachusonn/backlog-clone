import { Injectable } from '@nestjs/common';
import { Task } from '../generated/prisma/client.js';
import { PrismaService } from '../service/prisma.service.js';

@Injectable()
export class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findTaskByProjectId(projectId: string): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        projectId: projectId,
      },
      include: {
        assignee: true,
      },
    });
  }
}
