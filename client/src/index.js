import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>{" "}
  </Provider>
);
