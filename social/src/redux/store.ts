import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import userReducer from "./userReducer";
import postReducer from "./postReducer";
import userDataSuggestions from "./notStoredUserReducer";
import storage from "redux-persist/es/storage";

const persistConfig = {
  timeout: 20,
  key: "root",
  storage,
};

const userPrersistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    userInfo: userPrersistedReducer,
    post: postReducer,
    userData: userDataSuggestions,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
