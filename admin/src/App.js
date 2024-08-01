import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from "react-hot-toast";

import AuthContext from './contexts/AuthContext';


import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Products from './pages/Products';

import Sidebar from './components/Sidebar';
import Orders from './pages/Orders';

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      <Toaster />
      <div className="w-screen h-screen overflow-hidden">
        {isAuthenticated() ? (
          <div className="w-full h-screen flex">
            <Sidebar />
            <div className="flex-1 p-10 overflow-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<Users/>} />
                <Route path="/products" element={<Products/>} />
                <Route path="/orders" element={<Orders/>} />
              </Routes>
            </div>
          </div>
        ) : (
          <Login />
        )}
      </div>
    </Router>
  );
}

export default App;
