import axios from "axios";
import { useDispatch } from "react-redux";
import {
  getProfileSuccess,
  getProfileError,
  clearProfileSuccess,
  createProfileSuccess,
  createProfileFail,
} from "../redux/profileSlices";
import useAlert from "./useAlert";

const useProfile = () => {
  const dispatch = useDispatch();
  const { showAlert } = useAlert();

  const getProfile = async () => {
    try {
      const res = await axios.get("/api/profile/me");
      dispatch(getProfileSuccess(res.data));
    } catch (error) {
      if (error.response) {
        dispatch(getProfileError(error.response.data.msg)); //showAlert({ msg: error.response.data.msg, alertType: "danger" });
      }
    }
  };

  const clearProfile = () => {
    dispatch(clearProfileSuccess());
  };

  const createProfile = async (formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("/api/profile/me", formData, config);
      dispatch(createProfileSuccess(res.data));
      showAlert({ msg: "Profile Created", alertType: "success" });
    } catch (errors) {
      dispatch(createProfileFail(errors.response.data.errors));
      showAlert({ msg: "Profile Creation Failed", alertType: "danger" });
    }
  };

  const createExperience = async (formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.put("/api/profile/experience", formData, config);
      dispatch(createProfileSuccess(res.data));
      showAlert({ msg: "Experience Added", alertType: "success" });
    } catch (errors) {
      dispatch(createProfileFail(errors.response.data.errors));
      showAlert({ msg: "Experience Creation Failed", alertType: "danger" });
    }
  };
  
  const createEducation = async (formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.put("/api/profile/education", formData, config);
      dispatch(createProfileSuccess(res.data));
      showAlert({ msg: "Education Added", alertType: "success" });
    } catch (errors) {
      dispatch(createProfileFail(errors.response.data.errors));
      showAlert({ msg: "Education Creation Failed", alertType: "danger" });
    }
  };

  return { getProfile, createProfile, clearProfile, createExperience, createEducation };
};

export default useProfile;
