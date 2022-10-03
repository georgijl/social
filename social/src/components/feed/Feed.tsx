import { FC } from "react";
import Loader from "../loader/Loader";
import Post from "../post/Post";
import { PostInfoMapped } from "../post/PostInterfaces";
import "./feed.scss";

const Feed: FC<PostInfoMapped> = ({ post }) => {
  return (
    <div className="feed">
      {post ? (
        <div className="feed__wrapper" data-testid="feed__wrapper">
          <Post attribute={post} />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Feed;
