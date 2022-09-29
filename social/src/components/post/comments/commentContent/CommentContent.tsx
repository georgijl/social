import { DeleteOutline, EditRounded, MoreVert } from "@material-ui/icons";
import axios from "axios";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import { useClickOutside } from "../../../../utils/Toggle";
import { UserState } from "../../../interfaces/interfaces";
import { CommentMapped } from "../../PostInterfaces";

const CommentContent: FC<CommentMapped> = ({ comment }) => {
  const isLoggedIn = useSelector((state: UserState) => state.userInfo.userId);
  const menuRef = useRef<HTMLDivElement>(null);

  const [openedButton, setOpenedButton] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [commentInfo, setCommentInfo] = useState(comment.comment);
  const [isYoursComment, setIsYoursComment] = useState(false);

  const handleDropdown = () => setOpenedButton(!openedButton);
  const closeDropdown = () => setOpenedButton(false);

  const handleDelete = useCallback(async () => {
    await axios.delete(`/comment/${comment.id}`, {
      data: {
        idOfUser: isLoggedIn,
      },
    });
  }, [comment.id, isLoggedIn]);

  const submitEditingComments = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();

      await axios.put(`/comment/${comment.id}`, {
        description: commentInfo,
      });
    },
    [comment.id, commentInfo]
  );

  const editCommentHandler = useCallback(() => {
    setIsUpdating(!isUpdating);
  }, [isUpdating]);

  const checkUserComments = useCallback(async () => {
    const response = await axios.get(`/comment/${comment.id}/${isLoggedIn}`);
    setIsYoursComment(response.data.isUsersComment);
  }, [comment.id, isLoggedIn]);

  useEffect(() => {
    checkUserComments();
  }, [checkUserComments]);

  useClickOutside(menuRef, closeDropdown);

  return (
    <div className="comments__content">
      <div className="comments__container">
        <div className="comments__container-user">
          <img
            className="comments__profile-picture"
            src={
              comment?.user_picture
                ? require(`../../../../../../social/src/images/${comment.user_picture}`)
                : require("../../../../images/noAvatar.png")
            }
            alt="decoration"
          />
          <p className="comments__name">{comment.user_name}</p>
        </div>
        {isYoursComment && (
          <>
            <MoreVert className="post__options-more" onClick={handleDropdown} />
            {openedButton && (
              <div className="post__dropdown" ref={menuRef}>
                <div className="post__dropdown-wrapper">
                  <p className="post__dropdown-text">Edit post</p>
                  <EditRounded
                    className="post__buttons"
                    onClick={editCommentHandler}
                  />
                </div>
                <div className="post__dropdown-wrapper">
                  <p className="post__dropdown-text">Delete post</p>
                  <DeleteOutline
                    className="post__buttons"
                    onClick={handleDelete}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
      {!isUpdating ? (
        <p className="comments__description">{comment.comment}</p>
      ) : (
        <form onSubmit={submitEditingComments}>
          <input
            className="post__edit-input"
            type="text"
            onChange={(e) => setCommentInfo(e.target.value)}
            value={commentInfo}
          />
        </form>
      )}
      <p className="comments__created-at">{format(comment.createdAt)}</p>
    </div>
  );
};

export default CommentContent;
