import axios from "axios";
import { FC, useCallback, useState } from "react";
import { EditOutlined } from "@material-ui/icons";
import { UserState, UserDataInfo } from "../interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { userDataInfo } from "../../redux/userReducer";

const CoverImg: FC = () => {
  const userId = useSelector((state: UserState) => state.userInfo.userId);
  const user = useSelector(
    (state: UserDataInfo) => state.userInfo.userDataInfo
  );
  const isOwn = useSelector((state: UserState) => state.userInfo.isOwner);

  const dispatch = useDispatch();
  const [file, setFile] = useState<any | undefined>();

  const handleCoverImg = useCallback(async () => {
    if (!file) return;

    const data = new FormData();
    const fileName = Date.now() + file.name;
    data.append("name", fileName);
    data.append("file", file);
    await axios.post("/upload", data);
    try {
      await axios.put(`/user/cover/${userId}`, {
        fileName,
      });
      dispatch(
        userDataInfo({
          cover_photo: fileName,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, file, userId]);

  return (
    <div className="profile-content__cover">
      <img
        className="profile-content__cover-img"
        src={
          user.cover_photo
            ? require(`../../../../social/src/images/${user.cover_photo}`)
            : require("../../images/noCover.jpg")
        }
        alt="coverImg"
      />
      {isOwn && (
        <label htmlFor="file">
          <EditOutlined className="profile-content__cover-edit" />
          <input
            id="file"
            type="file"
            accept=".png,.jpeg,.jpg"
            onChange={(e) => {
              e.target.files && setFile(e.target.files[0]);
              handleCoverImg();
            }}
          />
        </label>
      )}
    </div>
  );
};

export default CoverImg;
