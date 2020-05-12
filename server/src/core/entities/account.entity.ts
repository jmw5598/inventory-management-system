import { Entity, Column, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Plan } from './plan.entity';
import { User } from './user.entity';
import { Invoice } from './invoice.entity';
import { StripeCustomer } from './stripe-customers.entity';

@Entity()
export class Account extends BaseEntity {
  @Column({ nullable: false })
  public email: string;

  @Column({ name: 'is_confirmed', default: false })
  public isConfirmed: boolean;

  // @@@ this should be UUID?
  @Column({ name: 'confirmation_token', nullable: false })
  public comfirmationToken: string;

  // @@@ Create billing address entity ???

  @OneToOne(type => Plan)
  public plan: Plan;

  @OneToOne(type => User, user => user.account)
  public user: User;

  @OneToMany(type => Invoice, invoice => invoice.account)
  public invoices: Invoice[];

  @OneToOne(type => StripeCustomer)
  @JoinColumn({ name: 'stripe_customer_id' })
  public stripeCustomer: StripeCustomer;
}