import { Controller, UseGuards, Get, Post, Request, Query, Redirect, Body } from '@nestjs/common';
import { AccountsService } from './services/accounts.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { EmailerService } from '../common/services/emailer/emailer.service';
import { RegistrationDto } from './dtos/registration.dto';
import { RegistrationResult } from './dtos/registration-result.dto';

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly _accountsService: AccountsService
   ) {}

  @Post('register')
  public async registerAccount(@Body() registrationDto: RegistrationDto): Promise<RegistrationResult> {
    const result: RegistrationResult = await this._accountsService.registerNewAccount(registrationDto);
    return result;
  }

  @Get('verify')
  @Redirect('https://inv.io', 301)
  public async verifyAccount(
      @Query('code') code: string,
      @Query('redirect') redirect: string): Promise<any> {
    return {
      url: 'https://google.com'// get redirct url from config service
    };
  }
}
