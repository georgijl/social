export interface Users {
  id: string;
  username: string;
  picture: string;
}

export interface UsersInfo {
  user: Users | undefined;
}
