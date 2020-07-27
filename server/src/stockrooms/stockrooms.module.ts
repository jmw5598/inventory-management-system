import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductItem } from '../product-items/entities/product-item.entity';
import { Location } from './entities/location.entity';
import { Stockroom } from './entities/stockroom.entity';
import { StockroomsController } from './controllers/stockrooms.controller';
import { StockItem } from './entities/stock-item.entity';
import { StockItemListing } from './entities/stock-item-listing.entity';
import { StockroomsService } from './services/stockrooms.service';
import { StockItemsService } from './services/stock-items.service';
import { StockItemsController } from './controllers/stock-items.controller';

@Module({
  controllers: [
    StockroomsController,
    StockItemsController
  ],
  imports: [
    TypeOrmModule.forFeature([
      Stockroom, 
      ProductItem, 
      Location,
      StockItem,
      StockItemListing
    ])
  ],
  providers: [
    StockroomsService, 
    StockItemsService
  ]
})
export class StockroomsModule {}
