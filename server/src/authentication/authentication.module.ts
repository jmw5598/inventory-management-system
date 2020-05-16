import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule, IAuthModuleOptions } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { UsersModule } from '../common/users/users.module';
import { jwtConstants } from './constants';

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
  ]
})
export class AuthenticationModule {}
