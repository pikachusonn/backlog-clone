import { Injectable } from '@nestjs/common';
import { AccountRepository } from './account.repository.js';
import { Account } from 'src/generated/prisma/client.js';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}
  findAccountByEmail = async (email: string): Promise<Account> => {
    return this.accountRepository.findAccountByEmail(email);
  };
}
