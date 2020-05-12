import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  public constructor() {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme',
        roles: ['ROLE_USER', 'ROLE_ADMIN']
      },
      {
        userId: 2,
        username: 'chris',
        password: 'secret',
        roles: ['ROLE_USER', 'ROLE_ADMIN']
      },
      {
        userId: 3,
        username: 'maria',
        password: 'guess',
        roles: ['ROLE_USER']
      },
    ];
  }

  public async findOne(username: string): Promise<User | undefined>{
    return this.users.find(user => user.username === username);
  }
}
