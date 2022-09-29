import { EmojiEmotions } from "@material-ui/icons";
import { FC, useState } from "react";
import Picker from "emoji-picker-react";
import "./feelings.scss";
import { useDispatch, useSelector } from "react-redux";
import { Feeling } from "../interfaces/interfaces";
import { feelings } from "../../redux/postReducer";

const Feelings: FC = () => {
  const chosenEmoji = useSelector((state: Feeling) => state.post.feelings);
  const [isOpened, setIsOpened] = useState(false);
  const dispatch = useDispatch();

  const handleIsOpened = () => {
    setIsOpened(!isOpened);
  };

  const onEmojiClick = (_event: any, emojiObject: any) => {
    dispatch(feelings(emojiObject.emoji));

    handleIsOpened();
  };

  return (
    <div className="share-option">
      <span className="share-option__text" onClick={handleIsOpened}>
        {chosenEmoji ? (
          <>Feeling {chosenEmoji}</>
        ) : (
          <>
            Feeling
            <EmojiEmotions htmlColor="goldenrod" className="share-icon" />
          </>
        )}
        {isOpened && <Picker onEmojiClick={onEmojiClick} />}
      </span>
    </div>
  );
};

export default Feelings;
