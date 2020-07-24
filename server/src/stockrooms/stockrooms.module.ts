import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Item } from '../items/entities/item.entity';
import { Location } from './entities/location.entity';
import { Stockroom } from './entities/stockroom.entity';
import { StockroomsController } from './stockrooms.controller';
import { StockroomsService } from './stockrooms.service';

@Module({
  controllers: [
    StockroomsController
  ],
  imports: [
    TypeOrmModule.forFeature([
      Stockroom, 
      Item, 
      Location
    ])
  ],
  providers: [StockroomsService]
})
export class StockroomsModule {}
