import { useCallback, useEffect } from "react";
import HomePage from "./components/homePage/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import UserProfile from "./components/profile/UserProfile";
import { UserState } from "./components/interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import SuggestedProfiles from "./components/suggestedProfiles/SuggestedProfiles";
import { userDataInfo } from "./redux/userReducer";
import { getUserInfo } from "./utils/getUserInfo";
import "./App.css";
import FriendProfileUser from "./components/friendProfileUser/FriendProfileUser";

function App() {
  const dispatch = useDispatch();
  const userId = useSelector((state: UserState) => state.userInfo.userId);

  const fetchUserInfo = useCallback(async () => {
    const data = await getUserInfo(userId, "/user/");

    if (data) dispatch(userDataInfo(data));
  }, [dispatch, userId]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/:username" element={<UserProfile />} />
        <Route
          path="/profile/friend/:username"
          element={<FriendProfileUser />}
        />
        <Route path={`/profile/suggested`} element={<SuggestedProfiles />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
