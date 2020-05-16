import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { AuthenticationService } from './authentication/authentication.service';

import { Role } from './database/entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller()
export class AppController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authenticationService: AuthenticationService, 
    private readonly appService: AppService,
  ) {}

  @Get()
  async getHello(): Promise<any> {
    return "Hello";
  }
}
