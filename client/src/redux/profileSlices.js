import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

const profileSlice = createSlice({
    name : "profile",
    initialState,
    reducers:{
     getProfileSuccess: (state, action ) =>{
            state.profile = action.payload;
            state.loading = false;
     },
     getProfileError: (state, action) =>{
            state.error = action.payload;
            state.loading = false;
     },
     clearProfileSuccess: (state) =>{
            state.profile = null;
            state.loading = false;
     },
     createProfileSuccess: (state, action) =>{
            state.profile = action.payload;
            state.loading = false;
     },
     createProfileFail: (state, action) =>{
            state.error = action.payload;
            state.loading = false;
     }
    }
})

export const { getProfileSuccess, getProfileError, clearProfileSuccess, createProfileSuccess, createProfileFail } = profileSlice.actions;
export default profileSlice.reducer;