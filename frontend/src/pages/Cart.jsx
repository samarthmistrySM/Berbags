import React, { useState, useContext } from "react";
import Modal from "react-modal";
import AuthContext from "../context/AuthContext";
import { toast } from "react-hot-toast";
import axios from "axios";
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
  var cart = loggedUser?.cart || [];
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [address, setAddress] = useState("");

  const handleRemoveFromCart = async (productId) => {
    try {
      await axios.post(
        `${API_URL}/cart/remove`,
        { userId: loggedUser._id, productId },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      update();
      toast.success("Product removed from cart!");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while removing the product to the cart.");
    }
  };

  const getTotalPrice = () => {
    return cart
      .reduce((total, item) => {
        const price = item.product.price || 0;
        const discount = item.product.discount || 0;
        const finalPrice = discount > 0 ? discount : price;
        return total + finalPrice * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const platformTax = cart.length === 0 ? 0 : 50;
  const deliveryTax = 30 * cart.length;

  const getTotalWithTaxes = () => {
    return (parseFloat(getTotalPrice()) + platformTax + deliveryTax).toFixed(2);
  };

  const handleProceedToCheckout = () => {
    setModalIsOpen(true);
  };




  const handleAddressSubmit = async () => {
    try {
        const { data: key } = await axios.get(`${API_URL}/order/getkey`);

        const { data: { order } } = await axios.post(`${API_URL}/order/checkout`, {
            amount: getTotalWithTaxes(),
        });

        const callbackUrl = new URL(`${API_URL}/order/paymentverification`);
        callbackUrl.searchParams.set('redirect', '/cart');  


        const options = {
            key,
            amount: order.amount,
            currency: "INR",
            name: loggedUser.fullname,
            description: "see you again",
            image: loggedUser.image,
            order_id: order.id,
            callback_url: callbackUrl.toString(),  
            prefill: {
                name: loggedUser.fullname,
                email: loggedUser.email,
                contact: "9408618999",
            },
            theme: {
                color: "#121212",
            },
            handler: async function (response) {
                try {
                    await axios.post(`${API_URL}/order/createorder`, {
                      userId:loggedUser._id,
                      address:address,
                      cart:cart,
                      amount:getTotalWithTaxes()
                    });

                    toast.success("Payment successful!");
                    update();
                } catch (error) {
                    console.error(error);
                    toast.error("Failed to confirm payment.");
                } finally {
                    setModalIsOpen(false);
                }
            },
            modal: {
                ondismiss: function () {
                    toast.info("Payment window closed.");
                    setModalIsOpen(false);
                }
            }
        };

        const razor = new window.Razorpay(options);
        razor.open();
    } catch (error) {
        console.error(error);
        toast.error("An error occurred during checkout.");
    }
};



  document.title = "Berbags | Cart";

  return (
    <div className="min-h-screen p-8 bg-gray-100 flex flex-col lg:flex-row">
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Shopping Cart</h1>
        <div className="grid grid-cols-1 gap-6">
          {cart.length === 0 ? (
            <span>Cart is Empty! Please Add Items</span>
          ) : (
            cart.map((item) => (
              <div
                key={item.product._id}
                className="flex flex-row bg-white shadow-lg rounded-lg p-4"
              >
                <Link
                  to={`/product/${item.product._id}`}
                  className="flex-shrink-0"
                >
                  <div
                    className={`h-48 w-48 ${getRandomLightColor()} flex items-center justify-center rounded-lg mb-4`}
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="object-contain h-36 w-full p-2"
                    />
                  </div>
                </Link>
                <div className="flex-1 flex flex-col justify-between ml-4">
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
                  <button
                    onClick={() => handleRemoveFromCart(item.product._id)}
                    className="mt-4 bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="lg:w-1/4 lg:ml-6">
        <div className="bg-white shadow-lg rounded-lg p-6 sticky top-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Order Summary
          </h2>
          <div className="text-lg text-gray-700 mb-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{getTotalPrice()}</span>
            </div>
            <div className="flex justify-between">
              <span>Platform Tax:</span>
              <span>₹{platformTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Tax:</span>
              <span>₹{deliveryTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>₹{getTotalWithTaxes()}</span>
            </div>
          </div>
          <button
            onClick={handleProceedToCheckout}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full"
          >
            Proceed to Checkout
          </button>
          <Link
            to="/"
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full text-center block"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Address Modal"
        className="fixed inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Enter Shipping Address</h2>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full h-32 p-2 border border-gray-300 rounded-lg mb-4"
            placeholder="Enter your address here..."
          />
          <button
            onClick={handleAddressSubmit}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full"
          >
            Submit Address
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Cart;
