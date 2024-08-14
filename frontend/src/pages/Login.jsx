import React, { useRef, useContext } from "react";
import { SiGnuprivacyguard } from "react-icons/si";
import logo from "../assets/logo.svg";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-hot-toast";
import AuthContext from "../context/AuthContext";
import loginImage from "../assets/Authentication.gif";

export default function Login() {
  const { update } = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  document.title = "Berbags | Login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const API_URL = process.env.REACT_APP_API_URL;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      const token = response.data.token;
      Cookies.set("token", token, { expires: 1 });
      toast.success(response.data.message);
      update();
    } catch (error) {
      console.log(error.response.data);
      Cookies.remove("token");
      toast.error(error.response.data);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col md:flex-row px-6 md:px-20">
      <div
        className="flex-1 hidden md:flex items-center justify-center bg-no-repeat bg-center"
        style={{
          background: `url(${loginImage}) no-repeat center center`,
          backgroundSize: "contain",
        }}
      >
      </div>
      <div className="flex-1 flex flex-col justify-center items-center px-4 md:px-32 py-10 md:py-0">
        <div className="branding flex items-center py-2 px-10">
          <img src={logo} className="w-8 h-8" alt="logo" />
          <h1 className="pt-sans-semibold text-3xl px-2">Berbags.</h1>
        </div>
        <h1 className="text-2xl md:text-3xl poppins font-semibold mt-5 text-center">
          Welcome to Berbags.
        </h1>
        <p className="poppins font-extralight text-sm mt-2 text-center">
          Pack More into Life with <span className="font-medium">Berbags</span>{" "}
          – Built to Last, Designed to Impress.
        </p>
        <div className="w-full flex justify-center text-center mt-5">
          <button className="bg-transparent w-full flex items-center justify-center max-w-md text-sm py-2 font-semibold border rounded-md hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105">
            <SiGnuprivacyguard />
            <span className="px-2">
              Don't have Account? <span className="underline">Signup</span>
            </span>
          </button>
        </div>
        <div className="w-full px-10 mt-5">
          <div className="w-full h-[1px] bg-slate-200"></div>
        </div>
        <form onSubmit={handleSubmit} className="w-full mt-5 max-w-md">
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
            <button
              type="submit"
              className="bg-black text-white w-full flex items-center justify-center text-sm py-2 font-semibold border rounded-md hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
            >
              <span className="px-3">Login</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
