import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskStatusDto {
  @IsString({ message: 'Status name must be a string' })
  @IsNotEmpty({ message: 'Status name is required' })
  text: string;
  @IsString({ message: 'Color must be a string' })
  @IsNotEmpty({ message: 'Color is required' })
  color: string;
}
