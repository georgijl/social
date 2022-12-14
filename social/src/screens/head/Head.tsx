import { Container } from "@material-ui/core";
import { FC, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetched } from "../../redux/postReducer";
import { fetchPosts } from "../../utils/fetchPosts";
import Feed from "../../components/feed/Feed";
import FeedShare from "../../components/feedShare/FeedShare";
import Header from "../../components/header/Header";
import {
  ButtonState,
  PostReducer,
  UserState,
} from "../../components/interfaces/interfaces";
import { PostInfo } from "../../components/post/PostInterfaces";

import "./head.scss";

const Head: FC = () => {
  const userId = useSelector((state: UserState) => state.userInfo.userId);
  const isOwn = useSelector((state: UserState) => state.userInfo.isOwner);
  const isPosted = useSelector((state: ButtonState) => state.post.clicked);
  const isSuggested = useSelector(
    (state: PostReducer) => state.post.isSuggested
  );
  const dispatch = useDispatch();

  const [posts, setPosts] = useState<PostInfo[]>();

  const getUserInfo = useCallback(async () => {
    const data = await fetchPosts(userId, isOwn);
    setPosts(data);
  }, [userId, isOwn]);

  useEffect(() => {
    getUserInfo();
    dispatch(fetched(false));
  }, [getUserInfo, isPosted, dispatch]);

  return (
    <>
      <Header />
      <Container>
        <div className="head">
          <div className="head__feed">
            {!isSuggested && isOwn ? <FeedShare /> : ""}

            {posts &&
              posts.map((post) => {
                return <Feed key={post.id} post={post} />;
              })}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Head;
