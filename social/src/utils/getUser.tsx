import { UserToken } from "../components/interfaces/interfaces";
import jwt from "jwt-decode";

export const getUser = (token: string) => {
  const user: UserToken = jwt(token);

  return user.id;
};
