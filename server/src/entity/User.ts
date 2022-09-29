import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { Follow } from "./Follow";
import { Post } from "./Post";

@Entity({ name: "users" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ type: "text" })
  first_name: string;

  @Column({ type: "text" })
  last_name: string;

  @Column({ type: "text", nullable: true })
  cover_photo: string;

  @Column({ type: "text", nullable: true })
  picture: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    nullable: false,
  })
  password: string;

  @OneToMany(
    () => Post,
    (post) => {
      post.posts;
    }
  )
  user: Post;

  @ManyToMany(
    () => Follow,
    (follow: Follow) => {
      follow.users;
    }
  )
  objects: Follow[];
}
