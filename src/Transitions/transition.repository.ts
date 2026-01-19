import { Injectable } from '@nestjs/common';
import { PrismaService } from '../service/prisma.service.js';

@Injectable()
export class TransitionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getProjectTransitions(projectId: string) {
    return this.prisma.statusTransition.findMany({
      where: {
        projectId,
      },
    });
  }
}
