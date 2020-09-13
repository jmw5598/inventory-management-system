import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerModule } from '../logger/logger.module';
import { ProductItem } from '../product-items/entities/product-item.entity';
import { Stockroom } from '../stockrooms/entities/stockroom.entity';
import { StockItem } from './entities/stock-item.entity';
import { StockItemsController } from './controllers/stock-items.controller';
import { StockItemsService } from './services/stock-items.service';

@Module({
  controllers: [
    StockItemsController
  ],
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([
      ProductItem, 
      StockItem, 
      Stockroom
    ])
  ],
  providers: [
    StockItemsService
  ]
})
export class StockItemsModule {}
