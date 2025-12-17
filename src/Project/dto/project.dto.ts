import { Expose, Type } from 'class-transformer';
import { CreatedByAccountDto } from '../../Account/dto/createdByAccount.dto.js';

export class ProjectDto {
  @Expose()
  id: string;
  @Expose()
  name: string;
  @Expose()
  description: string;
  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date;
  @Expose()
  coverImage: string;
  @Expose()
  @Type(() => CreatedByAccountDto)
  createdByAccount: CreatedByAccountDto;

  constructor(partial: Partial<ProjectDto>) {
    Object.assign(this, partial);
  }
}
