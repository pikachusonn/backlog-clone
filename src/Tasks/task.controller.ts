import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service.js';
import { TaskDto } from './dto/task.dto.js';
import CurrentUser from '../decorators/current-user.decorator.js';
import { JwtAuthGuard } from '../guard/JwtAuth.guard.js';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':projectId')
  @UseGuards(JwtAuthGuard)
  async findTaskByProjectId(
    @Param('projectId') projectId: string,
    @CurrentUser() currentUser,
  ): Promise<TaskDto[]> {
    return this.taskService.findTaskByProjectId(projectId, currentUser.userId);
  }
}
