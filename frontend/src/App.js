import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import AuthContext from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Shop from './pages/Shop'
import Cart from "./pages/Cart";

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
            <Route path="/orders" element={<p>this is orders</p>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/profile" element={<p>this is profile</p>} />
          </Routes>
        </Router>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
