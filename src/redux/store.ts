import { configureStore } from "@reduxjs/toolkit";
import authFeature from "./features/auth.feature";
import usersFeature from "./features/users.feature";
import apiSlice from "./features";
import chatFeatures from "./features/chat.features";

export const store = configureStore({
  reducer: {
    login: authFeature.login,
    api: apiSlice.reducer,
    users: usersFeature,
    chat: chatFeatures,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
