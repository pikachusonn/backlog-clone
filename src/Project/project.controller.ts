import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ProjectService } from './project.service.js';
import { CreateProjectDto } from './dto/createProject.dto.js';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Get()
  async findAll() {
    return await this.projectService.findAll();
  }

  @Get('participated/:accountId')
  async findParticipatedProjects(@Param('accountId') accountId: string) {
    return await this.projectService.findParticipatedProjects(accountId);
  }

  @Get('detail')
  async findProjectById(
    @Query('projectId') projectId: string,
    @Query('accountId') accountId: string,
  ) {
    return await this.projectService.findProjectById(projectId, accountId);
  }

  @Post()
  createProject(@Body() project: CreateProjectDto) {
    return this.projectService.createProject(project);
  }
}
