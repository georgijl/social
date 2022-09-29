import { FC } from "react";
import { useSelector } from "react-redux";
import Feed from "../feed/Feed";
import Header from "../header/Header";
import { UserState } from "../interfaces/interfaces";
import "./head.scss";

const Head: FC = () => {
  const userId = useSelector((state: UserState) => state.userInfo.userId);

  return (
    <>
      <Header />
      <div className="head">
        <div className="head__feed">
          <Feed userInfo={userId} url="/post/" />
        </div>
      </div>
    </>
  );
};

export default Head;
