import { Injectable } from '@nestjs/common';
import { PrismaService } from '../service/prisma.service.js';

@Injectable()
export class ProjectCollaboratorRepository {
  constructor(private readonly prisma: PrismaService) {}
}
