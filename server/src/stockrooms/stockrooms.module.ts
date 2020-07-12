import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Item } from '../items/entities/item.entity';
import { Stockroom } from './entities/stockroom.entity';
import { StockroomsController } from './stockrooms.controller';

@Module({
  controllers: [
    StockroomsController
  ],
  imports: [
    TypeOrmModule.forFeature([Stockroom, Item])
  ]
})
export class StockroomsModule {}
