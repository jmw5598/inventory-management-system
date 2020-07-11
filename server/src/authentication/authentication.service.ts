import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { brotliCompressSync } from 'zlib';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UsersService 
  ) {}

  public async validateUser(username: string, password: string): Promise<any> {
    const user: User = await this.userService.findByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
