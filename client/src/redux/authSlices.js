import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    loading: true,
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        registerSuccess: (state, action) =>{
            const { token } = action.payload;
            localStorage.setItem("token", token);
            state.token = token;
            state.isAuthenticated = true;
            state.loading = false;
        },
        registerFail: (state) =>{
            localStorage.removeItem("token");
            state.token = null;
            state.isAuthenticated = false;
            state.loading = false;
        },
        setUser: (state, action) =>{
            state.isAuthenticated = true;
            state.loading = false;
            state.user = action.payload;
        },
        authError: (state) =>{
            localStorage.removeItem("token");
            state.token = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.user = null;
        },
        loginSuccess: (state, action) =>{
            const { token } = action.payload;
            localStorage.setItem("token", token);
            state.token = token;
            state.isAuthenticated = true;
            state.loading = false;
        },
        loginFail: (state) =>{
            localStorage.removeItem("token");
            state.token = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.user = null;
        },
        logoutSuccess: (state)=>{
            localStorage.removeItem("token");
            state.token = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.user = null;
        }
    }
});

export const { registerSuccess, registerFail, setUser, authError, loginSuccess, loginFail, logoutSuccess} = authSlice.actions;
export default authSlice.reducer;