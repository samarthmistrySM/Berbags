import React, { useRef, useContext } from "react";
import { SiGnuprivacyguard } from "react-icons/si";
import logo from '../assets/logo.svg';
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-hot-toast";
import AuthContext from "../context/AuthContext";

export default function Login() {

  const {update} = useContext(AuthContext)
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const API_URL = process.env.REACT_APP_API_URL;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
   
    try {
      const response = await axios.post(`${API_URL}/auth/login`,{
        email,
        password
      })
      const token = response.data.token;
      Cookies.set("token", token, { expires: 1 });
      toast.success(response.data.message);
      update()
    } catch (error) {
      console.log(error.response.data);
      Cookies.remove("token");
      toast.error(error.response.data);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-between overflow-hidden">
      <div className="branding flex items-center py-2 px-10">
        <img src={logo} className="w-8 h-8" alt="logo" />
        <h1 className="pt-sans-semibold text-3xl px-2">Berbags.</h1>
      </div>
      <div className="w-full h-full flex flex-col justify-center items-center px-32">
        <h1 className="text-3xl poppins font-semibold">Welcome to Berbags.</h1>
        <p className="poppins font-extralight text-sm mt-2">
          Pack More into Life with <span className="font-medium">Berbags</span> – Built to Last, Designed to Impress.
        </p>

        <div className="w-1/3 text-center px-10 mt-10">
          <button className="bg-transparent w-full flex items-center justify-center text-sm py-1 font-semibold border-[1px] rounded-md hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
            <SiGnuprivacyguard />
            <span className="px-2">
              Don't have Account? <span className="underline">Signup</span>
            </span>
          </button>
        </div>

        <div className="w-1/3 px-10 mt-5">
          <div className="w-full h-[1px] bg-slate-200"></div>
        </div>

        <form onSubmit={handleSubmit} className="w-1/3 mt-5">
          <div className="input-group flex flex-col w-full px-10">
            <label className="font-medium text-sm" htmlFor="email">
              Email
            </label>
            <input
              className="w-full border focus:outline-none rounded-md text-sm py-1 px-3"
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              ref={emailRef}
            />
          </div>
          <div className="input-group flex flex-col w-full px-10 mt-2">
            <label className="font-medium text-sm" htmlFor="password">
              Password
            </label>
            <input
              className="w-full border focus:outline-none rounded-md text-sm py-1 px-3"
              type="password"
              name="password"
              id="password"
              autoComplete="off"
              ref={passwordRef}
            />
          </div>
          <div className="px-10 mt-5">
            <button type="submit" className="bg-black text-white w-full flex items-center justify-center text-sm py-1 font-semibold border rounded-md hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
              <span className="px-3">Login</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
