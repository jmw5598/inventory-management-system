import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '../../database/entities/profile.entity';

@Module({
  providers: [
    ProfilesService
  ],
  exports: [
    ProfilesService
  ],
  imports: [
    TypeOrmModule.forFeature([Profile])
  ]
})
export class ProfilesModule {}
