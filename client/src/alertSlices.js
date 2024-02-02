import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
const initialState = [
  {
    id: 0,
    msg: "Welcome to the app!",
    alertType: "success",
  },
  {
    id: 1,
    msg: "Please log in.",
    alertType: "info",
  },
  {
    id: 2,
    msg: "Invalid credentials.",
    alertType: "danger",
  },
  {
    id: 3,
    msg: "You have successfully logged out.",
    alertType: "success",
  },
];

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, action) => {
      const id = uuid();
      const newAlert = { id, ...action.payload };
      state.push(newAlert);
    },
    removeAlert: (state, action) => {
      const index = state.findIndex((alert) => alert.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { setAlert, removeAlert } = alertSlice.actions;

export default alertSlice.reducer;
