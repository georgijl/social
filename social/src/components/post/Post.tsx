import { FC, useCallback, useEffect, useRef, useState } from "react";
import { DeleteOutline, EditRounded, MoreVert } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { Attributes } from "./PostInterfaces";
import { format } from "timeago.js";
import axios from "axios";
import "./post.scss";
import Comments from "./comments/Comments";
import { UserState } from "../interfaces/interfaces";
import { useClickOutside } from "../../utils/Toggle";
import Reactions from "../reactions/Reactions";
import { fetched } from "../../redux/postReducer";

const Post: FC<Attributes> = ({ attribute }) => {
  const isLoggedIn = useSelector((state: UserState) => state.userInfo.userId);
  const menuRef = useRef<HTMLDivElement>(null);

  const [isUpdating, setIsUpdating] = useState(false);
  const [postInfo, setPostInfo] = useState(attribute?.description);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openedButton, setOpenedButton] = useState(false);
  const [commentsCount, setCommentsCount] = useState(0);
  const dispatch = useDispatch();
  const handleDropdown = () => setOpenDropdown(!openDropdown);
  const handleToggle = () => setOpenedButton(!openedButton);
  const closeDropdown = () => setOpenedButton(false);

  const handleEditingPosts = useCallback(() => {
    setIsUpdating(!isUpdating);
  }, [setIsUpdating, isUpdating]);

  const editPostHandler = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      await axios.put(`/post/${attribute?.id}`, {
        description: postInfo,
      });
      setIsUpdating(false);
      dispatch(fetched(true));
    },
    [attribute?.id, dispatch, postInfo]
  );

  const handleDelete = useCallback(async () => {
    dispatch(fetched(true));

    await axios.delete(`/post/${attribute?.id}`, {
      data: { postsId: attribute?.postsId },
    });
  }, [attribute?.id, attribute?.postsId, dispatch]);

  useClickOutside(menuRef, closeDropdown);

  const getCommentsCount = useCallback(async () => {
    const commentRes = await axios.get(`/comment/${attribute?.id}`);
    setCommentsCount(commentRes.data.commentsCount);
  }, [attribute?.id]);

  useEffect(() => {
    getCommentsCount();
  }, [getCommentsCount]);

  return (
    <div className="post" data-testid="post">
      <div className="post__container">
        <div className="post__head">
          <div className="post__head-user">
            <img
              className="share__wrapper-img"
              src={
                attribute?.userImg
                  ? require(`../../../../social/src/images/${attribute?.userImg}`)
                  : require("../../images/noAvatar.png")
              }
              alt="personImg"
            />
            <div>
              <div className="post__user-info">
                <h3 className="post__head-username">{attribute?.username}</h3>
                {attribute?.feeling && (
                  <span className="post__head-feeling">
                    feeling {attribute?.feeling}
                  </span>
                )}
              </div>
              <p className="post__head-time-ago">
                {format(attribute ? attribute.createdAt : "")}
              </p>
            </div>
          </div>
          {attribute.postsId === isLoggedIn && (
            <MoreVert className="post__options-more" onClick={handleToggle} />
          )}
        </div>
        {!isUpdating ? (
          <span className="post-text">{attribute?.description}</span>
        ) : (
          <form onSubmit={editPostHandler}>
            <input
              className="post__edit-input"
              type="text"
              onChange={(e) => setPostInfo(e.target.value)}
              value={postInfo}
            />
          </form>
        )}
        {attribute?.image && (
          <img
            className="feed__image"
            src={require(`../../../../social/src/images/${attribute?.image}`)}
            alt="decoration"
          />
        )}

        {attribute.postsId === isLoggedIn
          ? openedButton && (
              <div className="post__dropdown" ref={menuRef}>
                <div className="post__dropdown-wrapper">
                  <p className="post__dropdown-text">Edit post</p>
                  <EditRounded
                    className="post__buttons"
                    onClick={handleEditingPosts}
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
            )
          : ""}
        <div className="comments__container">
          <Reactions attribute={attribute} />
          {commentsCount > 0 ? (
            <button className="comments__button" onClick={handleDropdown}>
              <span className="comments__count">{commentsCount}</span>
              comments
            </button>
          ) : (
            <div className="comments__button">no comments yet</div>
          )}
        </div>
      </div>
      <Comments openDropdown={openDropdown} attribute={attribute} />
    </div>
  );
};

export default Post;
