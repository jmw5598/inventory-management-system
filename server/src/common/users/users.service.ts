import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { User } from '../../database/entities/user.entity';

@Injectable()
export class UsersService {
  public constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  public async create(user: User): Promise<User | undefined> {
    user.password = await bcrypt.hash(user.password, 10);
    console.log(user);
    const newUser: User = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  public async findOne(username: string): Promise<User | undefined> {
    //return this.users.find(user => user.username === username);
    return null;
  }
}
