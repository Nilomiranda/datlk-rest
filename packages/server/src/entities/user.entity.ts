import {Column, Entity} from "typeorm";
import {Base} from "./base.entity";

@Entity()
export class User extends Base<User> {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;
}