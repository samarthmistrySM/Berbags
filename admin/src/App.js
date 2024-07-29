// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import AuthContext from './contexts/AuthContext';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import 'tailwindcss/tailwind.css';

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      <div className="w-screen h-screen overflow-hidden">
        {isAuthenticated() ? (
          <div className="w-full h-screen flex">
            <Sidebar />
            <div className="flex-1 p-10 overflow-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<p>This is users</p>} />
                <Route path="/products" element={<p>This is products</p>} />
                <Route path="/orders" element={<p>This is orders</p>} />
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
