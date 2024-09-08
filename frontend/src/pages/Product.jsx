import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import AuthContext from "../context/AuthContext";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";
import RelatedProducts from "../components/RelatedProducts";

const categoryDescriptions = {
  "trolley bags": "Explore our range of durable and stylish trolley bags, designed for all your travel needs. Perfect for smooth and convenient travel.",
  "backpacks": "Discover our collection of comfortable and versatile backpacks. Ideal for everyday use, school, or outdoor adventures.",
  "women purse": "Find the perfect women's purse to complement your style. From elegant to casual, we have a variety of designs for every occasion.",
  "laptop bags": "Protect your laptop with our high-quality laptop bags. Stylish and functional, they are designed for professionals and students alike.",
  "travel bags": "Travel in style with our range of travel bags. Built to last and designed for comfort, these bags are your perfect travel companion.",
  "wallet": "Keep your essentials organized with our stylish wallets. Crafted with care, they offer a blend of elegance and functionality.",
};

const Product = () => {
  const { productId } = useParams();
  const API_URL = process.env.REACT_APP_API_URL;

  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  const { loggedUser, update } = useContext(AuthContext);

  document.title = "Berbags | Product"

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_URL}/products/${productId}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        setProduct(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch product details.");
      }
    };

    const fetchAllProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        setAllProducts(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch all products.");
      }
    };

    fetchProduct();
    fetchAllProducts();
  }, [API_URL, productId]);

  useEffect(() => {
    if (product) {
      const related = allProducts
        .filter((p) => p._id !== productId && p.category === product.category)
        .slice(0, 5);
      setRelatedProducts(related);
    }
  }, [product, allProducts, productId]);

  const handleAddToCart = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/cart/add`,
        {
          userId: loggedUser._id,
          productId,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Product added to cart!");
        update();
      } else {
        toast.error("Failed to add product to cart.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the product to the cart.");
    }
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        Loading...
      </div>
    );
  }

  const categoryDescription = categoryDescriptions[product.category] || "Explore our collection of products.";

  return (
    <div className="bg-gray-100 min-h-screen w-full flex items-center justify-center">
      <div className="max-w-screen w-full mx-4 md:mx-auto bg-white shadow-lg rounded-lg p-6 md:p-8">
        <NavLink className="text-xl font-semibold " to={"/"}>
          {" "}
          <span> {"<"}Go back</span>{" "}
        </NavLink>
        <div className="flex flex-col md:flex-row mt-10">
          <div
            className={`w-full md:w-1/2 ${getRandomLightColor()} flex items-center justify-center rounded-lg p-4`}
          >
            <img
              src={product.image}
              alt={product.name}
              className="object-contain h-96 w-full"
            />
          </div>
          <div className="md:ml-6 flex flex-col justify-between flex-1">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                {product.name}
              </h1>
              <div className="text-gray-700 text-xl mt-4">
                {product.discount ? (
                  <>
                    <span className="line-through mr-2">
                      {product.price.toFixed(2)}
                    </span>
                    <span className="text-green-600">
                      ₹
                      {(product.discount).toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span>₹{product.price.toFixed(2)}</span>
                )}
              </div>
              <div className="text-gray-600 text-lg mt-2">
                Category: {product.category}
              </div>
              <p className="text-gray-800 mt-4">{categoryDescription}</p>
              <p className="text-gray-800 mt-4">{product.description}</p>
              <button
                onClick={() => {
                  handleAddToCart(product._id);
                }}
                className={`${
                  product.isSoldOut
                    ? "bg-red-300 cursor-not-allowed"
                    : "bg-blue-400 hover:bg-blue-500"
                } text-white font-bold py-2 px-4 rounded`}
                disabled={product.isSoldOut}
              >
                {product.isSoldOut ? "Sold Out" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            More {product.category}
          </h2>
          <div className="flex overflow-x-auto space-x-4">
            {relatedProducts.map((p, index) => (
              <RelatedProducts key={index} product={p} getRandomLightColor={getRandomLightColor} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

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

export default Product;
