import { EditOutlined } from "@material-ui/icons";
import axios from "axios";
import { ChangeEvent, FC, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { UserState } from "../interfaces/interfaces";
import { Files, Picture } from "./profileImgInterfaces";

const ProfileImg: FC<Picture> = ({ picture }) => {
  const [file, setFile] = useState<Files>();
  const userId = useSelector((state: UserState) => state.userInfo.userId);

  const isOwn = useSelector((state: UserState) => state.userInfo.isOwner);

  const handleProfileImg = useCallback(async () => {
    if (!file) return;

    const data = new FormData();
    const fileName = Date.now() + file.files.name;
    data.append("name", fileName);
    data.append("file", file.files);

    await axios.post("/upload", data);
    await axios.put(`/user/profile/${userId}`, { fileName });
  }, [file, userId]);

  const handleEditPhoto = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile({ files: e.target.files[0] });
    handleProfileImg();
  };

  return (
    <div className="profile-content__profile">
      <img
        className="profile-content__person"
        src={
          picture
            ? require(`../../../../social/src/images/${picture}`)
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
