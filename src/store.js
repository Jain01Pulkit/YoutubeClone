import { configureStore } from "@reduxjs/toolkit";
import AppSlice from "./slices/AppSlice";
import searchCacheSlice from "./slices/searchCacheSlice";
import chatSlice from "./slices/chatSlice";
import UserSlice from "./slices/UserSlice";

export const store = configureStore({
  reducer: {
    app: AppSlice,
    search: searchCacheSlice,
    chat: chatSlice,
    user: UserSlice,
  },
});
