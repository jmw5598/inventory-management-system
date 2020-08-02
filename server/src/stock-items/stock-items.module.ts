import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StockItem } from './entities/stock-item.entity';
import { StockItemsController } from './controllers/stock-items.controller';
import { StockItemsService } from './services/stock-items.service';

@Module({
  controllers: [
    StockItemsController
  ],
  imports: [
    TypeOrmModule.forFeature([StockItem])
  ],
  providers: [
    StockItemsService
  ]
})
export class StockItemsModule {}
