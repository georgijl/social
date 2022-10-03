import { FC, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { userDataSuggestions } from "../../redux/notStoredUserReducer";
import { isOwner, friendId, followed } from "../../redux/userReducer";
import { getUserInfo } from "../../utils/getUserInfo";
import { FriendsListMaped } from "../interfaces/interfaces";
import "./friendProfile.scss";

const FriendProfile: FC<FriendsListMaped> = ({ friend }) => {
  const { profileId } = useParams();
  const dispatch = useDispatch();

  const getUserinfoData = useCallback(async () => {
    if (!profileId) return;
    const data = await getUserInfo(profileId, "/user/");

    if (data) dispatch(userDataSuggestions(data));
  }, [dispatch, profileId]);

  const handleActions = useCallback(() => {
    dispatch(isOwner(false));
    dispatch(friendId(friend.id));
    dispatch(followed(true));
  }, [dispatch, friend.id]);

  useEffect(() => {
    getUserinfoData();
  }, [getUserinfoData]);

  return (
    <Link
      to={`/profile/${friend.id}`}
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
