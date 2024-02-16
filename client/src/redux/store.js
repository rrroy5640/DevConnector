import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./alertSlices";
import authReducer from "./authSlices";
import profileReducer from "./profileSlices";
import postReducer from "./postSlices";

const store = configureStore({
  reducer: {
    alert: alertReducer,
    auth: authReducer,
    profile: profileReducer,
    post: postReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
