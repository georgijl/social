import { EditOutlined } from "@material-ui/icons";
import axios from "axios";
import { ChangeEvent, FC, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userDataInfo } from "../../redux/userReducer";
import { UserDataInfo, UserState } from "../interfaces/interfaces";

interface Files {
  files: any | undefined;
}

const ProfileImg: FC = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState<Files>();
  const userId = useSelector((state: UserState) => state.userInfo.userId);
  const profile = useSelector(
    (state: UserDataInfo) => state.userInfo.userDataInfo.picture
  );
  const isOwn = useSelector((state: UserState) => state.userInfo.isOwner);

  const handleProfileImg = useCallback(async () => {
    if (!file) return;

    const data = new FormData();
    const fileName = Date.now() + file.files.name;
    data.append("name", fileName);
    data.append("file", file.files);

    await axios.post("/upload", data);
    try {
      await axios.put(`/user/profile/${userId}`, { fileName });
      dispatch(
        userDataInfo({
          picture: fileName,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, file, userId]);

  const handleEditPhoto = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile({ files: e.target.files[0] });
    handleProfileImg();
  };

  return (
    <div className="profile-content__profile">
      <img
        className="profile-content__person"
        src={
          profile
            ? require(`../../../../social/src/images/${profile}`)
            : require("../../images/noAvatar.png")
        }
        alt="personImg"
      />
      {isOwn && (
        <label htmlFor="profilePicture">
          <EditOutlined className="profile-content__cover-edit" />
          <input
            id="profilePicture"
            type="file"
            accept=".png,.jpeg,.jpg"
            onChange={handleEditPhoto}
          />
        </label>
      )}
    </div>
  );
};

export default ProfileImg;
