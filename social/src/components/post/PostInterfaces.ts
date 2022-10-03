import { UserTokenInfo } from "../interfaces/interfaces";

export interface Attributes {
  attribute: {
    postsId: string;
    id: string;
    description: string;
    image: string;
    username: string;
    picture: string;
    userImg: string;
    createdAt: string;
    feeling: string;
    likes: number;
  };
}

export interface CommentMapped {
  comment: {
    id: string;
    user_picture?: string;
    user_name: string;
    comment?: string;
    createdAt: string;
    ofPostsId: string;
    userId: string;
  };
}

export interface PostsInit {
  postsId: string;
  id: string;
  description: string;
  image: string;
  username: string;
  picture: string;
  userImg: string;
  createdAt: Date;
  feeling: string;
}

export interface UserToken {
  userInfo: UserTokenInfo | undefined;
}

export interface UserInfo {
  userInfo: UserTokenInfo | undefined;
}

export interface CommentPassed {
  openDropdown: boolean;
  attribute: {
    postsId: string;
    id: string;
    description: string;
    image: string;
    username: string;
    picture: string;
    userImg: string;
    createdAt: string;
    feeling: string;
  };
}

export interface Comment {
  id: string;
  user_picture?: string;
  user_name: string;
  comment?: string;
  createdAt: string;
  ofPostsId: string;
  userId: string;
  isYours: boolean;
}

export interface PostInfo {
  posts: {
    post: Attributes;
  };
  postsId: string;
  id: string;
  description: string;
  image: string;
  username: string;
  picture: string;
  userImg: string;
  createdAt: string;
  feeling: string;
  likes: number;
}
export interface PostInfoMapped {
  post: {
    postsId: string;
    id: string;
    description: string;
    image: string;
    username: string;
    picture: string;
    userImg: string;
    createdAt: string;
    feeling: string;
    likes: number;
  };
}
