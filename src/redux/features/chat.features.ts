import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import usersApi from "../../services/users.api";

interface InitialState {
  isLoading: boolean;
  error: string | null;
  currentUser: null | number;
  success: string | null;
}

const initialState: InitialState = {
  isLoading: false,
  error: null,
  currentUser: null,
  success: null,
};

export const chat = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<number>) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: () => {},
});

export const { setCurrentUser } = chat.actions;
export default chat.reducer;
