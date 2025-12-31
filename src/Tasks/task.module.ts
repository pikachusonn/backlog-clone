import { Module } from '@nestjs/common';
import { PrismaService } from '../service/prisma.service.js';
import { TaskRepository } from './task.repository.js';
import { TaskController } from './task.controller.js';
import { TaskService } from './task.service.js';
import { ProjectModule } from '../Project/project.module.js';

@Module({
  imports: [ProjectModule],
  controllers: [TaskController],
  providers: [PrismaService, TaskRepository, TaskService],
})
export class TaskModule {}
