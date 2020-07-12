import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';

@Entity()
export class Location extends BaseEntity {
  @Column({ nullable: false })
  public description: string;

  // @@@ should stockroom contain a list of locations?
  // @@@ should the location be specific to a stockroom instead of an account.
  // @@@ locaiton would no long need a foreign key to account??
  // @@@ this is probably the better approach.
  // @@@ have foreign key to stockroom


  // @@@ CONSIDER MOVING ENTITIES INTO MODULES???
}