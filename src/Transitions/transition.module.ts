import { Module } from '@nestjs/common';
import { ProjectModule } from '../Project/project.module.js';
import { TransitionService } from './transition.service.js';
import { TransitionRepository } from './transition.repository.js';
import { PrismaService } from '../service/prisma.service.js';
import { TransitionController } from './transition.controller.js';

@Module({
  imports: [ProjectModule],
  providers: [TransitionService, TransitionRepository, PrismaService],
  controllers: [TransitionController],
  exports: [TransitionRepository, TransitionService],
})
export class TransitionModule {}
