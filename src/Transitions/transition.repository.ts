import { Injectable } from '@nestjs/common';
import { PrismaService } from '../service/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';

@Injectable()
export class TransitionRepository {
  constructor(private readonly prisma: PrismaService) { }

  async getProjectTransitions(projectId: string) {
    return this.prisma.statusTransition.findMany({
      where: {
        projectId,
      },
    });
  }

  async createTransition(statusTransition: Prisma.StatusTransitionCreateInput) {
    return this.prisma.statusTransition.create({
      data: statusTransition,
    });
  }
}
