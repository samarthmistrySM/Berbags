import { useRef, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Toaster, toast } from "react-hot-toast";

export default function UpdateOrderForm({ onClose, onOrderUpdated, order }) {
  const deliveredRef = useRef(null);

  useEffect(() => {
    if (order) {
      deliveredRef.current.checked = order.isDelivered;
    }
  }, [order]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedOrder = {
      isDelivered: deliveredRef.current.checked,
      orderId: order._id,
    };

    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/order/update`,
        updatedOrder,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      toast.success("Order updated successfully!");
      onOrderUpdated();
      onClose();
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Failed to update order.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-800 opacity-50" />
      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <Toaster />
        <h1 className="text-xl font-bold mb-4">Update Order Status</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center mb-4">
            <input
              className="w-4 h-4 border-gray-300 rounded-sm"
              type="checkbox"
              id="isDeliverd"
              ref={deliveredRef}
            />
            <label className="ml-2 text-sm font-medium" htmlFor="isDeliverd">
            isDelivered
            </label>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-black text-white py-1 px-4 rounded-md"
            >
              Update Order
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
