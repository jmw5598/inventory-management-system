import { Entity, Column, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { Plan } from '../../plans/entities/plan.entity';
import { User } from '../../users/entities/user.entity';
import { Invoice } from '../../invoices/entities/invoice.entity';
import { ProductItem } from '../../product-items/entities/product-item.entity'
import { StripeCustomer } from './stripe-customers.entity';
import { Stockroom } from '../../stockrooms/entities/stockroom.entity';

@Entity()
export class Account extends BaseEntity {
  @Column({ nullable: false })
  public email: string;

  @Column({ name: 'is_confirmed', default: false })
  public isConfirmed: boolean;

  @Column({ name: 'confirmation_token', nullable: false, type: 'uuid', default: 'uuid_generate_v4()'})
  public comfirmationToken: string;

  @OneToOne(type => Plan)
  public plan: Plan;

  @OneToOne(type => User, user => user.account)
  public user: User;

  @OneToMany(type => Invoice, invoice => invoice.account)
  public invoices: Invoice[];

  @OneToOne(type => StripeCustomer)
  @JoinColumn({ name: 'stripe_customer_id' })
  public stripeCustomer: StripeCustomer;

  @OneToMany(type => Stockroom, stockroom => stockroom.account)
  public stockrooms: Stockroom[];

  @OneToMany(type => ProductItem, item => item.account)
  public productItems: ProductItem[];
}