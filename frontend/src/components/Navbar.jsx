import React,{useContext} from "react";
import logo from "../assets/logo.svg";
import { NavLink, Link } from "react-router-dom";

import AuthContext from "../context/AuthContext";


export default function Navbar() {
  const {handleLogout} = useContext(AuthContext)

  return (
    <div className="w-screen overflow-hidden px-10 flex justify-between items-center py-3">
      <Link to={"/"}>
      <div className="logo flex items-center">
        <img src={logo} className="w-8 h-8" alt="logo" />
        <h1 className="text-3xl px-2">Berbags.</h1>
      </div>
      </Link>
      <div className="links">
        <ul className="flex">
          <li className="px-2">
            <NavLink
              to="/"
              className="flex justify-between items-center w-full"
            >
              <span className="px-1">Shop</span>
            </NavLink>
          </li>
          <li className="px-2">
            <NavLink
              to="/cart"
              className="flex justify-between items-center w-full"
            >
              <span className="px-1">Cart</span>
            </NavLink>
          </li>
          <li className="px-2">
            <NavLink
              to="/orders"
              className="flex justify-between items-center w-full"
            >
              <span className="px-1">Orders</span>
            </NavLink>
          </li>
          <li className="px-2">
            <NavLink
              to="/profile"
              className="flex justify-between items-center w-full"
            >
              <span className="px-1">My Profile</span>
            </NavLink>
          </li>
          <li className="px-2 text-red-500" onClick={handleLogout}>
              <span className="px-1">Logout</span>
          </li>

        </ul>
      </div>
    </div>
  );
}
