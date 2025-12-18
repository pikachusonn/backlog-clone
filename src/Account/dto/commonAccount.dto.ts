import { Expose } from 'class-transformer';

export class CommonAccountDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  createdAt: Date;

  @Expose()
  avatar: string;

  constructor(partial: Partial<CommonAccountDto>) {
    Object.assign(this, partial);
  }
}
