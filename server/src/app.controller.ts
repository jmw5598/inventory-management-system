import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { AuthenticationService } from './authentication/authentication.service';

import { Role } from './core/entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller()
export class AppController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authenticationService: AuthenticationService, 
    private readonly appService: AppService,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) {}

  @Get()
  async getHello(): Promise<any> {
    return this.roleRepository.find();
  }
}
