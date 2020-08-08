import { Entity, Column, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { User } from './user.entity';

@Entity()
export class Role extends BaseEntity {
  @Column({ nullable: false, unique: true })
  public name: string

  @ManyToMany(type => User, user => user.roles)
  public users: User[];
}