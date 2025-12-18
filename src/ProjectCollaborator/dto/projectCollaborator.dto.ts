import { Expose, Type } from 'class-transformer';
import { CommonAccountDto } from '../../Account/dto/commonAccount.dto.js';
import { ProjectInviteStatus } from '../../generated/prisma/enums.js';

export class ProjectCollaboratorDto {
  @Expose()
  id: string;
  @Expose()
  status: ProjectInviteStatus;
  @Expose()
  @Type(() => CommonAccountDto)
  invitedAccount: CommonAccountDto;
  @Expose()
  inviteDueDate: Date | null;
  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date | null;
  constructor(partial: Partial<ProjectCollaboratorDto>) {
    Object.assign(this, partial);
  }
}
