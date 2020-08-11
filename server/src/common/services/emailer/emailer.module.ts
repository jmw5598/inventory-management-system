import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailerService } from './emailer.service';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  providers: [
    EmailerService
  ],
  imports: [
    MailerModule.forRoot({
      transport: `smtps://${process.env.MAIL_USERNAME}:${process.env.MAIL_PASSWORD}@${process.env.MAIL_URL}:${process.env.MAIL_PORT}`,
      defaults: {
        from:'"no-reply" <noreply.invmnt@gmail.com>',
      },
    })    
  ],
  exports: [
    EmailerService
  ]
})
export class EmailerModule {}
