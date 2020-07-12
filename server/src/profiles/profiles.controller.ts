import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { CreateCategoryDto } from 'src/categories/dtos/create-category.dto';
import { EmailerService } from '../common/services/emailer/emailer.service';

@Controller('profiles')
export class ProfilesController {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>
  ) {}

  // @@@ TODO Probably won't needs this?
  @Get()
  public async getProfiles(): Promise<any> {
    return this.profileRepository.find();
  }

  @Post()
  public async createProfile(@Body() createProfileDto: CreateCategoryDto): Promise<any> {

    return {};
  }

  @Get(':id')
  public async getProfileById(@Param('id') id: number): Promise<any> {
    const profile: Profile = await this.profileRepository.findOne(id);

    if (!profile) {
      throw new NotFoundException(`Profile with id ${id} was not found`);
    }



    return profile;
  }
}
