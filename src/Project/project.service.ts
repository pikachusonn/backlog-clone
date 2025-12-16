import { Injectable } from '@nestjs/common';
import { ProjectRepository } from './project.repository.js';
@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  findAll = async () => {
    return this.projectRepository.findAll();
  };
}
