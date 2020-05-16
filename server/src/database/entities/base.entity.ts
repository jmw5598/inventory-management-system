import { PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'created_at', nullable: false })
  public createdAt: Date;

  @Column({ name: 'updated_at', nullable: false })
  public updatedAt: Date;

  @Column({ name: 'deleted_at', nullable: true })
  public deletedAt: Date;

  @BeforeInsert()
  public beforeInsert() {
    const now: Date = new Date()
    this.createdAt = now;
    this.updatedAt = now;
  }

  @BeforeUpdate()
  public BeforeUpdate() {
    const now: Date = new Date();
    this.updatedAt = now;
  }
}