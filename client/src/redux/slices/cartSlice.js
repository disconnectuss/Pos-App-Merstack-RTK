import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItem: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).cartItem : [],
  total:localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).cartItem : 0,
  price: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).cartItem : 0,
  tax: 5,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state = initialState, action) => {
      const findCartItem = state.cartItem.find(
        (item) => item._id === action.payload._id
      );
      if (findCartItem) {
        findCartItem.quantity = findCartItem.quantity + 1;
      } else {
        state.cartItem.push(action.payload);
      }
      state.total += action.payload.price;
    },
    deleteFromCart: (state = initialState, action) => {
      state.cartItem = state.cartItem.filter(
        (item) => item._id !== action.payload._id
      );
      /* const findCartItemIndex = state.cartItem.findIndex(
        (item)=> item._id === action.payload._id
      )
      if (findCartItemIndex !== -1) {
        state.cartItem.splice(findCartItemIndex, 1);
      } */
      state.total -= action.payload.price * action.payload.quantity;
    },
    increment: (state = initialState, action) => {
      const findItem = state.cartItem.find(
        (item) => item._id === action.payload._id
      );
      findItem.quantity += 1;
      state.total += findItem.price;
    },
    decrement: (state = initialState, action) => {
      const findItem = state.cartItem.find(
        (item) => item._id === action.payload._id
      );
      findItem.quantity -= 1;
      if (findItem.quantity === 0) {
        state.cartItem = state.cartItem.filter(
          (item) => item._id !== action.payload._id
        );
      }
      state.total -= findItem.price;
    },
    reset: (state = initialState) => {
      state.cartItem = [];
      state.total = 0;
    },
  }  
});

export const { addToCart, deleteFromCart, increment, decrement, reset } =
  cartSlice.actions;

export default cartSlice.reducer;
