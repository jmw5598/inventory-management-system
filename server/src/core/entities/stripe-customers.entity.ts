import { Entity, Column, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Account } from './account.entity'

@Entity()
export class StripeCustomer extends BaseEntity {
  @Column({ name: 'stripe_customer_id' })
  public stripeCustomerId: string;

  @OneToOne(type => Account, account => account.stripeCustomer)
  public account: Account;
}