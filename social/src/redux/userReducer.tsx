import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  friendId: "",
  isLoggedIn: false,
  suggestedId: "",
  followed: false,
  allFollowed: [],
  isOwner: true,
  userDataInfo: [],
  userFriendInfo: [],
};

export const userReducer = createSlice({
  name: "users",
  initialState,
  reducers: {
    userId: (state, action) => ({ ...state, userId: action.payload }),
    followed: (state, action) => ({ ...state, followed: action.payload }),
    allFollowed: (state, action) => ({ ...state, allFollowed: action.payload }),
    isOwner: (state, action) => ({ ...state, isOwner: action.payload }),
    suggestedId: (state, action) => ({ ...state, suggestedId: action.payload }),
    friendId: (state, action) => ({ ...state, friendId: action.payload }),
    userFriendInfo: (state, action) => ({
      ...state,
      userFriendInfo: action.payload,
    }),
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
  userFriendInfo,
  suggestedId,
  followed,
  allFollowed,
  isOwner,
} = userReducer.actions;

export default userReducer.reducer;
