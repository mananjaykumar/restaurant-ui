import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/AuthSlice";
import togglerSlice from "./slices/TogglerSlice";

const store = configureStore({
  // root reducer
  reducer: {
    auth: authSlice,
    toggle: togglerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
