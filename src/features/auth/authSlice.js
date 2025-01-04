import { createSlice } from "@reduxjs/toolkit";
import { encryptToken, decryptToken } from "./cryptoUtils";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    access: localStorage.getItem("access")
      ? decryptToken(localStorage.getItem("access"))
      : null,
    refresh: localStorage.getItem("refresh")
      ? decryptToken(localStorage.getItem("refresh"))
      : null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { access, refresh } = action.payload;

      // Encrypt tokens before storing
      localStorage.setItem("access", encryptToken(access));
      localStorage.setItem("refresh", encryptToken(refresh));

      state.access = access;
      state.refresh = refresh;
    },
    logOut: (state) => {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      state.access = null;
      state.refresh = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentToken = (state) => state.auth.access;
