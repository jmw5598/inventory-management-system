import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity'; 

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}
  
  public async findByUsername(username: string): Promise<User | undefined> {
    return (await this.usersRepository.find({
      relations: ['roles', 'account'],
      where: { username: username },
      take: 1
    }))[0];
  }

  public async findById(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne(id);
  }
}
