import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { toast } from "react-hot-toast";

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
  const { loggedUser } = useContext(AuthContext);
  const cart = loggedUser?.cart || [];

  const handleRemoveFromCart = (productId) => {
    toast.success("Product removed from cart!");
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
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Shopping Cart</h1>
      <div className="grid grid-cols-1 gap-6">
        {cart.map((item) => (
          <div
            key={item.product._id}
            className="flex bg-white shadow-lg rounded-lg p-4"
          >
            <div
              className={`h-48 w-48 ${getRandomLightColor()} flex items-center justify-center rounded-lg`}
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="object-contain h-36 w-full p-2"
              />
            </div>
            <div className="ml-4 flex flex-col justify-between flex-1">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {item.product.name}
                </h2>
                <div className="text-gray-700 text-base">
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
                <div className="text-gray-600 text-sm">
                  Category: {item.product.category}
                </div>
                <div className="text-gray-600 text-sm">
                  Quantity: {item.quantity}
                </div>
              </div>
              <button
                onClick={() => handleRemoveFromCart(item.product._id)}
                className="mt-4 bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Total: ₹{getTotalPrice()}
        </h2>
      </div>
    </div>
  );
};

export default Cart;
