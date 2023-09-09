import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  wishList: [],
  singleProductDetails: [],
};

const getStorage = (type) => {
  const storage = localStorage.getItem(`gov-ecom-${type}`);
  if (!storage) {
    localStorage.setItem(`gov-ecom-${type}`, JSON.stringify([]));
    return [];
  }
  return JSON.parse(storage);
};
const updateStorage = (type, item) => {
  localStorage.setItem(`gov-ecom-${type}`, JSON.stringify(item));
};

export const cartWishlist = createSlice({
  name: "cartAndWishlist",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const cart = getStorage("cart");

      const itemIndex = state.cart.findIndex(
        (prod) => prod._id === action.payload._id
      );
      if (itemIndex === -1) {
        cart.push({ ...action.payload, quantity: 1 });
      } else {
        cart[itemIndex].quantity += 1;
      }

      updateStorage("cart", cart);
      state.cart = cart;
    },
    addToWishList: (state, action) => {
      const wishlist = getStorage("wishlist");
      const itemIndex = state.wishList.findIndex(
        (prod) => prod._id === action.payload._id
      );
      if (itemIndex === -1) {
        wishlist.push({ ...action.payload, quantity: 1 });
      } else {
        wishlist[itemIndex].quantity += 1;
      }
      updateStorage("wishlist", wishlist);
      state.wishList = wishlist;
    },
    loadDefaultStorage: (state) => {
      state.cart = getStorage("cart");
      state.wishList = getStorage("wishlist");
    },
    moveWhishlistToCart: (state) => {
      state.cart = [...state.cart, ...state.wishList];
      state.wishList = [];
      updateStorage("wishlist", []);
      updateStorage("cart", state.cart);
    },
    buySingleProduct: (state, action) => {
      const singleProductDetails = getStorage("singleProductDetails");
      singleProductDetails[0] = action.payload;
      singleProductDetails[0].quantity = 1;
      updateStorage("singleProductDetails", singleProductDetails);
      state.singleProductDetails = singleProductDetails;
    },

    deleteFromCart: (state, action) => {
      const cart = getStorage("cart");
      const itemIndex = state.cart.findIndex(
        (prod) => prod._id === action.payload
      );
      cart.splice(itemIndex, 1);
      updateStorage("cart", cart);
      state.cart = cart;
    },
    deleteFromWishList: (state, action) => {
      const wishlist = getStorage("wishlist");
      const itemIndex = state.wishList.findIndex(
        (prod) => prod._id === action.payload
      );
      wishlist.splice(itemIndex, 1);

      updateStorage("wishlist", wishlist);
      state.wishList = wishlist;
    },

    emptyCart: (state) => {
      updateStorage("cart", []);
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  addToWishList,
  loadDefaultStorage,
  moveWhishlistToCart,
  buySingleProduct,
  deleteFromCart,
  deleteFromWishList,
  emptyCart,
} = cartWishlist.actions;

export default cartWishlist.reducer;
