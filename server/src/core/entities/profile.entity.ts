import { Entity, Column, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Address } from './address.entity';

@Entity()
export class Profile extends BaseEntity {
  @Column({ name: 'first_name', nullable: false })
  public firstName: string;

  @Column({ name: 'last_name', nullable: false })
  public lastName: string;

  @OneToOne(type => Address)
  @JoinColumn({ name: 'address_id' })
  public address: Address;
}