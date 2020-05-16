import { Entity, Column, ManyToMany, JoinTable, BeforeInsert, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Role } from './role.entity';
import { Account } from './account.entity';

@Entity({ name: 'app_user' })
export class User extends BaseEntity {
  @Column({ nullable: false, unique: true })
  public username: string;

  @Column({ nullable: false })
  public password: string;

  @Column({ name: 'is_active', default: true })
  public isActive: boolean;

  @ManyToMany(type => Role)
  @JoinTable({ name: 'user_role'})
  public roles: Role[];

  @OneToOne(type => Account)
  @JoinColumn({ name: 'account_id' })
  public account: Account;
}