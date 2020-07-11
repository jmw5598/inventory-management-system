import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { brotliCompressSync } from 'zlib';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  public async validateUser(username: string, password: string): Promise<any> {
    const user: User = await this.userService.findByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  public async login(user: User) {
    const roles: string[] = user.roles.map(e => e.name);
    const payload = { username: user.username, sub: user.id, roles: roles, account: user.account.id };
    return {
      access_token: this.jwtService.sign(payload),
      // @@@ TODO : Need to figure out refresh token.
    }
  }
}
