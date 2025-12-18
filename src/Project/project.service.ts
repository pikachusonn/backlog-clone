import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from './project.repository.js';
import { plainToInstance } from 'class-transformer';
import { ProjectDto } from './dto/project.dto.js';
import { ErrorKey, ProjectRole } from './../constant/common.js';
import { ProjectDetailDto } from './dto/projectDetail.dto.js';
import { checkProjectAccessibility } from '../helper/project.helper.js';
import { CreateProjectDto } from './dto/createProject.dto.js';
@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  findAll = async (): Promise<ProjectDto[]> => {
    const result = await this.projectRepository.findAll();
    return plainToInstance(ProjectDto, result, {
      excludeExtraneousValues: true,
    });
  };

  findParticipatedProjects = async (
    accountId: string,
  ): Promise<ProjectDto[]> => {
    const result =
      await this.projectRepository.findParticipatedProjects(accountId);
    return plainToInstance(
      ProjectDto,
      result.map((r) => ({
        ...r,
        projectRole:
          r.createdBy === accountId
            ? ProjectRole.OWNER
            : ProjectRole.COLLABORATOR,
      })),
      {
        excludeExtraneousValues: true,
      },
    );
  };

  findProjectById = async (
    projectId: string,
    accountId: string,
  ): Promise<ProjectDetailDto | null> => {
    const result = await this.projectRepository.findProjectById(projectId);
    if (!result) {
      throw new NotFoundException({
        message: 'Project not found',
        errorKey: ErrorKey.NOT_FOUND,
      });
    }

    const convertedResult = plainToInstance(
      ProjectDetailDto,
      {
        ...result,
        projectRole:
          result.createdBy === accountId
            ? ProjectRole.OWNER
            : ProjectRole.COLLABORATOR,
      },
      {
        excludeExtraneousValues: true,
      },
    );
    checkProjectAccessibility(convertedResult, accountId);
    return convertedResult;
  };

  createProject = async (
    project: CreateProjectDto,
  ): Promise<ProjectDetailDto> => {
    const result = await this.projectRepository.createProject({
      name: project.name,
      description: project.description,
      coverImage: project.coverImage || null,
      createdByAccount: {
        connect: {
          id: 'ed40f370-be08-494d-8bce-ba4a56360b83',
        },
      },
    });

    return plainToInstance(ProjectDetailDto, result, {
      excludeExtraneousValues: true,
    });
  };
}
