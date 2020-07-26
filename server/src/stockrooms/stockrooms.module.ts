import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductItem } from '../product-items/entities/product-item.entity';
import { Location } from './entities/location.entity';
import { Stockroom } from './entities/stockroom.entity';
import { StockroomsController } from './stockrooms.controller';
import { StockItem } from './entities/stock-item.entity';
import { StockItemListing } from './entities/stock-item-listing.entity';
import { StockroomsService } from './stockrooms.service';

@Module({
  controllers: [
    StockroomsController
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
  providers: [StockroomsService]
})
export class StockroomsModule {}
