import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.user = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logoutUser: (state) => {
      state.user = null;
    },
    followUser: (state, action) => {
      state.user.followings.push(action.payload);
    },
    unfollowUser: (state, action) => {
      state.user.followings = state.user.followings.filter(
        (id) => id !== action.payload
      );
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutUser,
  followUser,
  unfollowUser,
  updateUser,
} = userSlice.actions;
export default userSlice.reducer;
