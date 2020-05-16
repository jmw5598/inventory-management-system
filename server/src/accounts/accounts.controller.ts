import { Controller, UseGuards, Get, Post, Request } from '@nestjs/common';
import { AuthenticationService } from '../authentication/authentication.service';
import { LocalAuthenticationGuard } from '../authentication/guards/local-authentication.guard';
import { JwtAuthenticationGuard } from '../authentication/guards/jwt-authentication.guard';
import { UsersService } from '../common/users/users.service';
import { User } from '../database/entities/user.entity';

@Controller('accounts')
export class AccountsController {
  constructor(
    private authenticationService: AuthenticationService,
    private usersService: UsersService
   ) {}

  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  public async login(@Request() req): Promise<any> {
    return this.authenticationService.login(req.user);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('profile')
  public async getProfile(@Request() req) {
    return req.user;
  }

  @Post('register')
  public async registerAccount(@Request() req) {
    const user: User = await this.usersService.create(req.body);
    user.password = "";

    return user;
  }

  //@@@ Verify email endpoint
}
