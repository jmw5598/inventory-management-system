import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Platform } from './entities/platform.entity';
import { PlatformsController } from './platforms.controller'

@Module({
  controllers: [
    PlatformsController
  ],
  imports: [
    TypeOrmModule.forFeature([Platform])
  ]
})
export class PlatformsModule {}
