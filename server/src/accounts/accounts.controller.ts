import { Controller, UseGuards, Get, Post, Request, Query, Redirect, Body, Head, Response, HttpCode, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { AccountsService } from './services/accounts.service';
import { RegistrationDto } from './dtos/registration.dto';
import { RegistrationResult } from './dtos/registration-result.dto';
import { PasswordResetDto } from './dtos/password-reset.dto';
import { PasswordRequestResetDto } from './dtos/password-request-reset.dto';
import { ResponseMessage } from '../common/models/response-message.model';
import { ResponseStatus } from '../common/enums/response-status.enum';
import { ConfigService } from '@nestjs/config';

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly _accountsService: AccountsService,
    private readonly _configService: ConfigService
  ) {}

  @Post('register')
  public async registerAccount(@Body() registrationDto: RegistrationDto): Promise<RegistrationResult> {
    const result: RegistrationResult = await this._accountsService.registerNewAccount(registrationDto);
    return result;
  }

  @Get('verify')
  @Redirect('https://inv.io', 301)
  public async verifyAccount(@Query('code') code: string): Promise<any> {
    const response: ResponseMessage = await this._accountsService.confirmAccount(code);
    const redirect: string = this._configService.get('MAIL_CONFIRMATION_REDIRECT_URL');
    return {
      url: `${redirect}?message=${encodeURI(response.message)}`
    };
  }

  @Post('password-request')
  public async passwordResetRequest(
      @Body() passwordRequestDto: PasswordRequestResetDto): Promise<ResponseMessage> {
    return this._accountsService.passwordRequestReset(passwordRequestDto.email);
  }

  @Post('password-reset')
  public async passwordReset(@Body() passwordResetDto: PasswordResetDto): Promise<ResponseMessage> {
    if (passwordResetDto.password !== passwordResetDto.passwordConfirm)
      throw new UnprocessableEntityException(`Password and confirmation password must match`);
    return this._accountsService
      .passwordResetFromResetToken(passwordResetDto.password, passwordResetDto.code)
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
