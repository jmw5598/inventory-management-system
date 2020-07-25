import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { Category } from '../../categories/entities/category.entity';
import { StockItemDetails } from '../../stockrooms/entities/stock-item-details.entity'

@Entity()
export class Item extends BaseEntity {
  @Column({ nullable: false })
  public name: string;

  @Column({ nullable: false })
  public description: string;

  @Column({ nullable: false })
  public sku: string;

  @Column({ nullable: true })
  public brand: string;

  @Column({ nullable: true })
  public model: string;

  @ManyToOne(type => Category)
  @JoinColumn({ name: 'category_id' })
  public category: Category;

  @OneToMany(type => StockItemDetails, item => item.stockroom)
  public stockItems: StockItemDetails[];
}