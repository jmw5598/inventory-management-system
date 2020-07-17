import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Plan } from './entities/plan.entity';
import { PlansController } from './plans.controller';

@Module({
  controllers: [
    PlansController
  ],
  imports: [
    TypeOrmModule.forFeature([Plan])
  ]
})
export class PlansModule {}
