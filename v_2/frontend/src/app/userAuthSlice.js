import { authUserInternal } from "@/ApiAuthHelper";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isUserAuth: false,
  isSeller: false,
};

export const userAuth = createSlice({
  name: "UserAuthSlice",
  initialState,
  reducers: {
    authUser: (state, action) => {
      const user = action.payload;
      state.user = user;
      state.isUserAuth = true;
      state.isSeller = user?.role === 1;
      authUserInternal(user);
    },
    signOut: (state) => {
      state.user = {};
      state.isUserAuth = false;
      state.isSeller = false;

      authUserInternal({});
    },
    loadLocalAuth: (state) => {
      const localAuth = localStorage.getItem("gov-ecom-auth");
      if (!localAuth || localAuth === "undefined") return;

      state.user = JSON.parse(localAuth);
      state.isSeller = JSON.parse(localAuth).role === 1;
      state.isUserAuth = JSON.parse(localAuth).role ? true : false;
    },
  },
});

export const { authUser, signOut, loadLocalAuth } = userAuth.actions;

export default userAuth.reducer;
