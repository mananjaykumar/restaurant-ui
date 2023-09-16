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
  AdminData: userDataType | null;
}

// Define the initial state using that type
const initialState: AuthState = {
  userData: JSON.parse(localStorage.getItem("userData") || "{}") || null,
  AdminData: JSON.parse(localStorage.getItem("AdminData") || "{}") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  //   reducers: {
  //     // Reducer function for Adding a User.
  //     addUser(state, action: PayloadAction<AuthState>) {
  //       state.push(action.payload); // Simply push the new user details
  //     },
  //     // Reducer function for Deleting a User.
  //     deleteUser(state, action) {
  //       state.splice(action.payload, 1); // Remove the user from the state
  //     },
  //     // Reducer function for Updating a User.
  //     udpdateUser(state, action) {
  //       const newState = [...state]; // making copy of the state
  //       newState[action.payload.index] = {
  //         // updating the properties of the particular user detected by the index number
  //         ...newState[action.payload.index],
  //         firstname: action.payload.firstname,
  //         lastname: action.payload.lastname,
  //         status: action.payload.status,
  //       };
  //       return newState; // returning new state
  //     },
  //   },
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

    // For Admin
    //Reducer function to login
    AdminLogin: (state, action) => {
      localStorage.setItem(
        "AdminData",
        JSON.stringify(action.payload.adminInfo)
      );
      state.AdminData = action.payload.adminInfo;
      // console.log('state', state);
      // console.log('action', action);
    },
    //Reducer function to logout
    AdminLogout: (state) => {
      state.AdminData = null;
      localStorage.removeItem("AdminData");
    },
  },
});

export default authSlice.reducer;

export const { login, logout, AdminLogin, AdminLogout } = authSlice.actions;
