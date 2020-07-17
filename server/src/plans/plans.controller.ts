import { Controller, Get, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Plan } from './entities/plan.entity';
import { JwtAuthenticationGuard } from 'src/authentication/guards/jwt-authentication.guard';

@Controller('plans')
@UseGuards(JwtAuthenticationGuard)
export class PlansController {
  constructor(
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>
  ) {}

  @Get()
  public async getPlans(): Promise<any> {
    return this.planRepository.find();
  }
}
