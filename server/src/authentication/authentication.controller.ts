import { Controller, Post, Request, UseGuards, HttpCode, Body } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { AuthenticatedUser } from './models/authenticated-user.model';
import { LocalAuthenticationGuard } from './guards/local-authentication.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService
  ) {}
  
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  @HttpCode(200)
  public async login(@Request() req): Promise<AuthenticatedUser> {
    return this.authService.login(req.user);
  }

  @Post('token')
  @HttpCode(200)
  public async refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<AuthenticatedUser> {
    return this.authService.refreshToken(refreshTokenDto.accessToken, refreshTokenDto.refreshToken);
  }
}
