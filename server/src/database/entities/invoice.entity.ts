import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Account } from './account.entity';

@Entity()
export class Invoice extends BaseEntity {
  // @@@ Change this to foreign key to strip customer table?
  @Column({ name: 'stripe_customer_id' })
  public stripeCustomerId: string;

  @ManyToOne(type => Account)
  @JoinColumn({ name: 'account_id' })
  public account: Account
}