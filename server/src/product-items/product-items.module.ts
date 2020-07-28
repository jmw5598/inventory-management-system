import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductItem } from './entities/product-item.entity'; 
import { ProductItemsController } from './product-items.controller';
import { ProductItemsService } from './product-items.service';

@Module({
  controllers: [
    ProductItemsController
  ],
  imports: [
    TypeOrmModule.forFeature([ProductItem])
  ],
  providers: [ProductItemsService]
})
export class ProductItemsModule {}
