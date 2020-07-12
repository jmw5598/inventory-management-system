import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Item } from './entities/item.entity'; 
import { ItemsController } from './items.controller';

@Module({
  controllers: [
    ItemsController
  ],
  imports: [
    TypeOrmModule.forFeature([Item])
  ]
})
export class ItemsModule {}
