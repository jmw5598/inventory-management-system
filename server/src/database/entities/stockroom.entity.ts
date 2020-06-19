import { Column, Entity, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Account } from './account.entity';
import { Item } from './item.entity';

@Entity()
export class Stockroom extends BaseEntity {
  @Column({ nullable: false })
  public name: string;

  @Column({ nullable: false })
  public description: string;

  // Account it belongs to.....
  @ManyToOne(type => Account)
  @JoinColumn({ name: 'account_id' })
  public account: Account;

  @OneToMany(type => Item, item => item.stockroom)
  public stockItems: Item[];
}
