import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountsModule } from './accounts/accounts.module';
import { AuthenticationModule } from './authentication/authentication.module'
import { CategoriesModule } from './categories/categories.module';
import { ItemConditionsModule } from './item-conditions/item-conditions.module';
import { PlatformsModule } from './platforms/platforms.module';
import { StockroomsModule } from './stockrooms/stockrooms.module';
import { UsersModule } from './users/users.module';
import { ProductItemsModule } from './product-items/product-items.module';
import { InvoicesModule } from './invoices/invoices.module';
import { ListedItemsModule } from './listed-items/listed-items.module';
import { PlansModule } from './plans/plans.module';
import { StockItemsModule } from './stock-items/stock-items.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    AccountsModule,
    AuthenticationModule,
    CategoriesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ItemConditionsModule,
    PlatformsModule,
    StockroomsModule,
    TypeOrmModule.forRoot(),
    UsersModule,
    ProductItemsModule,
    InvoicesModule,
    ListedItemsModule,
    PlansModule,
    StockItemsModule,
    LoggerModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
