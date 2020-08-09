import { Controller, UseGuards, Get, Post, Request, Query, Redirect, Body, Head, Response, HttpCode, NotFoundException } from '@nestjs/common';
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

  @Head('validate/email')
  public async validateEmail(
      @Request() req, 
      @Response() res, 
      @Query('email') email: string): Promise<void> {
    if (!await this._accountsService.doesEmailExist(email)) {
      throw new NotFoundException(`Email, ${email}, doesn't exist`);
    }
    return res.status(204).send();
  }

  @Head('validate/username')
  public async validateUsername(
      @Request() req,
      @Response() res,
      @Query('username') username: string): Promise<void> {
    if (!await this._accountsService.doesUsernameExist(username)) {
      throw new NotFoundException(`Username, ${username}, doesn't exist`);
    }
    return res.status(204).send();
  }
}
