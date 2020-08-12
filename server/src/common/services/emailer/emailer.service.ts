import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailerService {
  constructor(
    private readonly _mailerService: MailerService,
    private readonly _configService: ConfigService
  ) {}

  public async sendConfirmationEmail(email: string, code: string): Promise<any> {
    const emailTemplate: string = await this.generateConfirmationEmailTemplate(code);
    this._mailerService
      .sendMail({
        to: email,
        subject: 'Confirm your email address for your new Invmnt account!',
        html: emailTemplate,
      })
  }

  public async sendPasswordResetEmail(email: string, code: string): Promise<any> {
    const emailTemplate: string = await this.generatePasswordResetEmailTemplate(code);
    this._mailerService
      .sendMail({
        to: email,
        subject: 'Password Reset Request!',
        html: emailTemplate,
      })
  }

  private async generateConfirmationEmailTemplate(code: string): Promise<string> {
    const baseUrl: string = this._configService.get('MAIL_CONFIRMATION_API_URL');
    return `
      <h1>Welcome</h1>
      <p>Please follow the link below to confirm your email address</p>
      <p><a href="${baseUrl}?code=${code}">Click here to confirm your email address</a></p>
    `
  }

  private async generatePasswordResetEmailTemplate(code: string): Promise<string> {
    const baseUrl: string = this._configService.get('MAIL_PASSWORD_RESET_URL');
    return `
      <h1>Password Reset Request</h1>
      <p>Please follow the link below to reset your password</p>
      <p><a href="${baseUrl}?code=${code}">Click here to reset your password</a></p>
    `
  }
}
