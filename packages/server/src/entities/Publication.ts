import {Base} from "./Base";
import {Column, Entity, ManyToOne, OneToMany} from "typeorm";
import {User} from "./User";
import { Comment } from "./Comment";

@Entity()
export class Publication extends Base<Publication> {
  @Column({ type: 'varchar', length: '400', nullable: false })
  content: string;

  @ManyToOne(type => User, user => user.publications, { nullable: false })
  user: User;

  @OneToMany(type => Comment, comment => comment.publication)
  comments: Comment[];
}
