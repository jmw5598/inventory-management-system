import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { Account } from '../../accounts/entities/account.entity';

@Entity()
export class Invoice extends BaseEntity {
  // @@@ Change this to foreign key to strip customer table?
  @Column({ name: 'stripe_customer_id' })
  public stripeCustomerId: string;

  @ManyToOne(type => Account, { nullable: false })
  @JoinColumn({ name: 'account_id' })
  public account: Account
}