import React, { useState } from 'react';
import {  FaUser, FaShoppingBag, FaBars, FaShoppingCart } from 'react-icons/fa';
import { MdDashboard } from "react-icons/md";

import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`h-screen ${isCollapsed ? 'w-20' : 'w-64'} bg-white border-r border-gray-200 transition-all duration-300`}>
      <div className="flex items-center justify-between p-4">
        <h1 className={`font-bold ${isCollapsed ? 'hidden' : ''}`}>Berbags.</h1>
        <button onClick={toggleSidebar} className="text-gray-600">
          <FaBars />
        </button>
      </div>
      <ul className="mt-10">
        <li className="hover:bg-gray-100">
          <NavLink 
            to="/" 
            className="flex justify-start items-center p-4 w-full" 
          >
            <MdDashboard className="text-gray-600" />
            <span className={`text-gray-600 ml-4 ${isCollapsed ? 'hidden' : 'inline'}`}>Home</span>
          </NavLink>
        </li>
        <li className="hover:bg-gray-100">
          <NavLink 
            to="/users" 
            className="flex justify-start items-center p-4 w-full" 
          >
            <FaUser className="text-gray-600" />
            <span className={`text-gray-600 ml-4 ${isCollapsed ? 'hidden' : 'inline'}`}>Users</span>
          </NavLink>
        </li>
        <li className="hover:bg-gray-100">
          <NavLink 
            to="/products" 
            className="flex justify-start items-center p-4 w-full" 
          >
            <FaShoppingBag className="text-gray-600" />
            <span className={`text-gray-600 ml-4 ${isCollapsed ? 'hidden' : 'inline'}`}>Products</span>
          </NavLink>
        </li>
        <li className="hover:bg-gray-100">
          <NavLink 
            to="/orders" 
            className="flex justify-start items-center p-4 w-full" 
          >
            <FaShoppingCart className="text-gray-600" />
            <span className={`text-gray-600 ml-4 ${isCollapsed ? 'hidden' : 'inline'}`}>Orders</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
