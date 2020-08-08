import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { Account } from './account.entity'

@Entity()
export class StripeCustomer extends BaseEntity {
  @Column({ name: 'stripe_customer_id' })
  public stripeCustomerId: string;

  @OneToOne(type => Account, account => account.stripeCustomer)
  @JoinColumn({ name: 'account_id' })
  public account: Account;
}