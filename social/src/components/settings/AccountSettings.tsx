import { FC, useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ExitToApp } from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { UserDataInfo, UserState } from "../interfaces/interfaces";
import "./accountSettings.scss";
import { useClickOutside } from "../../utils/Toggle";
import { isOwner, isOwnPosts, userId } from "../../redux/userReducer";

const AccountSettings: FC = () => {
  const userName = useSelector(
    (state: UserDataInfo) => state.userInfo.userDataInfo
  );

  const user = useSelector((state: UserState) => state.userInfo.userId);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuRef = useRef<HTMLDivElement>(null);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const toggleDropdown = useCallback(() => {
    setProfileDropdown(!profileDropdown);
  }, [profileDropdown]);

  const closeDropdown = () => {
    setProfileDropdown(false);
  };

  useClickOutside(menuRef, closeDropdown);

  const handleToken = () => {
    dispatch(userId(""));
    navigate("/login");
  };

  const handleActions = () => {
    dispatch(isOwner(true));
    dispatch(isOwnPosts(true));
  };

  return (
    <div className="account" ref={menuRef}>
      <img
        className="account__img"
        data-testid="account"
        src={
          userName.picture
            ? require(`../../../../social/src/images/${userName.picture}`)
            : require("../../images/noAvatar.png")
        }
        alt="personImg"
        onClick={toggleDropdown}
      />
      {profileDropdown && (
        <div
          className="account__dropdown"
          data-testid="account__dropdown"
          onClick={toggleDropdown}
        >
          <Link
            className="account__dropdown-anchor"
            data-testid="account__dropdown-anchor"
            to={`/profile/${user}`}
            onClick={() => handleActions}
          >
            <div className="account__dropdown-info">
              <img
                className="account__img"
                src={
                  userName.picture
                    ? require(`../../../../social/src/images/${userName.picture}`)
                    : require("../../images/noAvatar.png")
                }
                alt="personImg"
              />
              <p>{userName.first_name}</p>
              <p>{userName.last_name}</p>
            </div>
          </Link>
          <div
            className="account__logout"
            data-testid="account__logout"
            onClick={handleToken}
          >
            <ExitToApp />
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSettings;
