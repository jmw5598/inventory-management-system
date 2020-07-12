import { Controller, UseGuards, Get, Post, Request, Query, Redirect, Body } from '@nestjs/common';
import { AuthenticationService } from '../authentication/authentication.service';
import { EmailerService } from '../common/services/emailer/emailer.service';
import { CreateAccountDto } from './dtos/create-account.dto';
import { RegistrationDto } from './dtos/registration.dto';

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly emailerService: EmailerService,
   ) {}

  @Post('register')
  public async registerAccount(@Body() registrationDto: RegistrationDto) {
    return null;
  }

  @Get('verify')
  @Redirect('https://nestjs.com', 301)
  public async verifyAccount(@Query('code') code: string): Promise<any> {
    return null;
  }
}
