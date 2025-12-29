import { Injectable } from '@nestjs/common';
import { Account } from '../generated/prisma/client.js';
import { PrismaService } from '../service/prisma.service.js';

@Injectable()
export class AccountRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAccountByEmail = async (email: string): Promise<Account> => {
    return this.prisma.account.findUniqueOrThrow({
      where: {
        email,
      },
    });
  };
}
