import { ForbiddenException } from '@nestjs/common';
import { ErrorKey } from '../constant/common.js';
import { ProjectInviteStatus } from '../generated/prisma/enums.js';
import { ProjectDetailDto } from '../Project/dto/projectDetail.dto.js';

export const checkProjectAccessibility = (
  project: ProjectDetailDto,
  accountId: string,
): void => {
  const projectCollaborator = project.projectCollaborators?.find(
    (pc) => pc.invitedAccount.id === accountId,
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
