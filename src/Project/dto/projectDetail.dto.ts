import { Expose, Type } from 'class-transformer';
import { CommonAccountDto } from '../../Account/dto/commonAccount.dto.js';
import { ProjectRole } from '../../constant/common.js';
import { ProjectCollaboratorDto } from '../../ProjectCollaborator/dto/projectCollaborator.dto.js';
import { TaskStatusDto } from '../../TaskStatus/dto/taskStatus.dto.js';

export class ProjectDetailDto {
  @Expose()
  id: string;
  @Expose()
  name: string;
  @Expose()
  description: string | null;
  @Expose()
  createdAt: Date | null;
  @Expose()
  updatedAt: Date | null;
  @Expose()
  coverImage: string | null;
  @Expose()
  @Type(() => CommonAccountDto)
  createdByAccount: CommonAccountDto | null;
  @Expose()
  projectRole: ProjectRole;
  @Expose()
  @Type(() => ProjectCollaboratorDto)
  projectCollaborators: ProjectCollaboratorDto[];
  @Expose()
  @Type(() => TaskStatusDto)
  taskStatuses: TaskStatusDto[];

  constructor(partial: Partial<ProjectDetailDto>) {
    Object.assign(this, partial);
  }
}
