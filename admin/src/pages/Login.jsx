import React, { useRef } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Cookies from "js-cookie";

export default function Login() {
  const API_URL = process.env.REACT_APP_API_URL;
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await axios.post(`${API_URL}/owner/login`, { email, password });
      const token = response.data.token;
      Cookies.set('token',token)
      toast.success(response.data.message);
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-between overflow-hidden">
      <Toaster />
      <div className="w-full h-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-32">
        <form className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mt-5" onSubmit={handleSubmit}>
          <div className="input-group flex flex-col w-full px-4 sm:px-6 lg:px-10">
            <label className="font-medium text-sm" htmlFor="email">
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
          <div className="input-group flex flex-col w-full px-4 sm:px-6 lg:px-10 mt-2">
            <label className="font-medium text-sm" htmlFor="password">
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
          <div className="px-4 sm:px-6 lg:px-10 mt-5">
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
