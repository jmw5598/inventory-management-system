import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Stockroom } from './stockroom.entity';
import { ItemCondition } from './item-condition.entity';

@Entity()
export class Item extends BaseEntity {
  @Column({ nullable: false })
  public description: string;

  @Column({ nullable: false })
  public sku: string;

  @Column({ nullable: true })
  public brand: string;

  @Column({ nullable: true })
  public model: string;

  @Column({ nullable: false })
  public purchaseDate: Date;

  @ManyToOne(type => ItemCondition)
  @JoinColumn({ name: 'item_condition_id'})
  public itemCondition: ItemCondition;

  @ManyToOne(type => Stockroom)
  @JoinColumn({ name: 'stockroom_id' })
  public stockroom: Stockroom;

  // @@@ TODO Categories list (tags)
  
  // @@@ Need to create ItemLocation entity (StockItemLocation??)
  // @@@ entity should have AccountID as foreign key.
  // Location _id

  
  // quantity (will need to move all listing details to separate table
  //     if we allow quantity to know how many are listed etc and how man not)
}