import { FC, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Followed, UserState } from "../interfaces/interfaces";
import FriendProfile from "../friendProfile/FriendProfile";
import { useDispatch, useSelector } from "react-redux";
import "./friends.scss";
import { followed, allFollowed } from "../../redux/userReducer";

export const Friends: FC = () => {
  const userId = useSelector((state: UserState) => state.userInfo.userId);
  const [follow, setFollow] = useState<Followed[]>([]);
  const dispatch = useDispatch();

  const getFollowedFriends = useCallback(async () => {
    const response = await axios.get(`/user/followings/${userId}`);
    setFollow(response.data);

    dispatch(followed(false));
    dispatch(allFollowed(response.data));
  }, [userId, dispatch]);

  useEffect(() => {
    getFollowedFriends();
  }, [getFollowedFriends, setFollow]);

  return (
    <div className="friends">
      <h2 className="friends__title">Your friends</h2>
      {follow &&
        follow.map((friend) => {
          return <FriendProfile key={friend.id} friend={friend} />;
        })}
    </div>
  );
};
