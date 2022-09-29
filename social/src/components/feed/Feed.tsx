import axios from "axios";
import { FC, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetched } from "../../redux/postReducer";
import FeedShare from "../feedShare/FeedShare";
import {
  Posts,
  UserInfoFollow,
  UserState,
  ButtonState,
} from "../interfaces/interfaces";
import Loader from "../loader/Loader";
import Post from "../post/Post";
import "./feed.scss";

const Feed: FC<UserInfoFollow> = ({ isSuggested, userInfo, url }) => {
  const isPosted = useSelector((state: ButtonState) => state.post.clicked);
  const isOwn = useSelector((state: UserState) => state.userInfo.isOwner);

  const [post, setPost] = useState<Posts[]>();
  const dispatch = useDispatch();

  const fetchPosts = useCallback(async () => {
    if (!userInfo) return;

    const res = await axios.get(`${url}${userInfo}`);

    setPost(
      res.data.sort((p1: { createdAt: Date }, p2: { createdAt: Date }) => {
        return (
          new Date(p2.createdAt).valueOf() - new Date(p1.createdAt).valueOf()
        );
      })
    );

    dispatch(fetched(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo, dispatch, isPosted]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="feed">
      {!isSuggested && isOwn ? <FeedShare /> : ""}
      {post ? (
        post.map((attribute) => (
          <div
            className="feed__wrapper"
            data-testid="feed__wrapper"
            key={attribute.id}
          >
            <Post attribute={attribute} />
          </div>
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Feed;
