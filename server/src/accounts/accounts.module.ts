import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Account } from './entities/account.entity';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './services/accounts.service';
import { Address } from './entities/address.entity';
import { AuthenticationModule } from '../authentication/authentication.module';
import { EmailerModule } from '../common/services/emailer/emailer.module';
import { Plan } from '../plans/entities/plan.entity';
import { Profile } from './entities/profile.entity';
import { Role } from '../users/entities/role.entity';
import { StripeCustomer } from './entities/stripe-customers.entity';
import { User } from '../users/entities/user.entity';

@Module({
  controllers: [
    AccountsController
  ],
  imports: [
    AuthenticationModule,
    EmailerModule,
    TypeOrmModule.forFeature([
      Account,
      Address,
      Profile,
      Role,
      StripeCustomer,
      User
    ])
  ],
  providers: [
    AccountsService
  ]
})
export class AccountsModule {}
