import { FC, useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ExitToApp } from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { UserDataInfo } from "../interfaces/interfaces";
import "./accountSettings.scss";
import { useClickOutside } from "../../utils/Toggle";
import { isOwner, userId } from "../../redux/userReducer";

const AccountSettings: FC = () => {
  const user = useSelector(
    (state: UserDataInfo) => state.userInfo.userDataInfo
  );

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

  return (
    <div className="account" ref={menuRef}>
      <img
        className="account__img"
        data-testid="account"
        src={
          user.picture
            ? require(`../../../../social/src/images/${user.picture}`)
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
            to={`/profile/${user.username}`}
          >
            <div
              className="account__dropdown-info"
              onClick={() => dispatch(isOwner(true))}
            >
              <img
                className="account__img"
                src={
                  user.picture
                    ? require(`../../../../social/src/images/${user.picture}`)
                    : require("../../images/noAvatar.png")
                }
                alt="personImg"
              />
              <p>{user.first_name}</p>
              <p>{user.last_name}</p>
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
