import { Controller, UseGuards, Get, Post, Request } from '@nestjs/common';
import { AuthenticationService } from '../authentication/authentication.service';
import { LocalAuthenticationGuard } from '../authentication/guards/local-authentication.guard';
import { JwtAuthenticationGuard } from '../authentication/guards/jwt-authentication.guard';

@Controller('accounts')
export class AccountsController {
  constructor(private authenticationService: AuthenticationService) {}

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

  @Get('register')
  public async registerAccount(@Request() req) {
    // @@@ create account and send email verification
    return "Registered"
  }

  //@@@ Verify email endpoint
}
