import { Controller, Post, Request, UseGuards, HttpCode } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LocalAuthenticationGuard } from './guards/local-authentication.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService
  ) {}
  
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  @HttpCode(200)
  public async login(@Request() req): Promise<any> {
    return this.authService.login(req.user);
  }
}
