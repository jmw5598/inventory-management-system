import { Entity, Column, JoinColumn, OneToOne, OneToMany, ManyToOne, Generated } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { Profile } from './profile.entity';
import { Plan } from '../../plans/entities/plan.entity';
import { User } from '../../users/entities/user.entity';
import { Invoice } from '../../invoices/entities/invoice.entity';
import { ProductItem } from '../../product-items/entities/product-item.entity'
import { StripeCustomer } from './stripe-customers.entity';
import { Stockroom } from '../../stockrooms/entities/stockroom.entity';

@Entity()
export class Account extends BaseEntity {
  @Column({ name: 'is_confirmed', default: false })
  public isConfirmed: boolean;

  @Column({ name: 'confirmation_token', nullable: false})
  @Generated('uuid')
  public comfirmationToken: string;

  @ManyToOne(type => Plan, plan => plan.accounts, { nullable: false })
  @JoinColumn({ name: 'plan_id' })
  public plan: Plan;

  @OneToOne(type => User, user => user.account)
  public user: User;

  @OneToMany(type => Invoice, invoice => invoice.account)
  public invoices: Invoice[];

  @OneToOne(type => StripeCustomer, cust => cust.account)
  public stripeCustomer: StripeCustomer;

  @OneToMany(type => Stockroom, stockroom => stockroom.account)
  public stockrooms: Stockroom[];

  @OneToMany(type => ProductItem, item => item.account)
  public productItems: ProductItem[];

  @OneToOne(type => Profile, profile => profile.account)
  public profile: Profile;
}