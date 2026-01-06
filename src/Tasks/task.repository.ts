import { Injectable } from '@nestjs/common';
import { Prisma, Task } from '../generated/prisma/client.js';
import { PrismaService } from '../service/prisma.service.js';

@Injectable()
export class TaskRepository {
  constructor(private readonly prisma: PrismaService) { }

  async findTaskByProjectId(
    projectId: string,
    pageSize?: number,
    pageIndex?: number,
    assigneeId?: string,
  ): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        projectId: projectId,
        assigneeId: assigneeId ?? undefined,
      },
      skip: pageIndex && pageSize ? (pageIndex - 1) * pageSize : undefined,
      take: pageSize ?? undefined,
      include: {
        assignee: {
          include: {
            targetAccount: true,
          },
        },
      },
    });
  }

  async findTaskById(taskId: string): Promise<Task | null> {
    return await this.prisma.task.findUnique({
      where: { id: taskId },
    });
  }

  async updateTaskById(
    taskId: string,
    task: Prisma.TaskUpdateInput,
  ): Promise<Task> {
    return this.prisma.task.update({
      where: { id: taskId },
      data: task,
      include: {
        assignee: {
          include: {
            targetAccount: true,
          },
        },
      },
    });
  }
}
