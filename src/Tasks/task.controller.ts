import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  Put,
  Post,
  Body,
} from '@nestjs/common';
import { TaskService } from './task.service.js';
import { TaskDto } from './dto/task.dto.js';
import CurrentUser from '../decorators/current-user.decorator.js';
import { JwtAuthGuard } from '../guard/JwtAuth.guard.js';
import { PaginatedResult } from 'src/interface/common.js';
import { CreateTaskDto } from './dto/createTask.dto.js';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':projectId')
  @UseGuards(JwtAuthGuard)
  async findTaskByProjectId(
    @Param('projectId') projectId: string,
    @CurrentUser() currentUser,
    @Query('pageSize') pageSize: number,
    @Query('pageIndex') pageIndex: number,
    @Query('assigneeId') assigneeId?: string,
  ): Promise<PaginatedResult<TaskDto>> {
    return await this.taskService.findTaskByProjectId(
      projectId,
      currentUser.userId,
      pageSize,
      pageIndex,
      assigneeId,
    );
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async updateTaskAssignee(
    @Query('taskId') taskId: string,
    @Query('assigneeId') assigneeId: string,
  ): Promise<TaskDto> {
    return await this.taskService.updateTaskAssignee(taskId, assigneeId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createTask(
    @Body() createTaskPayload: CreateTaskDto,
    @CurrentUser() currentUser,
  ): Promise<TaskDto> {
    return await this.taskService.createTask(
      createTaskPayload,
      currentUser.userId,
    );
  }
}
