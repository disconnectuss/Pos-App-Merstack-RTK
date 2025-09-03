import { createSlice } from "@reduxjs/toolkit";

// Helper function to save cart to localStorage
const saveCartToLocalStorage = (state) => {
  localStorage.setItem('cart', JSON.stringify({
    cartItem: state.cartItem,
    total: state.total,
    price: state.price,
    tax: state.tax
  }));
};

// Helper function to calculate total
const calculateTotal = (cartItems) => {
  return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
};

const initialState = {
  cartItem: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).cartItem : [],
  total: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).total || 0 : 0,
  price: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).price || 0 : 0,
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
      state.total = calculateTotal(state.cartItem);
      saveCartToLocalStorage(state);
    },
    deleteFromCart: (state = initialState, action) => {
      state.cartItem = state.cartItem.filter(
        (item) => item._id !== action.payload._id
      );
      state.total = calculateTotal(state.cartItem);
      saveCartToLocalStorage(state);
    },
    increment: (state = initialState, action) => {
      const findItem = state.cartItem.find(
        (item) => item._id === action.payload._id
      );
      findItem.quantity += 1;
      state.total = calculateTotal(state.cartItem);
      saveCartToLocalStorage(state);
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
      state.total = calculateTotal(state.cartItem);
      saveCartToLocalStorage(state);
    },
    reset: (state = initialState) => {
      state.cartItem = [];
      state.total = 0;
      saveCartToLocalStorage(state);
    },
  }  
});

export const { addToCart, deleteFromCart, increment, decrement, reset } =
  cartSlice.actions;

export default cartSlice.reducer;
