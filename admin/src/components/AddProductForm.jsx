import { useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Toaster, toast } from "react-hot-toast";

export default function AddProductForm({ onClose, onProductAdded }) {
  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const categoryRef = useRef(null);
  const discountRef = useRef(null);
  const isSoldOutRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;
  const handleImageUpload = async () => {
    try {
      if (!selectedFile) {
        console.error("No file selected");
        return;
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);
      formData.append("cloud_name", process.env.CLOUDINARY_CLOUD_NAME);

      const response = await axios.post(process.env.CLOUDINARY_API_URL,
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const imageUrl = await handleImageUpload();
    if (!imageUrl) {
      toast.error("Failed to upload image.");
      return;
    }
    const newProduct = {
      name: nameRef.current.value,
      image: imageUrl,
      price: parseFloat(priceRef.current.value),
      category: categoryRef.current.value,
      discount: discountRef.current.value ? parseFloat(discountRef.current.value) : null,
      isSoldOut: isSoldOutRef.current.checked,
    };

    try {
      await axios.post(`${API_URL}/products/add`, newProduct, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      toast.success("Product added successfully!");
      onProductAdded(); 
      onClose();
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-800 opacity-50 blur-sm" />
      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <Toaster />
        <h1 className="text-xl font-bold mb-4">
          Add Product
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-2">
            <label className="text-sm font-medium" htmlFor="name">
              Product Name
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
            <label className="text-sm font-medium" htmlFor="image">
              Image
            </label>
            <input
              className="w-full border border-gray-300 rounded-md text-sm py-1 px-3"
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files[0])}
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
            <label className="text-sm font-medium" htmlFor="category">
              Category
            </label>
            <select
              className="w-full border border-gray-300 rounded-md text-sm py-1 px-3"
              name="category"
              id="category"
              ref={categoryRef}
            >
              <option value="trolley bags">Trolley Bags</option>
              <option value="backpacks">Backpacks</option>
              <option value="women purse">Women Purse</option>
              <option value="laptop bags">Laptop Bags</option>
              <option value="travel bags">Travel Bags</option>
              <option value="wallet">Wallet</option>
            </select>
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
              disabled={loading}
            >
              {loading ? "Uploading..." : "Add Product"}
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
