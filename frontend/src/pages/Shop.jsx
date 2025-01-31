import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Cookies from "js-cookie";
import FilterSidebar from "../components/FilterSidebar";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import toast from "react-hot-toast";

const productsPerPage = 8;

export default function Shop() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  document.title = "Berbags | Shop";

  useEffect(() => {
    const fetchProducts = async () => {
      toast.promise(
        axios.get(`${API_URL}/products`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }).then(response => {
          setProducts(response.data);
          return response.data; 
        }),
        {
          loading: "Loading products...",
          success: "Products loaded successfully!",
          error: "Failed to fetch products.",
        }
      );
    };

    fetchProducts();
  }, [API_URL]);

  const resetPagination = () => setCurrentPage(1);

  const filteredProducts = useMemo(() => {
    return products.filter(product => !selectedCategory || product.category === selectedCategory);
  }, [products, selectedCategory]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortOrder === "lowToHigh") return a.price - b.price;
      if (sortOrder === "highToLow") return b.price - a.price;
      return 0;
    });
  }, [filteredProducts, sortOrder]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="relative flex md:flex-row flex-col min-h-[90vh]">
      <FilterSidebar 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
        setSortOrder={setSortOrder} 
        resetPagination={resetPagination} 
      />

      <div className="pr-7 w-full md:w-5/6">
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {currentProducts.length === 0 ? (
            <p>No products available!</p>
          ) : (
            currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>

        <div className="flex justify-center items-center space-x-2 mt-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-3 py-2 flex items-center bg-blue-500 text-white border border-blue-500 rounded-lg transition-all duration-300 hover:bg-blue-600 ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <FaChevronLeft className="text-xl" />
          </button>

          <span className="px-3 text-gray-700 text-lg">
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 flex items-center bg-blue-500 text-white border border-blue-500 rounded-lg transition-all duration-300 hover:bg-blue-600 ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <FaChevronRight className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
}
