import { Module } from '@nestjs/common';
import { AccountRepository } from './account.repository.js';
import { PrismaService } from '../service/prisma.service.js';
import { AccountService } from './account.service.js';

@Module({
  imports: [],
  providers: [AccountRepository, PrismaService, AccountService],
  exports: [AccountService],
})
export class AccountModule {}
