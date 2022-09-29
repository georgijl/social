import { createSlice } from "@reduxjs/toolkit";

export const postReducer = createSlice({
  name: "posts",
  initialState: {
    clicked: false,
    feelings: "",
  },
  reducers: {
    feelings: (state, action) => ({ ...state, feelings: action.payload }),
    fetched: (state, action) => ({ ...state, clicked: action.payload }),
  },
});

export const { feelings, fetched } = postReducer.actions;

export default postReducer.reducer;
