import { Column, Entity, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { Stockroom } from '../../stockrooms/entities/stockroom.entity';
import { ProductItem } from '../../product-items/entities/product-item.entity';
import { ItemCondition } from '../../item-conditions/entities/item-condition.entity';
import { Location } from '../../stockrooms/entities/location.entity';
import { StockItemListing } from './stock-item-listing.entity';

@Entity({ name: 'stock_item' })
export class StockItem extends BaseEntity {
  @Column({ nullable: false, name: 'purchase_date', type: 'timestamp with time zone' })
  public purchaseDate: Date;

  @Column({ nullable: false, name: 'purchase_price', type: 'numeric' })
  public purchasePrice: number;

  @Column({ nullable: false, type: 'integer', default: 1 })
  public quantity: number;

  @ManyToOne(type => ItemCondition)
  @JoinColumn({ name: 'item_condition_id'})
  public itemCondition: ItemCondition;

  @ManyToOne(type => Stockroom)
  @JoinColumn({ name: 'stockroom_id' })
  public stockroom: Stockroom;

  @ManyToOne(type => Location)
  @JoinColumn({ name: 'location_id' })
  public location: Location;

  @ManyToOne(type => ProductItem)
  @JoinColumn({ name: 'item_id' })
  public item: ProductItem;

  @OneToOne(type => StockItemListing)
  @JoinColumn({ name: 'stock_item_listing_id' })
  public listingDetails: StockItemListing;
}