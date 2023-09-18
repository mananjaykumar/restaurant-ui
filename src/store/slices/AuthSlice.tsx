/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

// inteface for the types
interface userDataType {
  email: string;
  token: string;
  message: string;
  user_id: string;
  firstName: string;
}

interface AuthState {
  userData: userDataType | null;
}

// Define the initial state using that type
const initialState: AuthState = {
  userData: JSON.parse(localStorage.getItem("userData") || "{}") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // For Users
    //Reducer function to login
    login: (state, action) => {
      localStorage.setItem("userData", JSON.stringify(action.payload.userInfo));
      state.userData = action.payload.userInfo;
      // console.log('state', state);
      // console.log('action', action);
    },
    //Reducer function to logout
    logout: (state) => {
      state.userData = null;
      localStorage.removeItem("userData");
    },
  },
});

export default authSlice.reducer;

export const { login, logout } = authSlice.actions;
