import React, { useRef, useContext } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Cookies from "js-cookie";
import AuthContext from "../contexts/AuthContext";

export default function Login() {
  const { update } = useContext(AuthContext);
  const API_URL = process.env.REACT_APP_API_URL;
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value.toLowerCase();
    const password = passwordRef.current.value;

    try {
      const response = await axios.post(`${API_URL}/owner/login`, {
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
    <div className="w-screen h-screen overflow-hidden flex flex-col justify-between">
      <Toaster />
      <div className="w-full h-full flex flex-col justify-center items-center px-4 lg:px-32 sm:px-6">
        <h1 className="pt-sans text-xl font-bold">
          Berbags. <span className="text-2xl font-normal">|</span> Admin
        </h1>
        <form
          className="w-full mt-10 lg:w-1/3 md:w-1/2 sm:w-2/3"
          onSubmit={handleSubmit}
        >
          <div className="input-group w-full flex flex-col px-4 lg:px-10 sm:px-6">
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              className="w-full border-[1px] focus:outline-none rounded-md text-sm py-1 px-3"
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              ref={emailRef}
            />
          </div>
          <div className="input-group w-full flex flex-col px-4 mt-2 lg:px-10 sm:px-6">
            <label className="text-sm font-medium" htmlFor="password">
              Password
            </label>
            <input
              className="w-full border-[1px] focus:outline-none rounded-md text-sm py-1 px-3"
              type="password"
              name="password"
              id="password"
              autoComplete="off"
              ref={passwordRef}
            />
          </div>
          <div className="px-4 mt-5 lg:px-10 sm:px-6">
            <button
              type="submit"
              className="bg-black text-white w-full flex items-center justify-center text-sm py-1 font-semibold border-[1px] rounded-md"
            >
              <span className="px-3">Login</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
