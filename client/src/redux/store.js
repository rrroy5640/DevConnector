import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./alertSlices";
import authReducer from "./authSlices";
import profileReducer from "./profileSlices";

const store = configureStore({
  reducer: {
    alert: alertReducer,
    auth: authReducer,
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
