import { Expose } from 'class-transformer';

export class TransitionDto {
  @Expose()
  id: string;
  @Expose()
  fromTaskStatusId: string;
  @Expose()
  toTaskStatusId: string;
}
