import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';

@Entity()
export class Category extends BaseEntity {
  @Column({ nullable: false })
  public description: string;
}