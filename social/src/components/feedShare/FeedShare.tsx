import { Cancel, PermMedia } from "@material-ui/icons";
import axios from "axios";
import { FC, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Feeling, UserState, UserDataInfo } from "../interfaces/interfaces";
import "./feedShare.scss";
import Feelings from "../feelings/Feelings";
import { fetched } from "../../redux/postReducer";

const FeedShare: FC = () => {
  const userId = useSelector((state: UserState) => state.userInfo.userId);
  const user = useSelector(
    (state: UserDataInfo) => state.userInfo.userDataInfo
  );

  const [postInfo, setPostInfo] = useState<string>("");
  const chosenEmoji = useSelector((state: Feeling) => state.post.feelings);

  const [file, setFile] = useState<any | null>(null);
  const dispatch = useDispatch();

  const submitHandler = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      const newPost = {
        image: "",
        description: postInfo,
        feeling: chosenEmoji,
      };

      if (file) {
        const data = new FormData();
        const fileName = Date.now() + file.name;
        data.append("name", fileName);
        data.append("file", file);
        newPost.image = fileName;

        try {
          await axios.post("/upload", data);
        } catch (error) {
          console.log(error);
        }
      }
      dispatch(fetched(true));

      try {
        await axios.post(`/post/${userId}`, newPost);
      } catch (error) {
        console.log(error);
      }
      setFile(null);
      setPostInfo("");
    },
    [chosenEmoji, dispatch, file, postInfo, userId]
  );

  const opinionHandler = (e: any) => {
    setPostInfo(e.target.value);
  };

  return (
    <div className="share" data-testid="share">
      <div className="share__wrapper">
        <div className="share__wrapper-top">
          <img
            className="share__wrapper-img"
            src={
              user.picture
                ? require(`../../../../social/src/images/${user.picture}`)
                : require("../../images/noAvatar.png")
            }
            alt="personImg"
          />
          <div className="share__wrapper-input">
            <input
              placeholder={`What's in your mind ${user.username} ?`}
              className="share-input"
              data-testid="share-input"
              value={postInfo}
              onChange={opinionHandler}
            />
          </div>
        </div>
      </div>
      <hr className="share-hr" />
      {file && (
        <div className="share-container">
          <img
            className="share-img"
            src={URL.createObjectURL(file)}
            alt="decoration"
          />
          <Cancel className="share-cancel" onClick={() => setFile(null)} />
        </div>
      )}
      <form className="share__wrapper-bottom" onSubmit={submitHandler}>
        <div className="share__wrapper-bottom-options">
          <label htmlFor="postImage" className="share-option">
            <PermMedia htmlColor="tomato" className="share-icon" />
            <span className="share-option__text">Photo or Video</span>
            <input
              id="postImage"
              type="file"
              accept=".png,.jpeg,.jpg,.png"
              onChange={(e) => e.target.files && setFile(e.target.files[0])}
            />
          </label>
          <Feelings />
        </div>
        <button
          className="share-button"
          data-testid="share-button"
          type="submit"
        >
          Share
        </button>
      </form>
    </div>
  );
};

export default FeedShare;
