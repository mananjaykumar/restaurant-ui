import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/AuthSlice";
import togglerSlice from "./slices/TogglerSlice";
import CartSlice from "./slices/CartSlice";

const store = configureStore({
  // root reducer
  reducer: {
    auth: authSlice,
    toggle: togglerSlice,
    cart: CartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
