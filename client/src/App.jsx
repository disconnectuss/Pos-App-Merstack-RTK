import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import InvoicePage from "./pages/InvoicePage";
import TablePage from "./pages/TablePage";
import StatisticPage from "./pages/StatisticPage";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ProductPage from "./pages/ProductPage";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cart' element={<CartPage/>}/>
      <Route path='/invoice' element={<InvoicePage/>}/>
      <Route path='/Tables' element={<TablePage/>}/>
      <Route path='/statistics' element={< StatisticPage/>}/>
      <Route path='/products' element={< ProductPage/>}/>
      <Route path='/register' element={< Register/>}/>
      <Route path='/login' element={< Login/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
