import { FC, useCallback, useEffect } from "react";
import { UserDataInfo, UserState } from "../interfaces/interfaces";
import "./userProfile.scss";
import Feed from "../feed/Feed";
import CoverImg from "../coverImg/CoverImg";
import ProfileImg from "../profileImg/ProfileImg";
import { Friends } from "../friends/Friends";
import YouMayKnow from "../youMayKnow/YouMayKnow";
import { useDispatch, useSelector } from "react-redux";
import Header from "../header/Header";
import { suggestedId, userDataInfo } from "../../redux/userReducer";
import { getUserInfo } from "../../utils/getUserInfo";

const UserProfile: FC = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state: UserState) => state.userInfo.userId);
  let u = useSelector((state: UserDataInfo) => state.userInfo.userDataInfo);

  const fetchUserInfo = useCallback(async () => {
    const data = await getUserInfo(userId, "/profile/user/");

    dispatch(userDataInfo(data));
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(suggestedId(""));
    fetchUserInfo();
  }, [dispatch, fetchUserInfo]);

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
            <h2 className="profile-info__name">
              {u.first_name} {u.last_name}
            </h2>
          </div>
          <Feed isSuggested={false} userInfo={userId} url="/user/post/" />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
