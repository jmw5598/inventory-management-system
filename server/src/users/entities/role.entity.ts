import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity()
export class Role extends BaseEntity {
  @Column({ nullable: false, unique: true })
  public name: string
}