import { createSlice } from "@reduxjs/toolkit";

export const postReducer = createSlice({
  name: "posts",
  initialState: {
    clicked: false,
    feelings: "",
    login: "",
  },
  reducers: {
    feelings: (state, action) => ({ ...state, feelings: action.payload }),
    fetched: (state, action) => ({ ...state, clicked: action.payload }),
    login: (state, action) => ({ ...state, login: action.payload }),
  },
});

export const { feelings, fetched, login } = postReducer.actions;

export default postReducer.reducer;
