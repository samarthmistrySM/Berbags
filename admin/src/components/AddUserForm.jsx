// AddUserForm.js
import { useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Toaster, toast } from "react-hot-toast";

export default function AddUserForm({ onClose, onUserAdded }) {
  const fullnameRef = useRef(null);
  const emailRef = useRef(null);
  const contactRef = useRef(null);
  const passwordRef = useRef(null);
  const isAdminRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newUser = {
      fullname: fullnameRef.current.value,
      email: emailRef.current.value,
      contact: contactRef.current.value,
      password: passwordRef.current.value,
      isAdmin : isAdminRef.current.checked
    };

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/owner/register`, newUser, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      toast.success("User added successfully!");
      onUserAdded(); 
      onClose();
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Failed to add user.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-800 opacity-50 blur-sm" />
      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <Toaster />
        <h1 className="text-xl font-bold mb-4">
          Add User
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-2">
            <label className="text-sm font-medium" htmlFor="fullname">
              Full Name
            </label>
            <input
              className="w-full border border-gray-300 rounded-md text-sm py-1 px-3"
              type="text"
              name="fullname"
              id="fullname"
              autoComplete="off"
              ref={fullnameRef}
            />
          </div>
          <div className="input-group mb-2">
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              className="w-full border border-gray-300 rounded-md text-sm py-1 px-3"
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              ref={emailRef}
            />
          </div>
          <div className="input-group mb-2">
            <label className="text-sm font-medium" htmlFor="email">
              Password
            </label>
            <input
              className="w-full border border-gray-300 rounded-md text-sm py-1 px-3"
              type="password"
              name="password"
              id="password"
              autoComplete="off"
              ref={passwordRef}
            />
          </div>
          <div className="input-group mb-2">
            <label className="text-sm font-medium" htmlFor="contact">
              Contact
            </label>
            <input
              className="w-full border border-gray-300 rounded-md text-sm py-1 px-3"
              type="text"
              name="contact"
              id="contact"
              autoComplete="off"
              ref={contactRef}
            />
          </div>
          <div className="input-group mb-2 flex items-center">
            <label className="text-sm font-medium mr-4" htmlFor="isAdmin">
              Is Admin
            </label>
            <input
              className="w-4 h-4 border border-gray-300 rounded-sm"
              type="checkbox"
              name="isAdmin"
              id="isAdmin"
              ref={isAdminRef}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-black text-white py-1 px-4 rounded-md"
            >
              Add User
            </button>
          </div>
        </form>
        <button
          className="absolute top-2 right-2 text-gray-500"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
