import { Column, Entity, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { Stockroom } from './stockroom.entity';
import { StockItem } from '../../stock-items/entities/stock-item.entity';

@Entity()
export class Location extends BaseEntity {
  @Column({ nullable: false })
  public description: string;

  @ManyToOne(type => Stockroom, { nullable: false })
  @JoinColumn({ name: 'stockroom_id' })
  public stockroom: Stockroom;

  @OneToMany(type => StockItem, item => item.location)
  public stockItems: StockItem[];
}