import { Column, Entity, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { Stockroom } from '../../stockrooms/entities/stockroom.entity';
import { Item } from '../../items/entities/item.entity';
import { ItemCondition } from '../../item-conditions/entities/item-condition.entity';
import { Location } from '../../stockrooms/entities/location.entity';
import { StockItemListingDetails } from './stock-item-listing-details.entity';

@Entity({ name: 'stock_item_detail' })
export class StockItemDetails extends BaseEntity {
  @Column({ nullable: false, name: 'purchase_date' })
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

  @ManyToOne(type => Item)
  @JoinColumn({ name: 'item_id' })
  public item: Item;

  @OneToOne(type => StockItemListingDetails)
  @JoinColumn({ name: 'stock_item_listing_detail_id' })
  public listingDetails: StockItemListingDetails;
}