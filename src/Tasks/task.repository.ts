import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
        attachments: true,
      },
    });
  }

  async findTaskById(taskId: string): Promise<Task | null> {
    return await this.prisma.task.findUnique({
      where: { id: taskId },
      include: {
        assignee: {
          include: {
            targetAccount: true,
          },
        },
        attachments: true,
      },
    });
  }

  async updateTaskById(
    taskId: string,
    task?: Prisma.TaskUpdateInput,
    addedAttachments?: Prisma.AttachmentCreateManyInput[],
    deletedAttachments?: string[],
  ): Promise<Task | null> {
    try {
      return this.prisma.$transaction(async (tx) => {
        if (addedAttachments?.length) {
          await tx.attachment.createMany({
            data: addedAttachments.map((attachment) => ({
              ...attachment,
              taskId: taskId,
            })),
          });
        }

        if (deletedAttachments?.length) {
          await tx.attachment.deleteMany({
            where: {
              id: {
                in: deletedAttachments,
              },
            },
          });
        }

        if (task) {
          await tx.task.update({
            where: { id: taskId },
            data: task,
            include: {
              assignee: {
                include: {
                  targetAccount: true,
                },
              },
              attachments: true,
            },
          });
        }
        return await tx.task.findUnique({
          where: { id: taskId },
          include: {
            assignee: {
              include: {
                targetAccount: true,
              },
            },
            attachments: true,
          },
        });
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to update task');
    }
  }

  async createTask(task: Prisma.TaskCreateInput): Promise<Task> {
    return this.prisma.task.create({
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
