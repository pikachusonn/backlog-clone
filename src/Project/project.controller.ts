/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service.js';
import { CreateProjectDto } from './dto/createProject.dto.js';
import { JwtAuthGuard } from '../guard/JwtAuth.guard.js';
import CurrentUser from '../decorators/current-user.decorator.js';
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async findAll() {
    return await this.projectService.findAll();
  }

  @Get('participated')
  @UseGuards(JwtAuthGuard)
  async findParticipatedProjects(@CurrentUser() user) {
    return await this.projectService.findParticipatedProjects(user.userId);
  }

  @Get('detail')
  @UseGuards(JwtAuthGuard)
  async findProjectById(
    @Query('projectId') projectId: string,
    @CurrentUser() user,
  ) {
    return await this.projectService.findProjectById(projectId, user.userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createProject(@Body() project: CreateProjectDto, @CurrentUser() user) {
    return this.projectService.createProject(project, user.userId);
  }
}
