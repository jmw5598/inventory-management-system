import { Column, Entity, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { Account } from '../../accounts/entities/account.entity';
import { Location } from './location.entity';
import { StockItem } from '../../stock-items/entities/stock-item.entity';

@Entity()
export class Stockroom extends BaseEntity {
  @Column({ nullable: false })
  public name: string;

  @Column({ nullable: false })
  public description: string;

  @ManyToOne(type => Account, { nullable: false })
  @JoinColumn({ name: 'account_id' })
  public account: Account;

  @OneToMany(type => StockItem, item => item.stockroom)
  public stockItems: StockItem[];

  @OneToMany(type => Location, location => location.stockroom)
  public locations: Location[];
}
