import React, { useRef } from "react";
import { SiGnuprivacyguard } from "react-icons/si";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  return (
    <div className="w-screen h-screen  flex flex-col justify-between overflow-hidden ">
      <div className="branding flex items-center py-2 px-10">
        <svg
          className="w-6 h-6"
          fill="#000000"
          stroke="#000000"
          stroke-width="20"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 483.1 483.1"
        >
          <g>
            <path
              d="M434.55,418.7l-27.8-313.3c-0.5-6.2-5.7-10.9-12-10.9h-58.6c-0.1-52.1-42.5-94.5-94.6-94.5s-94.5,42.4-94.6,94.5h-58.6
      c-6.2,0-11.4,4.7-12,10.9l-27.8,313.3c0,0.4,0,0.7,0,1.1c0,34.9,32.1,63.3,71.5,63.3h243c39.4,0,71.5-28.4,71.5-63.3
      C434.55,419.4,434.55,419.1,434.55,418.7z M241.55,24c38.9,0,70.5,31.6,70.6,70.5h-141.2C171.05,55.6,202.65,24,241.55,24z
      M363.05,459h-243c-26,0-47.2-17.3-47.5-38.8l26.8-301.7h47.6v42.1c0,6.6,5.4,12,12,12s12-5.4,12-12v-42.1h141.2v42.1
      c0,6.6,5.4,12,12,12s12-5.4,12-12v-42.1h47.6l26.8,301.8C410.25,441.7,389.05,459,363.05,459z"
            />
          </g>
        </svg>
        <h1 className="pt-sans-semibold text-3xl px-2">Berbags.</h1>
      </div>
      <div className="w-full h-full flex flex-col justify-center items-center px-32">
        <h1 className="text-3xl poppins font-semibold">Welcome to Berbags.</h1>
        <p className="poppins font-extralight text-sm mt-2">
          Pack More into Life with <span className="font-medium">Berbags</span>{" "}
          – Built to Last, Designed to Impress.
        </p>

        <div className=" w-1/3 text-center px-10 mt-10">
          <button className="bg-transparent w-full flex items-center justify-center text-sm py-1 font-semibold  border-[1px] rounded-md">
            <SiGnuprivacyguard />
            <span className="px-2"> Don't have Account? Signup</span>
          </button>
        </div>

        <div className="w-1/3 px-10 mt-5">
          <div className="w-full h-[1px] bg-slate-200"></div>
        </div>

        <form action="" className="w-1/3 mt-5">
          <div className="input-group flex flex-col w-full px-10 ">
            <label className="font-medium text-sm" htmlFor="email">
              Email
            </label>
            <input
              className="w-full border-[1px] focus:outline-none rounded-md text-sm py-1 px-3"
              type="email"
              name="email"
              id="email"
            />
          </div>
          <div className="input-group flex flex-col w-full px-10 mt-2">
            <label className="font-medium text-sm" htmlFor="password">
              Password
            </label>
            <input
              className="w-full border-[1px] focus:outline-none rounded-md text-sm py-1 px-3"
              type="password"
              name="password"
              id="password"
            />
          </div>
          <div className="px-10 mt-5">
          <button className="bg-black text-white w-full flex items-center justify-center text-sm py-1 font-semibold  border-[1px] rounded-md">
            <span className="px-3">Login</span>
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}
