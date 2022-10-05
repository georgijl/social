import { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Head from "../../screens/head/Head";
import { UserState } from "../interfaces/interfaces";

const HomePage: FC = () => {
  const isLoggedIn = useSelector((state: UserState) => state.userInfo.userId);

  return (
    <div className="wrapper">
      {!isLoggedIn ? <Navigate to="/login" /> : <Head />}
    </div>
  );
};

export default HomePage;
