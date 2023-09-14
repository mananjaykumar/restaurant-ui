import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/AuthSlice";
// import toggleSlice from './slices/ToggleSlice';

const store = configureStore({
  // root reducer
  reducer: {
    auth: authSlice,
    // toggle: toggleSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
