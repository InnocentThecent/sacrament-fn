import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { loginUser as login } from "../../services/auth.api";

interface InitialState {
  isLoading: boolean;
  error: string;
  isAuth: boolean;
  user: any;
}
const initialState: InitialState = {
  isLoading: false,
  error: "",
  isAuth: false,
  user: null,
};

export const authSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("auth");
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      login.fulfilled,
      (
        state,
        action: PayloadAction<{
          user: any;
          tokens: {
            accessToken: string;
            refreshToken: string;
          };
        }>
      ) => {
        localStorage.setItem("auth_token", action.payload.tokens.accessToken);
        state.isLoading = false;
        state.error = "";
        state.user = action.payload.user;
      }
    );
    builder.addCase(login.rejected, (state, action: any) => {
      state.isLoading = false;
      state.error = action.payload.message;
    });
  },
});

export const { logout } = authSlice.actions;

export default { login: authSlice.reducer };
