import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { Category } from '../../categories/entities/category.entity';
import { StockItem } from '../../stock-items/entities/stock-item.entity'
import { Account } from 'src/accounts/entities/account.entity';

@Entity({ name: 'product_item' })
export class ProductItem extends BaseEntity {
  @Column({ nullable: false })
  public title: string;

  @Column({ nullable: false })
  public description: string;

  @Column({ nullable: true })
  public sku: string;

  @Column({ nullable: true })
  public make: string;

  @Column({ nullable: true })
  public model: string;

  @ManyToOne(type => Category)
  @JoinColumn({ name: 'category_id' })
  public category: Category;

  @OneToMany(type => StockItem, item => item.stockroom)
  public stockItems: StockItem[];

  @Column({ name: 'account_id', nullable: false })
  public accountId: number;

  @ManyToOne(type => Account)
  @JoinColumn({ name: 'account_id' })
  public account: Account;
}