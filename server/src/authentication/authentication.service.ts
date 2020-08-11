import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RefreshTokensService } from './services/refresh-tokens.service';
import { User } from '../users/entities/user.entity';
import { RefreshToken } from './entities/refresh-token.entity';
import { AuthenticatedUser } from './models/authenticated-user.model';
import * as bcrypt from 'bcrypt';
import { UserDetails } from './models/user-details.model';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly refreshTokensService: RefreshTokensService,
  ) {}

  public async validateUser(username: string, password: string): Promise<any> {
    const user: User = await this.userService.findByUsername(username);
    if (user && await bcrypt.compare(password, user.password) && user.account.isConfirmed) {
      const { password, resetToken, ...result } = user;
      return result;
    }
    return null;
  }

  public async login(user: User): Promise<AuthenticatedUser> {
    return this._generateAuthenticatedUser(user);
  }

  public async refreshToken(accessToken: string, refreshToken: string): Promise<AuthenticatedUser> {
    const tokenPayload: any = this.jwtService.decode(accessToken);
    const tokenInDb: RefreshToken = await this.refreshTokensService.findByRefreshTokenAndUserId(refreshToken, tokenPayload.sub);
    const user: User = await this.userService.findByUsername(tokenPayload.username);

    if (!tokenInDb || !user || tokenInDb.isBlacklisted) { 
      throw new BadRequestException('Unable to refresh token');
    }

    return this._generateAuthenticatedUser(user);
  }

  private async _generateAuthenticatedUser(user: User): Promise<AuthenticatedUser> {
    const expiresIn: string = '1h';
    return {
      accessToken: await this._getAccessToken(user, expiresIn),
      refreshToken: await this._getRefreshToken(user),
      prefix: 'Bearer',
      expiresIn: expiresIn,
      userDetails: await this._getUserDetails(user)
    } as AuthenticatedUser;
  }

  private async _getAccessToken(user: User, expiresIn: string): Promise<string> {
    const roles: string[] = user.roles.map(e => e.name);
    const payload = { 
      username: user.username, 
      sub: user.id, 
      roles: roles, 
      account: user.account.id
    };
    return this.jwtService.sign(payload, { expiresIn: expiresIn });
  }
  
  private async _getRefreshToken(user: User): Promise<string> {
    let refreshToken: RefreshToken = await this.refreshTokensService.findNonBlacklistedByUserId(user.id);
    if (!refreshToken) {
      refreshToken = await this.refreshTokensService.createNewRefreshToken(user.id);
    }
    return refreshToken.refreshToken;
  }

  private async _getUserDetails(user: User): Promise<UserDetails> {
    const roles: string[] = user.roles.map(e => e.name);
    return {
      id: user.id,
      username: user.username,
      roles: roles
    } as UserDetails
  }
}
