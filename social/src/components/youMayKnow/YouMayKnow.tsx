import axios from "axios";
import { FC, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchedFollow } from "../../redux/postReducer";
import { PostReducer, UserState } from "../interfaces/interfaces";
import UserDetails from "./userDetails/UserDetails";
import { Users } from "./usersInterfaces";

const YouMayKnow: FC = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state: UserState) => state.userInfo.userId);
  const [users, setUser] = useState<Users[]>();
  const isHandleFollow = useSelector(
    (state: PostReducer) => state.post.handleFetchedFollow
  );
  const getUser = useCallback(async () => {
    const allUsers = await axios.get(`/user/followings/${userId}`);

    const response = await axios.post("/suggested", {
      users: allUsers.data,
    });
    const data = response.data.users;
    setUser(data);
    dispatch(fetchedFollow(false));
  }, [dispatch, userId]);

  useEffect(() => {
    getUser();
  }, [getUser, isHandleFollow]);

  return (
    <>
      <h3 className="user__title">People you may know</h3>
      {users &&
        // eslint-disable-next-line array-callback-return
        users.map((user: Users) => {
          if (user.id !== userId)
            return <UserDetails key={user.id} user={user} />;
        })}
    </>
  );
};

export default YouMayKnow;
