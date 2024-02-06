import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./alertSlices";
import authReducer from "./authSlices";

const store = configureStore({
  reducer: {
    alert: alertReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
