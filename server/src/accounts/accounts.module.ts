import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';

import { AuthenticationModule } from '../authentication/authentication.module';
import { UsersModule } from '../common/users/users.module';

@Module({
  controllers: [AccountsController],
  imports: [AuthenticationModule, UsersModule]
})
export class AccountsModule {}
