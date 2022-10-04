import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  friendId: "",
  isLoggedIn: false,
  followed: false,
  allFollowed: [],
  isOwner: true,
  isOwnPosts: false,
  userDataInfo: [],
};

export const userReducer = createSlice({
  name: "users",
  initialState,
  reducers: {
    userId: (state, action) => ({ ...state, userId: action.payload }),
    followed: (state, action) => ({ ...state, followed: action.payload }),
    allFollowed: (state, action) => ({ ...state, allFollowed: action.payload }),
    isOwner: (state, action) => ({ ...state, isOwner: action.payload }),
    isOwnPosts: (state, action) => ({ ...state, isOwnPosts: action.payload }),
    friendId: (state, action) => ({ ...state, friendId: action.payload }),
    userDataInfo: (state, action) => ({
      ...state,
      userDataInfo: action.payload,
    }),
  },
});

export const {
  userId,
  friendId,
  userDataInfo,
  followed,
  allFollowed,
  isOwner,
  isOwnPosts,
} = userReducer.actions;

export default userReducer.reducer;
