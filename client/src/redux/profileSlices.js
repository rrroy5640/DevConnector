import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getProfileSuccess: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    },
    getProfileError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearProfileSuccess: (state) => {
      state.profile = null;
      state.loading = false;
    },
    createProfileSuccess: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    },
    createProfileFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getProfilesSuccess: (state, action) => {
      state.profile = null;
      state.profiles = action.payload;
      state.loading = false;
    },
    getProfileByIDSuccess: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    },
    getReposSuccess: (state, action) => {
      state.repos = action.payload;
      state.loading = false;
    },
  },
});

export const {
  getProfileSuccess,
  getProfileError,
  clearProfileSuccess,
  createProfileSuccess,
  createProfileFail,
  getProfilesSuccess,
  getProfileByIDSuccess,
  getReposSuccess
} = profileSlice.actions;
export default profileSlice.reducer;
