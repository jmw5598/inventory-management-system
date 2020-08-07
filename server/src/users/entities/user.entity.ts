import { Entity, Column, ManyToMany, JoinTable, BeforeInsert, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { Role } from './role.entity';
import { Account } from '../../accounts/entities/account.entity';
import { Profile } from '../../profiles/entities/profile.entity';
import { RefreshToken } from '../../authentication/entities/refresh-token.entity';

@Entity({ name: 'app_user' })
export class User extends BaseEntity {
  @Column({ nullable: false, unique: true })
  public username: string;

  @Column({ nullable: false })
  public password: string;

  @ManyToMany(type => Role)
  @JoinTable({ name: 'user_role'})
  public roles: Role[];

  @OneToOne(type => Account, { nullable: false })
  @JoinColumn({ name: 'account_id' })
  public account: Account;

  @OneToOne(type => Profile, { nullable: false })
  @JoinColumn({ name: 'profile_id' })
  public profile: Profile;

  @OneToMany(type => RefreshToken, token => token.id)
  public refreshTokens: RefreshToken[];
}