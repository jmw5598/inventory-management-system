import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule, IAuthModuleOptions } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';

import { AuthenticationService } from './authentication.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { jwtConstants } from './constants';
import { AuthenticationController } from './authentication.controller';
import { RefreshTokensService } from './services/refresh-tokens.service';
import { RefreshToken } from './entities/refresh-token.entity';

const passportModuleOptions: IAuthModuleOptions = { defaultStrategy: 'jwt' };
const jwtModuleOptions: JwtModuleOptions = {
  secret: jwtConstants.secret,
  signOptions: { expiresIn: '1h' }
}

@Module({
  imports: [
    UsersModule,
    PassportModule.register(passportModuleOptions),
    JwtModule.register(jwtModuleOptions),
    TypeOrmModule.forFeature([RefreshToken])
  ],
  providers: [
    AuthenticationService,
    LocalStrategy,
    JwtStrategy,
    RefreshTokensService
  ],
  exports: [
    AuthenticationService
  ],
  controllers: [AuthenticationController]
})
export class AuthenticationModule {}
