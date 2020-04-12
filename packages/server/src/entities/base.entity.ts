import {CreateDateColumn, DeepPartial, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Base<T = {}> {
  constructor(obj?: DeepPartial<T>) {
    Object.assign(this, obj)
  }

  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}