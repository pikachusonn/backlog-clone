import { Expose } from 'class-transformer';
import { StatusTransition } from 'src/generated/prisma/client.js';

export class TaskStatusDto {
  @Expose()
  id: string;
  @Expose()
  text: string;
  @Expose()
  color: string;
  @Expose()
  isDefault: boolean;
  @Expose()
  isDoneStatus: boolean;
  @Expose()
  isEntryPoint: boolean;
  @Expose()
  statusOrder: number;
  @Expose()
  transitionsTo: StatusTransition[];
}
