import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductItem } from '../product-items/entities/product-item.entity';
import { Location } from './entities/location.entity';
import { Stockroom } from './entities/stockroom.entity';
import { StockroomsController } from './controllers/stockrooms.controller';
import { StockroomsService } from './services/stockrooms.service';
import { StockItem } from '../stock-items/entities/stock-item.entity';

@Module({
  controllers: [
    StockroomsController,
  ],
  imports: [
    TypeOrmModule.forFeature([
      Stockroom, 
      ProductItem, 
      Location,
      StockItem,
    ])
  ],
  providers: [
    StockroomsService,
  ]
})
export class StockroomsModule {}
