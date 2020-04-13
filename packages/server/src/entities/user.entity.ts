import {Column, Entity, OneToMany} from "typeorm";
import {Base} from "./base.entity";
import {Session} from "./session.entity";

@Entity()
export class User extends Base<User> {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false, select: false })
  password: string;

  @OneToMany(type => Session, session => session.user)
  sessions: Session[];
}