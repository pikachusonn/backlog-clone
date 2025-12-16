import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller.js';
import { ProjectService } from './project.service.js';
import { ProjectRepository } from './project.repository.js';
import { PrismaService } from '../service/prisma.service.js';

@Module({
  imports: [],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRepository, PrismaService],
})
export class ProjectModule {}
