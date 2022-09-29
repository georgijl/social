import { FC, useCallback, useEffect } from "react";
import { FriendData, UserState } from "../interfaces/interfaces";
import Feed from "../feed/Feed";
import CoverImg from "../coverImg/CoverImg";
import ProfileImg from "../profileImg/ProfileImg";
import { Friends } from "../friends/Friends";
import YouMayKnow from "../youMayKnow/YouMayKnow";
import { useDispatch, useSelector } from "react-redux";
import Header from "../header/Header";
import { getUserInfo } from "../../utils/getUserInfo";
import { followed, isOwner, userFriendInfo } from "../../redux/userReducer";
import { Link } from "react-router-dom";
import axios from "axios";

const FriendProfileUser: FC = () => {
  const dispatch = useDispatch();
  const ownId = useSelector((state: UserState) => state.userInfo.userId);
  const userId = useSelector((state: UserState) => state.userInfo.friendId);
  const u = useSelector((state: FriendData) => state.userInfo.userFriendInfo);
  const isOwn = useSelector((state: UserState) => state.userInfo.isOwner);

  const fetchUserInfo = useCallback(async () => {
    const data = await getUserInfo(userId, "/profile/user/");
    dispatch(userFriendInfo(data));
  }, [dispatch, userId]);

  const handleUnfollow = useCallback(async () => {
    await axios.post(`/profile/unfollow/${ownId}`, {
      followedUser: userId,
    });

    dispatch(followed(false));
    dispatch(isOwner(false));
  }, [dispatch, ownId, userId]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  return (
    <>
      <Header />
      <div className="user-profile">
        <div>
          <Friends />
          <YouMayKnow />
        </div>
        <div>
          <div className="profile">
            <div className="profile-content">
              <CoverImg />
              <ProfileImg />
            </div>
            {!isOwn && (
              <Link
                to={`/profile/${u.username}`}
                className="user-profile__follow"
                onClick={handleUnfollow}
              >
                Unfollow user
              </Link>
            )}
            <h2 className="profile-info__name">
              {u.first_name} {u.last_name}
            </h2>
          </div>
          <Feed isSuggested={false} userInfo={userId} url="/post/" />
        </div>
      </div>
    </>
  );
};

export default FriendProfileUser;
