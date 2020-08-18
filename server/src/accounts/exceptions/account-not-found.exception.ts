import { NotFoundException } from '@nestjs/common';

export class AccountNotFoundException extends NotFoundException {
  constructor() {
    super(`Account was not found with the supplied id`);
  }
}
