import { Controller, Get, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Platform } from '../database/entities/platform.entity';

@Controller('platforms')
export class PlatformsController {
  constructor(
    @InjectRepository(Platform)
    private readonly platformRepository: Repository<Platform>
  ) {}

  @Get()
  public async getPlatforms(): Promise<any> {
    return this.platformRepository.find();
  }

  @Post()
  public async createPlatforms(): Promise<any> {
    return {};
  }
}
