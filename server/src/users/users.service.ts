import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity'; 
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}
  
  public async findByUsername(username: string): Promise<User | undefined> {
    return (await this.usersRepository.find({ 
      where: { username: username },
      take: 1
    }))[0];
  }
}

