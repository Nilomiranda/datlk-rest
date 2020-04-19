import { Base } from "./Base";
import {Column, Entity, ManyToOne} from "typeorm";
import { User } from "./User";
import { Publication } from "./Publication";

@Entity()
export class Comment extends Base<Comment> {
  @Column({ type: 'varchar', length: 400, nullable: false })
  content: string;

  @ManyToOne(type => User, { nullable: false })
  user: User;

  @ManyToOne(type => Publication, publication => publication.comments, { nullable: false, onDelete: 'CASCADE' })
  publication: Publication;
}
