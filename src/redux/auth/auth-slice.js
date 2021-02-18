import { createSlice } from "@reduxjs/toolkit";
import { register, logIn, logOut, fetchCurrentUser } from "./auth-operations";

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  error: null,
  isRefreshingUser: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [register.fulfilled](state, { payload }) {
      console.log(state);
      console.log(payload);
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
    },
    [register.pending](state) {
      state.error = null;
    },
    [register.rejected](state, { payload }) {
      state.error = payload;
    },
    [logIn.fulfilled](state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
    },
    [logIn.pending](state) {
      state.error = null;
    },
    [logIn.rejected](state, { payload }) {
      state.error = payload;
    },
    [logOut.fulfilled](state) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    },
    [logOut.pending](state) {
      state.error = null;
    },
    [logOut.rejected](state, { payload }) {
      state.error = payload;
    },
    [fetchCurrentUser.pending](state) {
      state.isRefreshingUser = true;
      state.error = null;
    },
    [fetchCurrentUser.fulfilled](state, { payload }) {
      state.user = payload;
      state.isLoggedIn = true;
      state.isRefreshingUser = false;
    },

    [fetchCurrentUser.rejected](state, { payload }) {
      state.error = payload;
      state.isRefreshingUser = false;
    },
  },
});

export default authSlice.reducer;
