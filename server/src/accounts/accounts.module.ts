import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';

import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
  controllers: [AccountsController],
  imports: [AuthenticationModule]
})
export class AccountsModule {}
