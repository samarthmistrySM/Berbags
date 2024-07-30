import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { toast } from "react-hot-toast";
import axios from 'axios';
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

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

const Cart = () => {
  const { loggedUser, update } = useContext(AuthContext);
  const API_URL = process.env.REACT_APP_API_URL;
  const cart = loggedUser?.cart || [];

  const handleRemoveFromCart = async (productId) => {
    try {
      await axios.post(`${API_URL}/cart/remove`, { userId: loggedUser._id, productId }, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      update();
      toast.success("Product removed from cart!");
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while removing the product to the cart.');
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = item.product.price || 0;
      const discount = item.product.discount || 0;
      const finalPrice = discount > 0 ? discount : price;
      return total + finalPrice * item.quantity;
    }, 0).toFixed(2);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Shopping Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cart.map((item) => (
          <div
            key={item.product._id}
            className="flex flex-col bg-white shadow-lg rounded-lg p-4"
          >
            <Link to={`/product/${item.product._id}`}>
            <div
              className={`h-48 w-full ${getRandomLightColor()} flex items-center justify-center rounded-lg mb-4`}
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="object-contain h-36 w-full p-2"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {item.product.name}
                </h2>
                <div className="text-gray-700 text-base mb-2">
                  {item.product.discount > 0 ? (
                    <>
                      <span className="line-through mr-2">
                        ₹{item.product.price.toFixed(2)}
                      </span>
                      <span className="text-green-600">
                        ₹{item.product.discount.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span>₹{item.product.price.toFixed(2)}</span>
                  )}
                </div>
                <div className="text-gray-600 text-sm mb-2">
                  Category: {item.product.category}
                </div>
                <div className="text-gray-600 text-sm mb-2">
                  Quantity: {item.quantity}
                </div>
              </div>
            </div>
            </Link>
              <button
                onClick={() => handleRemoveFromCart(item.product._id)}
                className="mt-4 bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
              >
                Remove
              </button>
          </div>
        ))}
      </div>
      <div className="mt-6 text-right">
        <h2 className="text-xl font-bold text-gray-900">
          {cart.length === 0 ? (
            <span>Cart is empty! Add items</span>
          ) : (
            <span>Total: ₹{getTotalPrice()}</span>
          )}
        </h2>
      </div>
    </div>
  );
};

export default Cart;
