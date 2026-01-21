import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskAttachmentDto {
  @IsOptional()
  @IsString({ message: 'ID must be a string' })
  id?: string;
  @IsString({ message: 'File name must be a string' })
  @IsNotEmpty({ message: 'File name is required' })
  fileName: string;
  @IsString({ message: 'File URL must be a string' })
  @IsNotEmpty({ message: 'File URL is required' })
  fileUrl: string;
  @IsString({ message: 'File type must be a string' })
  @IsNotEmpty({ message: 'File type is required' })
  fileType: string;
}
