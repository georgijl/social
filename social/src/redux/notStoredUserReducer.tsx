import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDataSuggestions: [],
};

export const userReducer = createSlice({
  name: "userData",
  initialState,
  reducers: {
    userDataSuggestions: (state, action) => ({
      ...state,
      userDataInfo: action.payload,
    }),
  },
});

export const { userDataSuggestions } = userReducer.actions;

export default userReducer.reducer;
