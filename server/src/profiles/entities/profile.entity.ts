import { Entity, Column, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { Address } from './address.entity';

@Entity()
export class Profile extends BaseEntity {
  @Column({ name: 'first_name', nullable: false })
  public firstName: string;

  @Column({ name: 'last_name', nullable: false })
  public lastName: string;

  @Column({ nullable: false })
  public email: string;

  @OneToOne(type => Address)
  @JoinColumn({ name: 'address_id' })
  public address: Address;
}