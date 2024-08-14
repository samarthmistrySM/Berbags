import React, { useContext, useState, useRef } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const UserProfile = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const { loggedUser, handleLogout, update } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(loggedUser.profile);
  const [loading, setLoading] = useState(false);

  const fullnameRef = useRef(loggedUser.fullname);
  const emailRef = useRef(loggedUser.email);
  const contactRef = useRef(loggedUser.contact);

  document.title = "Berbags | My Profile";

  if (!loggedUser._id) {
    return null;
  }

  const handleImageChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    try {
      if (!selectedFile) {
        console.error("No file selected");
        return null;
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "gbxinum8");
      formData.append("cloud_name", "pinorama");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/pinorama/image/upload",
        formData
      );

      if (response.data && response.data.secure_url) {
        const imageUrl = response.data.secure_url;
        setImageUrl(imageUrl);
        return imageUrl;
      } else {
        console.error("Error uploading image: No secure URL found in response");
        return null;
      }
    } catch (error) {
      console.error("Error uploading image: ", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const updatedImageUrl = selectedFile ? await handleImageUpload() : imageUrl;

    const updatedUser = {
      fullname: fullnameRef.current.value,
      email: emailRef.current.value,
      contact: contactRef.current.value,
      profile: updatedImageUrl,
      userId: loggedUser._id,
    };

    try {
      await axios.put(`${API_URL}/users/edit`, updatedUser, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      toast.success("User updated!");
      setIsEditing(false);
      update();
    } catch (error) {
        toast.error("error updating user");
      console.error("Error updating user:", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const calculateAverageOrderPrice = () => {
    if (!loggedUser.orders || loggedUser.orders.length === 0) return 0;
    const totalSpent = loggedUser.orders.reduce(
      (sum, order) => sum + order.amount,
      0
    );
    return (totalSpent / loggedUser.orders.length).toFixed(2);
  };

  const statusColor = (isDelivered) => {
    return isDelivered ? "bg-green-200" : "bg-yellow-200";
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="bg-gray-100 shadow-lg rounded-lg p-6 flex items-center mb-8">
        <img
          src={loggedUser.profile}
          alt={`${loggedUser.fullname}'s profile`}
          className="h-24 w-24 rounded-full object-cover mr-6"
        />
        <div className="flex-grow">
          {isEditing ? (
            <div className="relative">
              <button
                onClick={handleCancel}
                className="absolute top-0 right-0 text-red-500 font-bold text-lg"
              >
                ✖
              </button>
              <input
                type="text"
                name="fullname"
                defaultValue={loggedUser.fullname}
                ref={fullnameRef} // Assign the ref here
                className="w-full text-3xl font-bold text-gray-800 mb-2 p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
              />
              <input
                type="email"
                name="email"
                defaultValue={loggedUser.email}
                ref={emailRef} // Assign the ref here
                className="w-full text-gray-600 text-lg mb-2 p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
              />
              <input
                type="text"
                name="contact"
                defaultValue={loggedUser.contact}
                ref={contactRef} // Assign the ref here
                className="w-full text-gray-600 text-lg p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
              />
              <input
                type="file"
                name="profile"
                onChange={handleImageChange}
                className="mt-4"
              />
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {loggedUser.fullname}
              </h1>
              <p className="text-gray-600 text-lg">{loggedUser.email}</p>
              <p className="text-gray-600 text-lg">{loggedUser.contact}</p>
            </>
          )}
        </div>
        <div className="ml-auto flex">
          {isEditing ? (
            <button
              onClick={handleSave}
              className={`bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mr-4 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mr-4"
            >
              Edit Profile
            </button>
          )}
          <button
            className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Orders Overview</h2>
        <div className="flex justify-between items-center p-4 rounded-lg">
          <div className="text-center">
            <h3 className="text-lg font-bold">Total Orders</h3>
            <p className="text-xl">{loggedUser.orders.length}</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-bold">Average Order Price</h3>
            <p className="text-xl">₹{calculateAverageOrderPrice()}</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-bold">Lifetime Spent</h3>
            <p className="text-xl">
              ₹
              {loggedUser.orders
                .reduce((sum, order) => sum + order.amount, 0)
                .toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Details</h2>
        {loggedUser.orders.length === 0 ? (
          <p className="text-gray-600">No orders found!</p>
        ) : (
          loggedUser.orders.map((order) => (
            <div
              key={order._id}
              className={`${statusColor(
                order.isDelivered
              )} shadow rounded-lg p-4 mb-4`}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Order ID: {order._id}
              </h3>
              <p className="text-gray-700 mb-2">Address: {order.address}</p>
              <p className="text-gray-700 mb-2">
                Total Amount: ₹{order.amount.toFixed(2)}
              </p>
              <p className="text-gray-700 mb-2">
                Delivery Status: {order.isDelivered ? "Delivered" : "Pending"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserProfile;
