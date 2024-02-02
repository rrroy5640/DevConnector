import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./alertSlices";

const store = configureStore({
    reducer:{
        alert: alertReducer,
    }
});

export default store;