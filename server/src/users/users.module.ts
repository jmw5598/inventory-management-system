import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';

import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role])
  ],
  exports: [
    UsersService
  ],
  providers: [
    UsersService
  ]
})
export class UsersModule {}
