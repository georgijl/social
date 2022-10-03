import { FC, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Followed, PostReducer, UserState } from "../interfaces/interfaces";
import FriendProfile from "../friendProfile/FriendProfile";
import { useDispatch, useSelector } from "react-redux";
import "./friends.scss";
import { allFollowed } from "../../redux/userReducer";
import { fetchedFollow } from "../../redux/postReducer";

export const Friends: FC = () => {
  const userId = useSelector((state: UserState) => state.userInfo.userId);
  const [follow, setFollow] = useState<Followed[]>([]);
  const dispatch = useDispatch();

  const isHandleFollow = useSelector(
    (state: PostReducer) => state.post.handleFetchedFollow
  );
  const getFollowedFriends = useCallback(async () => {
    const response = await axios.get(`/user/followings/${userId}`);
    setFollow(response.data);

    dispatch(allFollowed(response.data));
    dispatch(fetchedFollow(false));
  }, [userId, dispatch]);

  useEffect(() => {
    getFollowedFriends();
  }, [getFollowedFriends, setFollow, isHandleFollow]);

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
