import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Order from "./pages/order/Order";
import Cart from "./pages/cart/Cart";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import NoPage from "./pages/nopage/Nopage";
import Mystate from "./context/data/Mystate";
import AddProductForm from "./pages/admin/Addproduct";
import Productshow from "./components/productshow/Productshow";
import Updateproduct from "./pages/admin/Updateproduct";
import Singleproduct from "./components/productshow/Singleproduct";

function App() {
  return (
    <>
      <BrowserRouter>
        <Mystate>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/order" element={<Order />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/addproduct" element={<AddProductForm />}></Route>
            <Route path="/updateproduct" element={<Updateproduct />}></Route>
            <Route path="/productshow" element={<Productshow />}></Route>
            <Route path="/singleproduct" element={<Singleproduct />}></Route>
            <Route path="/*" element={<NoPage />}></Route>
          </Routes>
        </Mystate>
      </BrowserRouter>
    </>
  );
}

export default App;
