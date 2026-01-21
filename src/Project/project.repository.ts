import { Injectable } from '@nestjs/common';
import { PrismaService } from '../service/prisma.service.js';
import { Project } from 'src/generated/prisma/client.js';
import { Prisma } from '../generated/prisma/client.js';
import { DefaultTaskStatusText } from '../constant/common.js';

@Injectable()
export class ProjectRepository {
  constructor(private readonly prisma: PrismaService) { }

  findAll = async (): Promise<Project[]> => {
    return this.prisma.project.findMany({
      include: {
        createdByAccount: true,
      },
    });
  };

  findParticipatedProjects = async (accountId: string): Promise<Project[]> => {
    return this.prisma.project.findMany({
      where: {
        OR: [
          {
            projectCollaborators: {
              some: {
                accountId: accountId,
              },
            },
          },
          {
            createdByAccount: {
              id: accountId,
            },
          },
        ],
      },
      include: {
        createdByAccount: true,
      },
    });
  };

  findProjectById = async (projectId: string): Promise<Project | null> => {
    return this.prisma.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        createdByAccount: true,
        taskStatuses: true,
        transitions: true,
        projectCollaborators: {
          include: {
            targetAccount: true,
          },
        },
      },
    });
  };

  createProject = async (project: Prisma.ProjectCreateInput) => {
    return this.prisma.project.create({
      data: {
        ...project,
        taskStatuses: {
          createMany: {
            data: DefaultTaskStatusText.map((status, index) => ({
              text: status.text,
              color: status.color,
              isDefault: true,
              isDoneStatus: status.isDoneStatus,
              isEntryPoint: status.isEntryPoint,
              statusOrder: index,
            })),
          },
        },
      },
    });
  };
}
