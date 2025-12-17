import { Injectable } from '@nestjs/common';
import { ProjectRepository } from './project.repository.js';
import { plainToInstance } from 'class-transformer';
import { ProjectDto } from './dto/project.dto.js';
@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) { }

  findAll = async (): Promise<ProjectDto[]> => {
    const result = await this.projectRepository.findAll();
    return plainToInstance(ProjectDto, result, {
      excludeExtraneousValues: true,
    });
  };
}
