import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  public constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  public async validateUser(username: string, password: string): Promise<any> {
    const user = await  this.usersService.findOne(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  public async login(user: any) {
    // @@@ Build the JWT payload for the token
    // @@@ Need to look up JWT spec for values?    
    const payload = { username: user.username, sub: user.userId, roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
      // refresh_token: this.
    }
  }
}
