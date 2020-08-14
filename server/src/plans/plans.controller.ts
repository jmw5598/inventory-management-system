import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Plan } from './entities/plan.entity';

@Controller('plans')
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
