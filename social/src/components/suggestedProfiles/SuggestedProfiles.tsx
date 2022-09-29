import { FC, useCallback, useEffect } from "react";
import { UserState, userSuggestions } from "../interfaces/interfaces";
import CoverImg from "../coverImg/CoverImg";
import ProfileImg from "../profileImg/ProfileImg";
import { Friends } from "../friends/Friends";
import YouMayKnow from "../youMayKnow/YouMayKnow";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { followed, isOwner } from "../../redux/userReducer";
import Header from "../header/Header";
import { userDataSuggestions } from "../../redux/notStoredUserReducer";

const SuggestedProfiles: FC = () => {
  const dispatch = useDispatch();
  const suggestedUser = useSelector(
    (state: UserState) => state.userInfo.suggestedId
  );
  const isOwn = useSelector((state: UserState) => state.userInfo.isOwner);
  const username = useSelector((state: UserState) => state.userInfo.username);
  const isLoggedIn = useSelector((state: UserState) => state.userInfo.userId);
  const u = useSelector(
    (state: userSuggestions) => state.userData.userDataInfo
  );

  const getUser = useCallback(async () => {
    const userInfo = await axios.get(`/user/${suggestedUser}`);
    const info = userInfo.data[0];

    dispatch(userDataSuggestions(info));
  }, [dispatch, suggestedUser]);

  const handleFollow = useCallback(async () => {
    await axios.post(`/profile/suggested/follow/${isLoggedIn}`, {
      id: suggestedUser,
    });

    dispatch(followed(true));
    dispatch(isOwner(false));
  }, [dispatch, isLoggedIn, suggestedUser]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <>
      <Header />
      {u && (
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
                  to={`/profile/${username}`}
                  className="user-profile__follow"
                  onClick={handleFollow}
                >
                  Follow user
                </Link>
              )}
              <h2 className="profile-info__name">
                {u.first_name} {u.last_name}
              </h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SuggestedProfiles;
