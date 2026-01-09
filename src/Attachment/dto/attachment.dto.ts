import { Expose } from 'class-transformer';

export class AttachmentDto {
  @Expose()
  id: string;
  @Expose()
  fileName: string;
  @Expose()
  fileUrl: string;
  @Expose()
  fileType: string;
  @Expose()
  createdAt: Date;

  constructor(partial: Partial<AttachmentDto>) {
    Object.assign(this, partial);
  }
}
