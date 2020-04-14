import { Base } from "./base.entity";
import { Column, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { Publication } from "./publication.entity";

export class Comment extends Base<Comment> {
  @Column({ type: 'varchar', length: 400, nullable: false })
  content: string;

  @ManyToOne(type => User, { nullable: false })
  user: User;

  @ManyToOne(type => Publication, publication => publication.comments, { nullable: false })
  publication: Publication;
}