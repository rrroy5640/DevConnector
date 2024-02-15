import axios from "axios";
import { useDispatch } from "react-redux";
import {
  getProfileSuccess,
  getProfileError,
  clearProfileSuccess,
  createProfileSuccess,
  createProfileFail,
  getProfilesSuccess,
  getProfileByIDSuccess,
  getReposSuccess
} from "../redux/profileSlices";
import useAlert from "./useAlert";
import { useNavigate } from "react-router-dom";

const useProfile = () => {
  const dispatch = useDispatch();
  const { showAlert } = useAlert();

  const getProfile = async () => {
    try {
      const res = await axios.get("/api/profile/me");
      dispatch(getProfileSuccess(res.data));

    } catch (error) {
      if (error.response) {
        showAlert({ msg: error.response.data.msg, alertType: "danger" });
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

  const deleteExperience = async (id) => {
    try {
      const res = await axios.delete(`/api/profile/experience/${id}`);
      dispatch(createProfileSuccess(res.data));
      showAlert({ msg: "Experience Removed", alertType: "success" });
    } catch (errors) {
      dispatch(createProfileFail(errors.response.data.errors));
      showAlert({ msg: "Experience Removal Failed", alertType: "danger" });
    }
  };

  const deleteEducation = async (id) => {
    try {
      const res = await axios.delete(`/api/profile/education/${id}`);
      dispatch(createProfileSuccess(res.data));
      showAlert({ msg: "Education Removed", alertType: "success" });
    } catch (errors) {
      dispatch(createProfileFail(errors.response.data.errors));
      showAlert({ msg: "Education Removal Failed", alertType: "danger" });
    }
  };

  const deleteAccount = async () => {
    if (window.confirm("Are you sure? This can NOT be undone!")) {
      try {
        await axios.delete("/api/profile");
        dispatch(clearProfileSuccess());
        showAlert({
          msg: "Your account has been permanently deleted",
          alertType: "success",
        });
      } catch (errors) {
        dispatch(createProfileFail(errors.response.data.errors));
        showAlert({ msg: "Account Deletion Failed", alertType: "danger" });
      }
    }
  };

  const getProfiles = async () => {
    try {
      const res = await axios.get("/api/profile");
      dispatch(getProfilesSuccess(res.data));
    } catch (error) {
      if (error.response) {
        dispatch(getProfileError(error.response.data.msg));
        showAlert({ msg: error.response.data.msg, alertType: "danger" });
      }
    }
  };

  const getProfileById = async (id) => {
    try {
      const res = await axios.get(`/api/profile/user/${id}`);
      dispatch(getProfileByIDSuccess(res.data));
    } catch (error) {
      if (error.response) {
        dispatch(getProfileError(error.response.data.msg));
        showAlert({ msg: error.response.data.msg, alertType: "danger" });
      }
    }
  }
  const getRepos = async (username) => {
    try {
        const res = await axios.get(`/api/profile/github/${username}`);
        dispatch(getReposSuccess(res.data));
    } catch (error) {
        dispatch(getProfileError(error.response.data.msg));
        showAlert({ msg: error.response.data.msg, alertType: "danger" });
    }
}

  return {
    getProfile,
    createProfile,
    clearProfile,
    createExperience,
    createEducation,
    deleteExperience,
    deleteEducation,
    deleteAccount,
    getProfiles,
    getProfileById,
    getRepos
  };
};

export default useProfile;