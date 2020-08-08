import { Entity, Column, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { Address } from './address.entity';
import { Account } from './account.entity';

@Entity()
export class Profile extends BaseEntity {
  @Column({ name: 'first_name', nullable: false })
  public firstName: string;

  @Column({ name: 'last_name', nullable: false })
  public lastName: string;

  @Column({ nullable: false })
  public email: string;

  @OneToOne(type => Address, address => address.profile, { nullable: false })
  @JoinColumn({ name: 'address_id' })
  public address: Address;

  @OneToOne(type => Account, account => account.profile, { nullable: false })
  @JoinColumn({ name: 'account_id' })
  public account: Account;
}