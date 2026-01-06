import { Expose, Type } from 'class-transformer';
import { ProjectCollaboratorDto } from '../../ProjectCollaborator/dto/projectCollaborator.dto.js';
export class TaskDto {
  @Expose()
  id: string;
  @Expose()
  name: string | null;
  @Expose()
  description: string | null;
  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date | null;
  @Expose()
  projectId: string;
  @Expose()
  startDate: Date | null;
  @Expose()
  dueDate: Date | null;
  @Expose()
  @Type(() => ProjectCollaboratorDto)
  assignee: ProjectCollaboratorDto | null;
  @Expose()
  taskStatusId: string | null;

  constructor(partial: Partial<TaskDto>) {
    Object.assign(this, partial);
  }
}
