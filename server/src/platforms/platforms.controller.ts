import { Controller, Get, Post, Body, Put, NotFoundException, Param, UseGuards, UseFilters } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Platform } from './entities/platform.entity';
import { CreatePlatformDto } from './dtos/create-platform.dto';
import { JwtAuthenticationGuard } from '../authentication/guards/jwt-authentication.guard';
import { UpdatePlatformDto } from './dtos/update-platform.dto';

@Controller('platforms')
@UseGuards(JwtAuthenticationGuard)
export class PlatformsController {
  constructor(
    @InjectRepository(Platform)
    private readonly platformRepository: Repository<Platform>
  ) {}

  @Get()
  public async getPlatforms(): Promise<any> {
    return this.platformRepository.find();
  }

  // @@@ TODO create guard to only allow Admin user to hit
  // this endpoint.
  @Post()
  public async createPlatforms(@Body() createPlatformDto: CreatePlatformDto): Promise<any> {
    const platform: Platform = this.platformRepository.create({
      description: createPlatformDto.description
    });
    
    return this.platformRepository.save(platform);
  }

  @Get(':id')
  public async getPlatformById(@Param('id') id: number): Promise<any> {
    const platform: Platform = await this.platformRepository.findOne(id);
    
    if (!platform) {
      throw new NotFoundException(`Platform with id ${id} was not found.`);
    }
    
    return platform;
  }

  // @@@ TODO create guard to only allow Admin user to hit
  // this endpoint.
  @Put(':id')
  public async updatePlatform(@Body() updatePlatformDto: UpdatePlatformDto, @Param('id') id: number): Promise<any> {
    const platform = await this.platformRepository.findOne(id);
    
    if (!platform) {
      throw new NotFoundException(`Platform with id ${id} was not found.`);
    }
    
    platform.updatedAt = new Date();
    platform.description = updatePlatformDto.description;
    
    return this.platformRepository.save(platform);
  }
}
