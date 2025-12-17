import { Expose } from 'class-transformer';

export class CreatedByAccountDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  createdAt: Date;

  @Expose()
  avatar: string;

  constructor(partial: Partial<CreatedByAccountDto>) {
    Object.assign(this, partial);
  }
}
