import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { Platform } from '../../platforms/entities/platform.entity';

@Entity()
export class ListedItem extends BaseEntity {
  @Column({ nullable: false, name: 'listed_date' })
  public listedDate: Date;

  @Column({ nullable: false, name: 'listed_price' })
  public listedPrice: number;

  @Column({ nullable: true, name: 'sold_date' })
  public soldDate: Date;

  @Column({ name: 'sold_price'})
  public soldPrice: number;

  @Column({ name: 'shipping_cost' })
  public shippingCost: number;

  @Column({ name: 'additional_fees' }) 
  public additionalFees: number;

  @Column({ name: 'quantity' }) 
  public quantity: number;

  @Column({ name: 'external_id' })
  public externalId: string;

  @ManyToOne(type => Platform)
  @JoinColumn({ name: 'platform_id' })
  public platform: Platform;
}