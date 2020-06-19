import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stockroom } from '../database/entities/stockroom.entity';
import { Item } from '../database/entities/item.entity';
import { StockroomsController } from './stockrooms.controller';

@Module({
  controllers: [StockroomsController],
  imports: [TypeOrmModule.forFeature([Stockroom, Item])]
})
export class StockroomsModule {}
