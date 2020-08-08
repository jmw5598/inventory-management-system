import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { Account } from '../../accounts/entities/account.entity';

@Entity()
export class Plan extends BaseEntity {
  @Column({ nullable: false, unique: true })
  public name: string;

  @OneToMany(type => Account, account => account.plan)
  public accounts: Account[];
}