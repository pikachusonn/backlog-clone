import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateTaskAttachmentDto } from '../../Attachment/dto/createTaskAttachment.dto.js';

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
}
