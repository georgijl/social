import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Comments } from "./Comments";
import { User } from "./User";

@Entity({ name: "posts" })
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  userImg: string;

  @Column({ nullable: true })
  feeling: string;

  @ManyToOne(() => User, (user) => user.user)
  @JoinColumn()
  posts: User;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  postsId: string;

  @CreateDateColumn({
    type: "timestamptz",
  })
  createdAt: Date;

  @Column()
  likes: number;

  @OneToMany(
    () => Comments,
    (comment) => {
      comment.ofPosts;
    }
  )
  post: Comments[];
}
