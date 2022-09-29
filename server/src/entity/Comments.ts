import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { Post } from "./Post";

@Entity({ name: "comments" })
export class Comments extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  user_picture: string;

  @Column()
  user_name: string;

  @Column({ nullable: true })
  comment: string;

  @Column({ nullable: true })
  ofPostsId: string;

  @Column({ nullable: true })
  userId: string;

  @CreateDateColumn({
    type: "timestamptz",
  })
  createdAt: Date;

  @ManyToOne(() => Post, (post) => post.posts)
  @JoinColumn()
  ofPosts: Post[];
}
