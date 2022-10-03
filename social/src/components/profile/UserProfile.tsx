import { FC, useCallback, useEffect, useMemo, useState } from "react";
import {
  PostReducer,
  UserDataInfo,
  UserInfo,
  UserState,
} from "../interfaces/interfaces";
import "./userProfile.scss";
import Feed from "../feed/Feed";
import CoverImg from "../coverImg/CoverImg";
import ProfileImg from "../profileImg/ProfileImg";
import { Friends } from "../friends/Friends";
import YouMayKnow from "../youMayKnow/YouMayKnow";
import { useDispatch, useSelector } from "react-redux";
import Header from "../header/Header";
import { isOwner, userDataInfo } from "../../redux/userReducer";
import { getUserInfo } from "../../utils/getUserInfo";
import { Link, useParams } from "react-router-dom";
import FeedShare from "../feedShare/FeedShare";
import { fetchPosts } from "../../utils/fetchPosts";
import { PostInfo } from "../post/PostInterfaces";
import axios from "axios";
import { fetchedFollow } from "../../redux/postReducer";

const UserProfile: FC = () => {
  const { profileId } = useParams();
  const dispatch = useDispatch();
  const isOwn = useSelector((state: UserState) => state.userInfo.isOwner);
  const userId = useSelector((state: UserState) => state.userInfo.userId);
  const isFollowed = useSelector((state: UserState) => state.userInfo.followed);
  let u = useSelector((state: UserDataInfo) => state.userInfo.userDataInfo);
  const isSuggested = useSelector(
    (state: PostReducer) => state.post.isSuggested
  );

  const [posts, setPosts] = useState<PostInfo[]>();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const isLoggedUser = useMemo(() => profileId === userId, [userId, profileId]);
  const fetchUserInfo = useCallback(async () => {
    if (!profileId) return;

    const data = await getUserInfo(profileId, "/profile/user/");
    const dataPosts = await fetchPosts(profileId);

    if (isLoggedUser) dispatch(userDataInfo(data));

    setPosts(dataPosts);
    setUserInfo(data);
  }, [dispatch, isLoggedUser, profileId]);

  const handleUnfollow = useCallback(async () => {
    await axios.post(`/user/unfollow/${userId}`, {
      followedUser: profileId,
    });

    dispatch(isOwner(false));
    dispatch(fetchedFollow(true));
  }, [dispatch, profileId, userId]);

  const handleFollow = useCallback(async () => {
    await axios.post(`/user/follow/${userId}`, {
      id: profileId,
    });

    dispatch(isOwner(false));
    dispatch(fetchedFollow(true));
  }, [dispatch, profileId, userId]);

  useEffect(() => {
    fetchUserInfo();
  }, [dispatch, fetchUserInfo, isLoggedUser]);

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
              <CoverImg cover={userInfo?.cover_photo} />
              <ProfileImg picture={userInfo?.picture} />
            </div>
            {!isOwn ? (
              isFollowed ? (
                <Link
                  to={`/profile/${u.id}`}
                  className="user-profile__follow"
                  onClick={handleUnfollow}
                >
                  Unfollow user
                </Link>
              ) : (
                <Link
                  to={`/profile/${u.id}`}
                  className="user-profile__follow"
                  onClick={handleFollow}
                >
                  Follow user
                </Link>
              )
            ) : (
              ""
            )}

            <h2 className="profile-info__name">
              {userInfo?.first_name} {userInfo?.last_name}
            </h2>
          </div>
          {!isSuggested && isOwn ? <FeedShare /> : ""}
          {posts &&
            posts.map((post) => {
              return <Feed key={post.id} post={post} />;
            })}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
