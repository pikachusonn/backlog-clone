import { Injectable } from '@nestjs/common';
import { PrismaService } from '../service/prisma.service.js';
import { Project } from 'src/generated/prisma/client.js';

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
}
