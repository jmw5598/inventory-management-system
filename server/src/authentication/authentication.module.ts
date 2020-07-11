import { Module } from '@nestjs/common';
import { PassportModule, IAuthModuleOptions } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';

import { AuthenticationService } from './authentication.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { jwtConstants } from './constants';
import { AuthenticationController } from './authentication.controller';

const passportModuleOptions: IAuthModuleOptions = { defaultStrategy: 'jwt' };
const jwtModuleOptions: JwtModuleOptions = {
  secret: jwtConstants.secret,
  signOptions: { expiresIn: '60s' }
}

@Module({
  imports: [
    UsersModule,
    PassportModule.register(passportModuleOptions),
    JwtModule.register(jwtModuleOptions)
  ],
  providers: [
    AuthenticationService,
    LocalStrategy,
    JwtStrategy
  ],
  exports: [
    AuthenticationService
  ],
  controllers: [AuthenticationController]
})
export class AuthenticationModule {}
