import { FC } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { isOwner } from "../../redux/userReducer";
import AccountSettings from "../settings/AccountSettings";

const Header: FC = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="header">
        <Link to={"/"} onClick={() => dispatch(isOwner(true))}>
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
