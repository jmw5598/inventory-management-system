import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn : '60s' }
    })
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
