import {Base} from "./base.entity";
import {Column, Entity, ManyToOne} from "typeorm";
import {User} from "./user.entity";

@Entity()
export class Publication extends Base<Publication> {
  @Column({ type: 'varchar', length: '400', nullable: false })
  content: string;

  @ManyToOne(type => User, user => user.publications, { nullable: false })
  user: User;
}