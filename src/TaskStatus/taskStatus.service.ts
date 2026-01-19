import { Injectable } from '@nestjs/common';
import { ProjectRepository } from '../Project/project.repository.js';
import { getProject } from '../helper/project.helper.js';
import { TaskStatusRepository } from './taskStatus.repository.js';
import { CreateTaskStatusDto } from './dto/createTaskStatus.dto.js';
import { Prisma } from 'src/generated/prisma/client.js';

@Injectable()
export class TaskStatusService {
  constructor(
    private readonly taskStatusRepository: TaskStatusRepository,
    private readonly projectRepository: ProjectRepository,
  ) {}

  async getTaskStatusesOfProject(projectId: string, accountId: string) {
    await getProject(projectId, accountId, this.projectRepository);
    return await this.taskStatusRepository.getTaskStatusesOfProject(projectId);
  }

  async createTaskStatus(
    projectId: string,
    createTaskStatusDto: CreateTaskStatusDto,
    accountId: string,
  ) {
    await getProject(projectId, accountId, this.projectRepository);
    const statuses =
      await this.taskStatusRepository.getTaskStatusesOfProject(projectId);
    const createTaskStatus: Prisma.TaskStatusCreateInput = {
      color: createTaskStatusDto.color,
      text: createTaskStatusDto.text,
      isDefault: false,
      isDoneStatus: false,
      isEntryPoint: false,
      statusOrder: statuses.length - 1,
      project: {
        connect: { id: projectId },
      },
    };
    const newStatus = await this.taskStatusRepository.createTaskStatus(
      projectId,
      createTaskStatus,
    );
    const doneStatus = statuses.find((status) => status.isDoneStatus);
    if (doneStatus) {
      await this.taskStatusRepository.updateDoneStatus(
        doneStatus.id,
        statuses.length,
      );
    }

    return newStatus;
  }
}
