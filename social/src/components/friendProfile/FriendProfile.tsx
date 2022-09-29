import { FC, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userDataSuggestions } from "../../redux/notStoredUserReducer";
import { suggestedId, isOwner, friendId } from "../../redux/userReducer";
import { getUserInfo } from "../../utils/getUserInfo";
import { FriendsListMaped, UserState } from "../interfaces/interfaces";
import "./friendProfile.scss";

const FriendProfile: FC<FriendsListMaped> = ({ friend }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state: UserState) => state.userInfo.suggestedId);

  const getUserinfoData = useCallback(async () => {
    const data = await getUserInfo(userId, "/user/");

    if (data) dispatch(userDataSuggestions(data));
  }, [dispatch, userId]);

  const handleUserId = useCallback(() => {
    if (userId) dispatch(suggestedId(userId));
  }, [dispatch, userId]);

  const handleActions = useCallback(() => {
    dispatch(suggestedId(friend.id));
    dispatch(isOwner(false));
    dispatch(friendId(friend.id));
  }, [dispatch, friend.id]);

  useEffect(() => {
    handleUserId();
    getUserinfoData();
  }, [handleUserId, getUserinfoData]);

  return (
    <Link
      to={`/profile/friend/${friend.username}`}
      onClick={handleActions}
      className="friend-profile"
    >
      <img
        className="friend-profile__picture"
        src={
          friend.picture
            ? require(`../../../../social/src/images/${friend.picture}`)
            : require("../../images/noAvatar.png")
        }
        alt=""
      />
      <p className="friend-profile__names">{friend.username}</p>
    </Link>
  );
};

export default FriendProfile;
