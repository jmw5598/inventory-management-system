import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductItem } from './entities/product-item.entity'; 
import { ProductItemsController } from './product-items.controller';

@Module({
  controllers: [
    ProductItemsController
  ],
  imports: [
    TypeOrmModule.forFeature([ProductItem])
  ]
})
export class ProductItemsModule {}
