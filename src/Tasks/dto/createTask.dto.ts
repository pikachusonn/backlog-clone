import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateTaskAttachmentDto } from '../../Attachment/dto/createTaskAttachment.dto.js';
import { TaskPriority, TaskType } from '../../generated/prisma/enums.js';

export class CreateTaskDto {
  @IsNotEmpty({ message: 'Project ID is required' })
  @IsString({ message: 'Project ID must be a string' })
  projectId: string;
  @IsNotEmpty({ message: 'Assignee ID is required' })
  @IsString({ message: 'Assignee ID must be a string' })
  assigneeId: string;
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description: string;
  @IsNotEmpty({ message: 'Task title is required' })
  @IsString({ message: 'Task title must be a string' })
  taskName: string;
  @IsArray({ message: 'Attachments must be an array' })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateTaskAttachmentDto)
  attachments: CreateTaskAttachmentDto[];
  @IsOptional()
  @IsString({ message: 'Start date must be a string' })
  startDate: string;
  @IsOptional()
  @IsString({ message: 'Due date must be a string' })
  dueDate: string;
  @IsEnum(TaskPriority, { message: 'Invalid priority value' })
  priority: TaskPriority;
  @IsEnum(TaskType, { message: 'Invalid type value' })
  type: TaskType;
}
