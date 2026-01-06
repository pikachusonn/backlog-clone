import { TaskRepository } from './task.repository.js';
import { ProjectRepository } from '../Project/project.repository.js';
import { getProject } from '../helper/project.helper.js';
import { plainToInstance } from 'class-transformer';
import { TaskDto } from './dto/task.dto.js';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginatedResult } from 'src/interface/common.js';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly projectRepository: ProjectRepository,
  ) { }

  findTaskByProjectId = async (
    projectId: string,
    accountId: string,
    pageSize?: number,
    pageIndex?: number,
    assigneeId?: string,
  ): Promise<PaginatedResult<TaskDto>> => {
    const project = await getProject(
      projectId,
      accountId,
      this.projectRepository,
    );
    const tasks = await this.taskRepository.findTaskByProjectId(
      project.id,
      pageSize,
      pageIndex,
      assigneeId,
    );
    return {
      data: plainToInstance(TaskDto, tasks, {
        excludeExtraneousValues: true,
      }),
      metaData: {
        pageIndex: pageIndex ?? 1,
        pageSize,
        total: tasks.length,
        totalPages:
          pageSize && pageIndex
            ? Math.ceil(tasks.length / pageSize)
            : undefined,
        hasPreviousPage: pageIndex && pageSize ? pageIndex > 1 : false,
        hasNextPage:
          pageIndex && pageSize
            ? pageIndex < Math.ceil(tasks.length / pageSize)
            : false,
      },
    };
  };

  updateTaskAssignee = async (
    taskId: string,
    assigneeId: string,
  ): Promise<TaskDto> => {
    const task = await this.taskRepository.findTaskById(taskId);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    const updatedTask = {
      ...task,
      assigneeId: assigneeId,
    };
    const result = await this.taskRepository.updateTaskById(
      taskId,
      updatedTask,
    );
    return plainToInstance(TaskDto, result, {
      excludeExtraneousValues: true,
    });
  };
}
