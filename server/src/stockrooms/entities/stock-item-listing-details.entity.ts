import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { Platform } from '../../platforms/entities/platform.entity';

@Entity({ name: 'stock_item_listing' })
export class StockItemListingDetails extends BaseEntity {
  @Column({ nullable: false, name: 'listed_date' })
  public listedDate: Date;

  @Column({ nullable: false, name: 'listed_price', type: 'numeric' })
  public listedPrice: number;

  @Column({ name: 'listed_quantity' }) 
  public listedQuantity: number;

  @Column({ nullable: true, name: 'sold_date' })
  public soldDate: Date;

  @Column({ name: 'sold_price', type: 'numeric' })
  public soldPrice: number;

  @Column({ name: 'shipping_cost', type: 'numeric' })
  public shippingCost: number;

  @Column({ name: 'additional_fees', type: 'numeric' }) 
  public additionalFees: number;

  @Column({ name: 'external_id' })
  public externalId: string;

  @ManyToOne(type => Platform)
  @JoinColumn({ name: 'platform_id' })
  public platform: Platform;
}
