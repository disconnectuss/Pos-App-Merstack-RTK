import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItem: [], 
  total: 0,
  price:0,
  tax: 5,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state = initialState, action) => {
      const findCartItem = state.cartItem.find(
        (item)=> item._id === action.payload._id
      )
      if (findCartItem){
        findCartItem.quantity = findCartItem.quantity + 1;
      } else {
        state.cartItem.push(action.payload);
      }
      state.total += action.payload.price
    },
    deleteFromCart: (state = initialState, action) => {
      state.cartItem = state.cartItem.filter(
        (item)=> item._id !== action.payload._id
      )
      /* const findCartItemIndex = state.cartItem.findIndex(
        (item)=> item._id === action.payload._id
      )
      if (findCartItemIndex !== -1) {
        state.cartItem.splice(findCartItemIndex, 1);
      } */
      state.total -= action.payload.price * action.payload.quantity
    },
  },
});

export const { addToCart, deleteFromCart } = cartSlice.actions;

export default cartSlice.reducer;
