import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isAuthenticated: false,
};

const { actions, reducer } = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      const token = action.payload;
      state.token = token;
      state.isAuthenticated = true;
    },
    logoutSuccess(state, action) {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logoutSuccess } = actions;
export default reducer;
