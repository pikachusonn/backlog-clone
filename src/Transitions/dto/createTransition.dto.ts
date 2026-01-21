import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTransitionDto {
  @IsNotEmpty({ message: 'From task status ID is required' })
  @IsString({ message: 'From task status ID must be a string' })
  fromTaskStatusId: string;
  @IsNotEmpty({ message: 'To task status ID is required' })
  @IsString({ message: 'To task status ID must be a string' })
  toTaskStatusId: string;
  @IsNotEmpty({ message: 'Project ID is required' })
  @IsString({ message: 'Project ID must be a string' })
  projectId: string;
}
