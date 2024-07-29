import { useRef, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Toaster, toast } from "react-hot-toast";

export default function UpdateProductForm({ onClose, onProductUpdated, product }) {
  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const discountRef = useRef(null);
  const isSoldOutRef = useRef(null);

  useEffect(() => {
    if (product) {
      nameRef.current.value = product.name;
      priceRef.current.value = product.price;
      discountRef.current.value = product.discount ?? "";
      isSoldOutRef.current.checked = product.isSoldOut;
    }
  }, [product]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedProduct = {
      name: nameRef.current.value,
      price: priceRef.current.value,
      discount: discountRef.current.value || null,
      isSoldOut: isSoldOutRef.current.checked,
      productId: product._id,
    };

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/products/update`, updatedProduct, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      toast.success("Product updated successfully!");
      onProductUpdated();
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-800 opacity-50 blur-sm" />
      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <Toaster />
        <h1 className="text-xl font-bold mb-4">
          Update Product
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-2">
            <label className="text-sm font-medium" htmlFor="name">
              Name
            </label>
            <input
              className="w-full border border-gray-300 rounded-md text-sm py-1 px-3"
              type="text"
              name="name"
              id="name"
              autoComplete="off"
              ref={nameRef}
            />
          </div>
          <div className="input-group mb-2">
            <label className="text-sm font-medium" htmlFor="price">
              Price
            </label>
            <input
              className="w-full border border-gray-300 rounded-md text-sm py-1 px-3"
              type="number"
              name="price"
              id="price"
              autoComplete="off"
              ref={priceRef}
            />
          </div>
          <div className="input-group mb-2">
            <label className="text-sm font-medium" htmlFor="discount">
              Discount
            </label>
            <input
              className="w-full border border-gray-300 rounded-md text-sm py-1 px-3"
              type="number"
              name="discount"
              id="discount"
              autoComplete="off"
              ref={discountRef}
            />
          </div>
          <div className="input-group mb-2 flex items-center">
            <label className="text-sm font-medium mr-4" htmlFor="isSoldOut">
              Sold Out
            </label>
            <input
              className="w-4 h-4 border border-gray-300 rounded-sm"
              type="checkbox"
              name="isSoldOut"
              id="isSoldOut"
              ref={isSoldOutRef}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-black text-white py-1 px-4 rounded-md"
            >
              Update Product
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
