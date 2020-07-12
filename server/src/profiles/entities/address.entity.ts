import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';

@Entity()
export class Address extends BaseEntity {
  @Column({ nullable: false })
  public street: string;

  @Column({ nullable: true })
  public street2: string;

  @Column({ nullable: false })
  public city: string;

  @Column({ nullable: false })
  public state: string;

  @Column({ nullable: false })
  public zip: string;
}