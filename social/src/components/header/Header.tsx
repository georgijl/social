import { FC } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { isOwner, isOwnPosts } from "../../redux/userReducer";
import AccountSettings from "../settings/AccountSettings";

const Header: FC = () => {
  const dispatch = useDispatch();

  const handleActions = () => {
    dispatch(isOwner(true));
    dispatch(isOwnPosts(false));
  };

  return (
    <>
      <div className="header">
        <Link to={"/"} onClick={handleActions}>
          <img
            src={require("../../images/home-logo.png")}
            alt="home"
            height="50"
            width="50"
          />
        </Link>
        <AccountSettings />
      </div>
    </>
  );
};

export default Header;
