import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ItemCondition } from './entities/item-condition.entity';
import { ItemConditionsController } from './item-conditions.controller';

@Module({
  controllers: [
    ItemConditionsController
  ],
  imports: [
    TypeOrmModule.forFeature([ItemCondition])
  ]
})
export class ItemConditionsModule {}
