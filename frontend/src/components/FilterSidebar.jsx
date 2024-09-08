import React from "react";

const categories = [
  "trolley bags",
  "backpacks",
  "women purse",
  "laptop bags",
  "travel bags",
  "wallet",
];

function FilterSidebar({
  selectedCategory,
  setSelectedCategory,
  setSortOrder,
  resetPagination,
}) {
  return (
    <div className="w-1/6 h-full p-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Category</h3>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => {
                setSelectedCategory("");
                resetPagination();
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
        <h3 className="text-lg font-semibold mb-4">Sort By</h3>
        <div className="space-y-2">
          <button
            onClick={() => {
              setSortOrder("lowToHigh");
              resetPagination();
            }}
            className="block w-full text-left px-4 py-2 rounded"
          >
            Price: Low to High
          </button>
          <button
            onClick={() => {
              setSortOrder("highToLow");
              resetPagination();
            }}
            className="block w-full text-left px-4 py-2 rounded"
          >
            Price: High to Low
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterSidebar;
