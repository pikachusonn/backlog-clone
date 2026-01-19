import { Injectable } from '@nestjs/common';
import { PrismaService } from '../service/prisma.service.js';
import { Prisma } from 'src/generated/prisma/client.js';

@Injectable()
export class TaskStatusRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getTaskStatusesOfProject(projectId: string) {
    return this.prisma.taskStatus.findMany({
      where: {
        projectId,
      },
    });
  }

  async createTaskStatus(
    projectId: string,
    createTask: Prisma.TaskStatusCreateInput,
  ) {
    return this.prisma.taskStatus.create({
      data: {
        color: createTask.color,
        text: createTask.text,
        isDefault: false,
        isDoneStatus: false,
        isEntryPoint: false,
        statusOrder: createTask.statusOrder,
        projectId: projectId,
      },
    });
  }

  async updateDoneStatus(statusId: string, statusOrder: number) {
    return this.prisma.taskStatus.update({
      where: {
        id: statusId,
      },
      data: {
        statusOrder,
      },
    });
  }
}
