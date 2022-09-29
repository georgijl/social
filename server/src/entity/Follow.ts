import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from "typeorm";

import { User } from "./User";

@Entity({ name: "follows" })
export class Follow extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId!: string;

  @Column()
  followedUserId: string;

  @ManyToMany(() => User, (user: User) => user.objects, {
    cascade: true,
  })
  @JoinTable()
  users: User[];
}
