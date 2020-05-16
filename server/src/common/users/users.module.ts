import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../database/entities/user.entity';

@Module({
  providers: [
    UsersService
  ],
  exports: [
    UsersService
  ],
  imports: [
    TypeOrmModule.forFeature([User]),
  ]
})
export class UsersModule {}
