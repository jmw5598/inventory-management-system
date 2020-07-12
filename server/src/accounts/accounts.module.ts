import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Account } from './entities/account.entity';
import { AccountsController } from './accounts.controller';
import { AuthenticationModule } from '../authentication/authentication.module';
import { EmailerModule } from '../common/services/emailer/emailer.module';
import { Plan } from './entities/plan.entity';
import { StripeCustomer } from './entities/stripe-customers.entity';

@Module({
  controllers: [
    AccountsController
  ],
  imports: [
    AuthenticationModule,
    EmailerModule,
    TypeOrmModule.forFeature([
      Account, 
      Plan,
      StripeCustomer
    ])
  ],
  providers: []
})
export class AccountsModule {}
