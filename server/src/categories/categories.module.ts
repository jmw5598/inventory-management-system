import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CategoriesController } from './categories.controller';

@Module({
  controllers: [
    CategoriesController
  ],
  imports: [
    TypeOrmModule.forFeature([Category])
  ]
})
export class CategoriesModule {}
