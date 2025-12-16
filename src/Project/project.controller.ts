import { Controller, Get } from '@nestjs/common';
import { ProjectService } from './project.service.js';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async findAll() {
    return await this.projectService.findAll();
  }
}
