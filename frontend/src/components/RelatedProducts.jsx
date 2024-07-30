import React from 'react'
import {Link} from "react-router-dom"
export default function RelatedProducts({product,getRandomLightColor}) {
  return (
    <div
            key={product._id}
            className="bg-white shadow-md rounded-lg px-4 py-2 w-64 flex-shrink-0"
          >
            <div className={`h-40 w-full ${getRandomLightColor()} flex items-center justify-center rounded-lg`}>
              <img
                src={product.image}
                alt={product.name}
                className="object-contain h-32 w-full p-2"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">
              {product.name}
            </h3>
            <p className="text-gray-600 mb-4">₹{product.price.toFixed(2)}</p>
            <Link to={`/product/${product._id}`}>read more...</Link>
          </div>
  )
}
