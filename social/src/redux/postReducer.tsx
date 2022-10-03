import { createSlice } from "@reduxjs/toolkit";

export const postReducer = createSlice({
  name: "posts",
  initialState: {
    clicked: false,
    isSuggested: false,
    handleFetchedFollow: false,
    feelings: "",
    login: "",
  },
  reducers: {
    feelings: (state, action) => ({ ...state, feelings: action.payload }),
    fetched: (state, action) => ({ ...state, clicked: action.payload }),
    fetchedFollow: (state, action) => ({
      ...state,
      handleFetchedFollow: action.payload,
    }),
    login: (state, action) => ({ ...state, login: action.payload }),
    isSuggested: (state, action) => ({ ...state, isSuggested: action.payload }),
  },
});

export const { feelings, fetched, login, isSuggested, fetchedFollow } =
  postReducer.actions;

export default postReducer.reducer;
