import {
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ErrorKey, ProjectRole } from '../constant/common.js';
import { ProjectInviteStatus } from '../generated/prisma/enums.js';
import { ProjectDetailDto } from '../Project/dto/projectDetail.dto.js';
import { ProjectRepository } from 'src/Project/project.repository.js';
import { plainToInstance } from 'class-transformer';

export const checkProjectAccessibility = (
  project: ProjectDetailDto,
  accountId: string,
): void => {
  const projectCollaborator = project.projectCollaborators?.find(
    (pc) => pc.targetAccount.id === accountId,
  );

  const isCreator = project.createdByAccount?.id === accountId;

  if (
    (!projectCollaborator ||
      projectCollaborator.status === ProjectInviteStatus.REJECTED ||
      projectCollaborator.status === ProjectInviteStatus.INACTIVE) &&
    !isCreator
  ) {
    throw new ForbiddenException({
      message: 'You are not authorized to access this project',
      errorKey: ErrorKey.UNAUTHORIZED_PROJECT,
    });
  }

  if (
    projectCollaborator?.status === ProjectInviteStatus.PENDING_INVITE &&
    !isCreator
  ) {
    throw new ForbiddenException({
      message:
        'You have been invited to this project. Do you accept the invitation?',
      errorKey: ErrorKey.PENDING_PROJECT_INVITE,
    });
  }
};

export const getProject = async (
  projectId: string,
  accountId: string,
  projectRepository: ProjectRepository,
): Promise<ProjectDetailDto> => {
  try {
    const result = await projectRepository.findProjectById(projectId);
    if (!result) {
      throw new NotFoundException({
        message: 'Project not found',
        errorKey: ErrorKey.NOT_FOUND,
      });
    }
    console.log('Result: ', result);
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
  } catch (error) {
    throw new InternalServerErrorException({
      message: 'Internal server error',
      errorKey: ErrorKey.INTERNAL_SERVER_ERROR,
      details: error.message,
    });
  }
};
