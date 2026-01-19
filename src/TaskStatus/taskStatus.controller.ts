import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TaskStatusService } from './taskStatus.service.js';
import { JwtAuthGuard } from '../guard/JwtAuth.guard.js';
import CurrentUser from '../decorators/current-user.decorator.js';
import { CreateTaskStatusDto } from './dto/createTaskStatus.dto.js';

@Controller('task-statuses')
export class TaskStatusController {
  constructor(private readonly taskStatusService: TaskStatusService) {}

  @Get('/:projectId')
  @UseGuards(JwtAuthGuard)
  async getTaskStatusesOfProject(
    @Param('projectId') projectId: string,
    @CurrentUser() user,
  ) {
    return await this.taskStatusService.getTaskStatusesOfProject(
      projectId,
      user.userId as string,
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createTaskStatus(
    @Query('projectId') projectId: string,
    @Body() createTaskStatusDto: CreateTaskStatusDto,
    @CurrentUser() user,
  ) {
    return await this.taskStatusService.createTaskStatus(
      projectId,
      createTaskStatusDto,
      user.userId as string,
    );
  }
}
