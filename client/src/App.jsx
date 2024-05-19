import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import InvoicePage from "./pages/InvoicePage";
import TablePage from "./pages/TablePage";
import StatisticPage from "./pages/StatisticPage";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ProductPage from "./pages/ProductPage";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {

  const cart = useSelector((state)=> state.cart)
  // console.log(cart)
   useEffect(()=> {
    localStorage.setItem('cart', JSON.stringify(cart));
   }, [cart])
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RouteControl>
              <Home />
            </RouteControl>
          }
        />
        <Route
          path="/cart"
          element={
            <RouteControl>
              <CartPage />
            </RouteControl>
          }
        />
        <Route
          path="/invoice"
          element={
            <RouteControl>
              <InvoicePage />
            </RouteControl>
          }
        />
        <Route path="/Tables" element={<TablePage />} />
        <Route
          path="/statistics"
          element={
            <RouteControl>
              <StatisticPage />
            </RouteControl>
          }
        />
        <Route
          path="/products"
          element={
            <RouteControl>
              <ProductPage />
            </RouteControl>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

export const RouteControl = ({ children }) => {
  if (localStorage.getItem("posUser")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
