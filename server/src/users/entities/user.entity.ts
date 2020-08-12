import { Entity, Column, ManyToMany, JoinTable, BeforeInsert, OneToOne, JoinColumn, OneToMany, Generated } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { Role } from './role.entity';
import { Account } from '../../accounts/entities/account.entity';
import { Profile } from '../../accounts/entities/profile.entity';
import { RefreshToken } from '../../authentication/entities/refresh-token.entity';

import * as bcrypt from 'bcrypt';

@Entity({ name: 'app_user' })
export class User extends BaseEntity {
  @Column({ nullable: false, unique: true })
  public username: string;

  @Column({ nullable: false })
  public password: string;

  @Column({ name: 'reset_token', nullable: false })
  @Generated('uuid')
  public resetToken: string;

  @Column({ name: 'reset_token_expiration', nullable: false, type: 'timestamp with time zone' })
  public resetTokenExpiration: Date;

  @ManyToMany(type => Role, role => role.users)
  @JoinTable({ name: 'user_role'})
  public roles: Role[];

  @OneToOne(type => Account, { nullable: false })
  @JoinColumn({ name: 'account_id' })
  public account: Account;

  @OneToMany(type => RefreshToken, token => token.id)
  public refreshTokens: RefreshToken[];
}