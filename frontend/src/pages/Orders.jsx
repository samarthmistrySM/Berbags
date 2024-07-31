import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
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

const Orders = () => {
  const { loggedUser } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;

  document.title = "Berbags | Orders";

  useEffect(() => {
    if (!loggedUser._id) {
      return;
    }
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/order/getorder/${loggedUser._id}`,
          {
            headers: {
              Authorization: `Bearer ${loggedUser.token}`,
            },
          }
        );
        setOrders(response.data);
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while fetching the orders.");
      }
    };

    fetchOrders();
  }, [loggedUser, API_URL]);

  const getTotalSpent = () => {
    return orders.reduce((total, order) => total + order.amount, 0).toFixed(2);
  };

  const getAverageOrderPrice = () => {
    return orders.length === 0
      ? "0.00"
      : (getTotalSpent() / orders.length).toFixed(2);
  };

  const statusColor = (isDelivered) => {
    return isDelivered ? "bg-green-200" : "bg-yellow-200";
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Orders</h1>

      {orders.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center bg-gradient-to-r from-green-400 to-blue-500 text-white p-4 rounded-lg shadow-lg">
            <div className="flex-1 text-center">
              <div className="text-lg font-semibold">Total Orders</div>
              <div className="text-2xl">{orders.length}</div>
            </div>
            <div className="flex-1 text-center border-x border-white">
              <div className="text-lg font-semibold">Average Order Price</div>
              <div className="text-2xl">₹{getAverageOrderPrice()}</div>
            </div>
            <div className="flex-1 text-center">
              <div className="text-lg font-semibold">Lifetime Amount Spent</div>
              <div className="text-2xl">₹{getTotalSpent()}</div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {orders.length === 0 ? (
          <span className="text-gray-700">No orders found!</span>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className={`flex flex-col mb-4 p-4 rounded-lg shadow-md ${statusColor(
                order.isDelivered
              )}`}
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold text-gray-900">
                  Order ID: {order._id}
                </h2>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full text-white ${
                    order.isDelivered ? "bg-green-600" : "bg-yellow-600"
                  }`}
                >
                  {order.isDelivered ? "Delivered" : "Pending"}
                </span>
              </div>
              <p className="text-gray-700 mb-2">
                <strong>Address:</strong> {order.address}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Total Amount:</strong> ₹{order.amount.toFixed(2)}
              </p>
              <div className="mt-4 border-t border-gray-300 pt-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Products:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {order.products.length === 0 ? (
                    <span className="text-gray-700">No products found!</span>
                  ) : (
                    order.products.map((item) => (
                      <div
                        key={item._id}
                        className="flex flex-wrap items-center bg-gray-50 p-4 rounded-lg border border-gray-300"
                      >
                        <Link
                          to={`/product/${item.product._id}`}
                          className={`flex-shrink-0 ${getRandomLightColor()} flex items-center justify-center rounded-lg`}
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="object-contain h-20 w-full p-2"
                          />
                        </Link>
                        <div className="flex-1 flex flex-col justify-between ml-4">
                          <div>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">
                              {item.product.name}
                            </h4>
                            <div className="text-gray-700 mb-1">
                              <strong>Quantity:</strong> {item.quantity}
                            </div>
                            <div className="text-gray-700 mb-1">
                              <strong>Price:</strong> ₹{item.product.price}
                            </div>
                            {item.product.discount && (
                              <div className="text-gray-700 mb-1">
                                <strong>Discount:</strong> ₹
                                {item.product.discount}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
