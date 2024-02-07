import axios from "axios";
import { useDispatch } from "react-redux";
import {
  registerSuccess,
  registerFail,
  setUser,
  authError,
  loginSuccess,
  loginFail,
  logoutSuccess,
} from "../redux/authSlices";
import useAlert from "./useAlert";
import { set } from "mongoose";
import setAuthToken from "../utils/setAuthToken";

const useAuth = () => {
  const dispatch = useDispatch();
  const { showAlert } = useAlert();

  const register = async (newUser) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(newUser);
      const res = await axios.post("/api/users", body, config); // proxy in package.json
      dispatch(registerSuccess(res.data));
      loadUser();
    } catch (error) {
      const errors = error.response.data.errors;
      console.error(errors);

      if (errors) {
        errors.forEach((error) => {
          showAlert({ msg: error.msg, alertType: "danger" });
          registerFail();
        });
      }
    }
  };

  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("/api/auth");
      dispatch(setUser(res.data));
    } catch (error) {
      dispatch(authError());
    }
  };

  const login = async (user) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(user);

    try {
      const res = await axios.post("/api/auth", body, config);
      dispatch(loginSuccess(res.data));
      loadUser();
    } catch (error) {
      const errors = error.response.data.errors;
      console.error(errors);

      if (errors) {
        errors.forEach((error) => {
          showAlert({ msg: error.msg, alertType: "danger" });
          dispatch(loginFail());
        });
      }
    }
  };

  const logout = () => {
    dispatch(logoutSuccess());
  };

  return { register, loadUser, login, logout };
};

export default useAuth;
