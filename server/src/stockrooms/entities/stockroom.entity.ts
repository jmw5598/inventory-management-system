import { Column, Entity, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { Account } from '../../accounts/entities/account.entity';
import { Item } from '../../items/entities/item.entity';
import { Location } from './location.entity';

@Entity()
export class Stockroom extends BaseEntity {
  @Column({ nullable: false })
  public name: string;

  @Column({ nullable: false })
  public description: string;

  @ManyToOne(type => Account)
  @JoinColumn({ name: 'account_id' })
  public account: Account;

  @OneToMany(type => Item, item => item.stockroom)
  public stockItems: Item[];

  // @@@ TODO Create locations of all locations associated with this tockroom?
  @OneToMany(type => Location, location => location.stockroom)
  public locations: Location[];

  //@@@ TODO create stock item detail
  // which refreneces item (items are the general product items that will be reusable).
  // stock item will have foreign key to listed item with listing details.
  // the above stockItems will be a StockItem[]
}
