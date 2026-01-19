import { Injectable } from '@nestjs/common';
import { TransitionRepository } from './transition.repository.js';
import { ProjectRepository } from '../Project/project.repository.js';
import { getProject } from '../helper/project.helper.js';

@Injectable()
export class TransitionService {
  constructor(
    private readonly transitionRepository: TransitionRepository,
    private readonly projectRepository: ProjectRepository,
  ) {}

  async getProjectTransitions(projectId: string, accountId: string) {
    await getProject(projectId, accountId, this.projectRepository);
    return this.transitionRepository.getProjectTransitions(projectId);
  }
}
