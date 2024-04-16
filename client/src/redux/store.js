import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";

export default configureStore({
  reducer: {
    cart: cartSlice,
  },
});

// import { apiSlice } from "../app/apiSlice";
// import authReducer from "../features/auth/authSlice";
// export const store = configureStore({
//   reducer: {
//     [apiSlice.reducerPath]: apiSlice.reducer,
//     auth: authReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }).concat(apiSlice.middleware),
// });
