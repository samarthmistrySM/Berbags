import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import AuthContext from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Shop from './pages/Shop'
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Orders from "./pages/Orders";
import UserProfile from "./pages/UserProfile";

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div className="App">
      <Toaster />
      {isAuthenticated() ? (
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/orders" element={<Orders/>} />
            <Route path="/product/:productId" element={<Product/>} />
            <Route path="/profile" element={<UserProfile/>} />
            <Route path="*" element={<Shop/>} />
          </Routes>
        </Router>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
