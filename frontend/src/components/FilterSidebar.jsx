import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaFilter, FaTimes } from "react-icons/fa";

const categories = [
  "trolley bags",
  "backpacks",
  "women purse",
  "laptop bags",
  "travel bags",
  "wallet",
];

function FilterSidebar({ selectedCategory, setSelectedCategory, setSortOrder, resetPagination }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
     <div className="h-10 fixed">
     <button
        onClick={toggleSidebar}
        className="flex  justify-end top-4 w-screen right-4 z-50 md:hidden p-4 text-xl"
      >
        {isOpen ? <FaTimes /> : <FaFilter />}
      </button>
     </div>
      
      <div 
        className={`fixed inset-y-0 left-0 w-2/3 bg-white p-4 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 z-40 md:relative md:translate-x-0 md:w-1/6 md:h-full`}
      >
        <div className="mb-6">
          <h3 className="mb-4 font-semibold text-lg">Category</h3>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => {
                  setSelectedCategory("");
                  resetPagination();
                  setIsOpen(false); 
                }}
                className={`block w-full text-left px-4 py-2 rounded ${
                  selectedCategory === "" ? "font-semibold underline" : ""
                }`}
              >
                All Categories
              </button>
            </li>
            {categories.map((category, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    setSelectedCategory(category);
                    resetPagination();
                    setIsOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 rounded ${
                    selectedCategory === category ? "font-semibold underline" : ""
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold text-lg">Sort By</h3>
          <div className="space-y-2">
            <button onClick={() => setSortOrder("lowToHigh")} className="block px-4 py-2 rounded w-full text-left">Price: Low to High</button>
            <button onClick={() => setSortOrder("highToLow")} className="block px-4 py-2 rounded w-full text-left">Price: High to Low</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FilterSidebar;
