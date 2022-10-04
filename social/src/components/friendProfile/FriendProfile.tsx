import { FC, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { isOwner, friendId, followed } from "../../redux/userReducer";
import { FriendsListMaped } from "../interfaces/interfaces";
import "./friendProfile.scss";

const FriendProfile: FC<FriendsListMaped> = ({ friend }) => {
  const dispatch = useDispatch();

  const handleActions = useCallback(() => {
    dispatch(isOwner(false));
    dispatch(friendId(friend.id));
    dispatch(followed(true));
  }, [dispatch, friend.id]);

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
