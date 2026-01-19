import { Module } from '@nestjs/common';
import { TaskStatusController } from './taskStatus.controller.js';
import { PrismaService } from '../service/prisma.service.js';
import { TaskStatusRepository } from './taskStatus.repository.js';
import { TaskStatusService } from './taskStatus.service.js';
import { ProjectModule } from '../Project/project.module.js';

@Module({
  imports: [ProjectModule],
  controllers: [TaskStatusController],
  providers: [PrismaService, TaskStatusRepository, TaskStatusService],
  exports: [TaskStatusService, TaskStatusRepository],
})
export class TaskStatusModule {}
