import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { Platform } from '../../platforms/entities/platform.entity';

@Entity()
export class ListedItem extends BaseEntity {}