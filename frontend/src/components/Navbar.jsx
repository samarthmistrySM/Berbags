import React, { useContext, useState } from "react";
import logo from "../assets/logo.svg";
import { NavLink, Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import AuthContext from "../context/AuthContext";

export default function Navbar() {
  const { handleLogout } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="relative z-10 flex justify-between items-center bg-white px-10 py-3 w-screen overflow-hidden">
      <Link to="/">
        <div className="flex items-center logo">
          <img src={logo} className="w-8 h-8" alt="logo" />
          <h1 className="px-2 text-3xl">Berbags.</h1>
        </div>
      </Link>

      <button className="z-50 md:hidden text-2xl" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div 
        className={`fixed top-0 left-0 h-screen w-full bg-white transition-transform transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:static md:w-auto md:h-auto md:flex md:translate-x-0`}
      >
        <ul className="flex h-full w-full  md:flex-row flex-col  md:justify-center md:items-center md:space-x-4 p-4 md:p-0 pt-20">
          <li className="px-2">
            <NavLink
              to="/"
              className="flex justify-between items-center mb-4 w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="px-1 text-4xl md:font-normal  md:text-base">Shop</span>
            </NavLink>
          </li>
          <li className="px-2">
            <NavLink
              to="/cart"
              className="flex justify-between items-center mb-4 w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="px-1 text-4xl md:font-normal  md:text-base">Cart</span>
            </NavLink>
          </li>
          <li className="px-2">
            <NavLink
              to="/orders"
              className="flex justify-between items-center mb-4 w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="px-1 text-4xl md:font-normal  md:text-base">Orders</span>
            </NavLink>
          </li>
          <li className="px-2">
            <NavLink
              to="/profile"
              className="flex justify-between items-center mb-4 w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="px-1 text-4xl md:font-normal  md:text-base">My Profile</span>
            </NavLink>
          </li>
          <li className="px-2 text-red-500 mb-4" onClick={() => { 
            handleLogout(); 
            setIsMobileMenuOpen(false); 
          }}>
            <span className="px-1 text-4xl md:font-normal  md:text-base">Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
