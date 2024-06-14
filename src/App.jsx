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
import Login from "./pages/registation/Login";
import SignUp from "./pages/registation/Signup";

// Protected route for authenticated users
const ProtectedRoutes = ({ children }) => {
  const user = localStorage.getItem("user");
  console.log('ok');
  return user ? children : <Navigate to="/" />;
};

// Protected route for admin users
const ProtectedRoutesForAdmin = ({ children }) => {
  console.log('ok');
  const admin = JSON.parse(localStorage.getItem("user"));
  console.log(admin.user.email);
  return admin?.user?.email === "admin@gmail.com" ? (
    children
  ) : (
    <Navigate to="/" />
  );
};
function App() {
  return (
    <>
      <BrowserRouter>
        <Mystate>
          <Routes>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/" element={<Login />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route
              path="/order"
              element={
                <ProtectedRoutes>
                  <Order />
                </ProtectedRoutes>
              }
            />
            <Route path="/cart" element={<Cart />}></Route>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoutesForAdmin>
                  <Dashboard />
                </ProtectedRoutesForAdmin>
              }
            />
            <Route
              path="/addproduct"
              element={
                <ProtectedRoutesForAdmin>
                  <AddProductForm />
                </ProtectedRoutesForAdmin>
              }
            />
            <Route
              path="/updateproduct"
              element={
                <ProtectedRoutesForAdmin>
                  <Updateproduct />
                </ProtectedRoutesForAdmin>
              }
            />
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
