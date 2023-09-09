import { configureStore } from "@reduxjs/toolkit";
import cartWishlist from "./cartAndWislistSlice";
import userAuth from "./userAuthSlice";

const store = configureStore({
  reducer: {
    cartWishlist: cartWishlist,
    userAuth: userAuth,
  },
});

export default store;
