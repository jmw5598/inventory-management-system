import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/database/entities/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfilesService {
  public constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>
  ) {}

  public async create(profile: Profile): Promise<Profile | undefined> {
    return this.profileRepository.save({});
  }

  public async findById(id: number): Promise<Profile | undefined> {
    // return this.profileRepository.find()
    return null;
  }
}
