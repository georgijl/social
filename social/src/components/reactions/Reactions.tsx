import axios from "axios";
import { useCallback, useEffect } from "react";
import { FC, useState } from "react";
import { Attributes } from "../post/PostInterfaces";
import "./reactions.scss";

const Reactions: FC<Attributes> = ({ attribute }) => {
  const [like, setLike] = useState(attribute.likes);
  const [isLiked, setIsLiked] = useState(false);

  const changePost = useCallback(async () => {
    await axios.put(`/post/like/${attribute?.id}`, {
      likes: like,
    });
  }, [attribute?.id, like]);

  const toggleLike = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    changePost();
  }, [changePost]);

  return (
    <div className="reactions">
      <img
        src={require("../../images/reacts/like.png")}
        className="reactions__images"
        height={22}
        width={22}
        onClick={() => toggleLike()}
        alt="like"
      />
      <img
        src={require("../../images/reacts/heart.png")}
        className="reactions__images"
        height={22}
        width={22}
        onClick={() => toggleLike()}
        alt="heart"
      />
      <span className="reactions__count">{like} likes</span>
    </div>
  );
};

export default Reactions;
