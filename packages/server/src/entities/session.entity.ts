import {Column, Entity, ManyToOne} from "typeorm";
import {Base} from "./base.entity";
import {User} from "./user.entity";

export enum SessionStatus {
  VALID = 'VALID',
  INVALID = 'INVALID',
}

@Entity()
export class Session extends Base<Session> {
  @Column({ type: 'enum', nullable: false, default: SessionStatus.VALID, enum: SessionStatus })
  status: SessionStatus;

  @Column({ type: 'varchar', nullable: false })
  token: string;

  @ManyToOne(type => User, user => user.sessions)
  user: User;
}