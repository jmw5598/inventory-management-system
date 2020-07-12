import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Profile } from './entities/profile.entity';
import { ProfilesController } from './profiles.controller';

@Module({
  controllers: [
    ProfilesController
  ],
  imports: [
    TypeOrmModule.forFeature([Profile])
  ]
})
export class ProfilesModule {}
