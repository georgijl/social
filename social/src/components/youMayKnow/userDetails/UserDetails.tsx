import { FC } from "react";
import { UsersInfo } from "../usersInterfaces";
import "../users.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isOwner, suggestedId } from "../../../redux/userReducer";

const UserDetails: FC<UsersInfo> = ({ user }) => {
  const dispatch = useDispatch();

  const handleEvents = () => {
    if (user?.id) dispatch(suggestedId(user.id));
    dispatch(isOwner(false));
  };

  return (
    <div className="user-details">
      {user ? (
        <Link
          to={`/profile/suggested`}
          className="user-details__wrapper"
          onClick={handleEvents}
        >
          <img
            className="user-details__picture"
            src={
              user.picture
                ? require(`../../../../../social/src/images/${user.picture}`)
                : require("../../../images/noAvatar.png")
            }
            alt=""
          />
          <p className="user-details__username">{user.username}</p>
        </Link>
      ) : (
        ""
      )}
    </div>
  );
};

export default UserDetails;
