import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailerService {
  constructor(
    private readonly mailerService: MailerService
  ) {}

  public async sendConfirmationEmail(email: string, code: string): Promise<any> {
    const emailTemplate: string = await this.generateConfirmationEmailTemplate(code);
    this.mailerService
      .sendMail({
        to: email,
        subject: 'Confirm your email address for your new Invmnt account!',
        html: emailTemplate,
      }).catch(error => console.log(error));
  }

  private async generateConfirmationEmailTemplate(code: string): Promise<string> {
    return `
      <h1>Welcome</h1>
      <p>Please follow the link below to confirm your email address</p>
      <p><a href="http://localhost:3000/accounts/verify?code=${code}">Click here to confirm your email address</a></p>
    `
  }
}
