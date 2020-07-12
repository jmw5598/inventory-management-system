import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountsModule } from './accounts/accounts.module';
import { AuthenticationModule } from './authentication/authentication.module'
import { CategoriesModule } from './categories/categories.module';
import { ItemConditionsModule } from './item-conditions/item-conditions.module';
import { PlatformsModule } from './platforms/platforms.module';
import { ProfilesModule } from './profiles/profiles.module';
import { StockroomsModule } from './stockrooms/stockrooms.module';
import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';
import { InvoicesModule } from './invoices/invoices.module';
import { ListedItemsModule } from './listed-items/listed-items.module';

@Module({
  imports: [
    AccountsModule,
    AuthenticationModule,
    CategoriesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ItemConditionsModule,
    PlatformsModule,
    ProfilesModule,
    StockroomsModule,
    TypeOrmModule.forRoot(),
    UsersModule,
    ItemsModule,
    InvoicesModule,
    ListedItemsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
