import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ListedItem } from './entities/listed-item.entity';
import { ListedItemsController } from './listed-items.controller';

@Module({
  controllers: [
    ListedItemsController
  ],
  imports: [
    TypeOrmModule.forFeature([ListedItem])
  ]
})
export class ListedItemsModule {}
