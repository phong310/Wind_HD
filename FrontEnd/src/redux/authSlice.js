import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: "auth",
    initialState: {
        register: {
            newUser: null,
            isFetching: false,
            error: false
        },
        login: {
            currentUser: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        // REGISTER
        registerStart: (state) => {
            state.register.isFetching = true;
        },
        registerSuccess: (state, actions) => {
            state.register.isFetching = false;
            state.register.newUser = actions.payload;
            state.register.error = false;
        },
        registerFailed: (state) => {
            state.register.isFetching = false;
            state.register.error = true
        },

        // LOGIN
        loginStart: (state) => {
            state.login.isFetching = true;
        },

        loginSuccess: (state, actions) => {
            state.login.isFetching = false;
            state.login.currentUser = actions.payload;
            state.login.error = false;
        },

        loginFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },

        // LOGOUT
        logOutStart: (state) => {
            state.login.isFetching = true;
        },
        logOutSuccess: (state) => {
            state.login.isFetching = false;
            state.login.currentUser = null;
            state.login.error = false;
        },

        logOutFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },

        // UPDATE PROFILE
        updateProfileSuccess: (state, action) => {
            state.login.currentUser = {
                ...state.login.currentUser,
                user: {
                    ...state.login.currentUser.user,
                    ...action.payload
                }
            };
        },

        // REFRESH TOKEN
        refreshAccessToken: (state, action) => {
            state.login.currentUser.accessToken = action.payload;
        },
    }
});

export const { 
    registerStart, 
    registerSuccess,
    registerFailed, 
    loginStart, 
    loginSuccess, 
    loginFailed, 
    logOutStart, 
    logOutSuccess, 
    logOutFailed, 
    updateProfileSuccess,
} = authSlice.actions;

export default authSlice.reducer