import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { TaskPriority, TaskType } from '../../generated/prisma/enums.js';
import { CreateTaskAttachmentDto } from 'src/Attachment/dto/createTaskAttachment.dto.js';
import { Type } from 'class-transformer';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  assigneeId?: string;

  @IsString()
  @IsOptional()
  taskStatusId?: string;

  @IsString()
  @IsOptional()
  startDate?: string;

  @IsString()
  @IsOptional()
  dueDate?: string;

  @IsEnum(TaskPriority, { message: 'Invalid priority value' })
  @IsOptional()
  priority?: TaskPriority;

  @IsEnum(TaskType, { message: 'Invalid type value' })
  @IsOptional()
  type?: TaskType;

  @IsArray({ message: 'Attachments must be an array' })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateTaskAttachmentDto)
  attachments?: CreateTaskAttachmentDto[];
}
