import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module'
import { AccountsModule } from './accounts/accounts.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Role } from './database/entities/role.entity';
import { User } from './database/entities/user.entity';
import { ProfilesModule } from './common/profiles/profiles.module';
import { StockroomsModule } from './stockrooms/stockrooms.module';
import { PlatformsModule } from './platforms/platforms.module';

@Module({
  imports: [
    AccountsModule,
    AuthenticationModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([Role, User]),
    ProfilesModule,
    StockroomsModule,
    PlatformsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
