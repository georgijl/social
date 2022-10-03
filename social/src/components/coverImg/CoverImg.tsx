import axios from "axios";
import { FC, useCallback, useState } from "react";
import { EditOutlined } from "@material-ui/icons";
import { UserState } from "../interfaces/interfaces";
import { useSelector } from "react-redux";
import { Cover } from "./coverImgInterfaces";

const CoverImg: FC<Cover> = ({ cover }) => {
  const userId = useSelector((state: UserState) => state.userInfo.userId);
  const isOwn = useSelector((state: UserState) => state.userInfo.isOwner);

  const [file, setFile] = useState<any | undefined>();

  const handleCoverImg = useCallback(async () => {
    if (!file) return;

    const data = new FormData();
    const fileName = Date.now() + file.name;
    data.append("name", fileName);
    data.append("file", file);

    await axios.post("/upload", data);
    await axios.put(`/user/cover/${userId}`, {
      fileName,
    });
  }, [file, userId]);

  return (
    <div className="profile-content__cover">
      <img
        className="profile-content__cover-img"
        src={
          cover
            ? require(`../../../../social/src/images/${cover}`)
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
