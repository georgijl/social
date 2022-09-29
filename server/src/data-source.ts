import { User } from "./entity/User";
import { Post } from "./entity/Post";
import { Comments } from "./entity/Comments";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { Follow } from "./entity/Follow";

export const typeOrmConfig: PostgresConnectionOptions = {
  type: "postgres",
  username: "gosho",
  password: "tut",
  database: "sasho",
  host: "localhost",
  port: 6666,
  synchronize: true,
  logging: false,
  entities: [User, Post, Follow, Comments],
  subscribers: [],
};
