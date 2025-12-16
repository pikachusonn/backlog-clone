import { Injectable } from '@nestjs/common';
import { PrismaService } from '../service/prisma.service.js';

@Injectable()
export class ProjectRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll = async () => {
    return this.prisma.project.findMany();
  };
}
