import { FC, useCallback, useEffect, useState } from "react";
import "./comments.scss";
import CommentContent from "./commentContent/CommentContent";
import axios from "axios";
import { CommentPassed, Comment } from "../PostInterfaces";
import { UserState } from "../../interfaces/interfaces";
import { useSelector } from "react-redux";
import { fetchComments } from "../../../utils/fetchComments";

const Comments: FC<CommentPassed> = ({ openDropdown, attribute }) => {
  const isLoggedIn = useSelector((state: UserState) => state.userInfo.userId);

  const [comments, setComments] = useState<Comment[]>();
  const [commentInfo, setCommentInfo] = useState("");

  const getComments = useCallback(async () => {
    setComments(await fetchComments(attribute?.id));
  }, [attribute?.id]);

  const handleCreateComment = useCallback(async () => {
    await axios.post(`/comment/${attribute?.id}`, {
      userId: isLoggedIn,
      description: commentInfo,
    });
  }, [attribute?.id, commentInfo, isLoggedIn]);

  useEffect(() => {
    getComments();
  }, [getComments]);

  return (
    <div className="comments">
      <form className="comments__form" onSubmit={handleCreateComment}>
        <input
          className="comments__write"
          type="text"
          placeholder={`What is your opinion ${attribute.username} ?`}
          onChange={(e) => {
            e.preventDefault();
            setCommentInfo(e.target.value);
          }}
          value={commentInfo}
        />
      </form>
      {openDropdown && (
        <div className="comments__wrapper">
          {comments
            ? comments.map((comment) => {
                return <CommentContent key={comment.id} comment={comment} />;
              })
            : "There are no comments yet!"}
        </div>
      )}
    </div>
  );
};

export default Comments;
