import { TaskRepository } from './task.repository.js';
import { ProjectRepository } from '../Project/project.repository.js';
import { getProject } from '../helper/project.helper.js';
import { plainToInstance } from 'class-transformer';
import { TaskDto } from './dto/task.dto.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly projectRepository: ProjectRepository,
  ) {}

  findTaskByProjectId = async (
    projectId: string,
    accountId: string,
  ): Promise<TaskDto[]> => {
    const project = await getProject(
      projectId,
      accountId,
      this.projectRepository,
    );
    const tasks = await this.taskRepository.findTaskByProjectId(project.id);
    return plainToInstance(TaskDto, tasks, {
      excludeExtraneousValues: true,
    });
  };
}
