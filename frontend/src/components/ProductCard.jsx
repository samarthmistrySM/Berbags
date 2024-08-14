import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const getRandomLightColor = () => {
  const colors = [
    "bg-red-100",
    "bg-blue-100",
    "bg-green-100",
    "bg-yellow-100",
    "bg-purple-100",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const ProductCard = ({ product }) => {
  const API_URL = process.env.REACT_APP_API_URL;

  const { loggedUser, update } = useContext(AuthContext);

  const { name, image, price, category, discount, isSoldOut } = product;

  const handleAddToCart = async (productId) => {
    try {
      await axios.post(
        `${API_URL}/cart/add`,
        { userId: loggedUser._id, productId },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      update();
      toast.success("Product added to cart!");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the product to the cart.");
    }
  };

  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg m-4 bg-white">
      <Link to={`/product/${product._id}`}>
        <div
          className={`h-48 ${getRandomLightColor()} flex items-center justify-center`}
        >
          <img
            src={image}
            alt={name}
            className="object-contain h-36 w-full p-2"
          />
        </div>
        <div className="px-6 py-4 bg-gray-100">
          <div className="font-bold text-xl mb-2 text-gray-900">{name}</div>
          <div className="text-gray-700 text-base">
            {discount ? (
              <>
                <span className="line-through mr-2">₹{price.toFixed(2)}</span>
                <span className="text-green-600">₹{discount}</span>
              </>
            ) : (
              <span>₹{price.toFixed(2)}</span>
            )}
          </div>
        </div>
      </Link>
      <div className="px-6 py-4 bg-gray-200 flex items-center justify-between">
        <span className="text-gray-700">{category}</span>
        <button
          onClick={() => {
            handleAddToCart(product._id);
          }}
          className={`${
            isSoldOut
              ? "bg-red-300 cursor-not-allowed"
              : "bg-blue-400 hover:bg-blue-500"
          } text-white font-bold py-2 px-4 rounded`}
          disabled={isSoldOut}
        >
          {isSoldOut ? "Sold Out" : "+"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

