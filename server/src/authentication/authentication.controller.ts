import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthenticationGuard } from './guards/local-authentication.guard';

@Controller('auth')
export class AuthenticationController {
  constructor() {}
  
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  public async login(@Request() req): Promise<any> {
    return req.user;
  }
}
