import React from "react";
import { Star, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CategoryProductCard = ({ product }) => {
  const navigate = useNavigate();
  console.log("gggggggggggg", product);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg h-full flex flex-col">
      {/* Image container with fixed height and width */}
      <div className="relative w-full h-64">
        {" "}
        {/* Fixed height for consistency */}
        <img
          src={product?.variants[0]?.image}
          alt={product?.productName}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        {!product?.available && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            Out of Stock
          </span>
        )}
      </div>

      {/* Product Info Section */}
      <div className="p-4 flex-grow">
        <h2 className="font-semibold text-sm sm:text-base mb-2 line-clamp-2">
          {product?.productName}
        </h2>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(4)
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-2 text-xs text-gray-600">(10)</span>
        </div>
        <p className="text-lg font-bold text-blue-600">
          ₹{product?.variants[0]?.price}
        </p>
      </div>

      {/* Action Button Section */}
      <div className="p-4 pt-0">
        <button
          className={`w-full py-2 px-4 rounded font-semibold flex items-center justify-center transition-colors ${
            product?.available
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
          disabled={!product?.available}
          onClick={() => navigate(`/products`, { state: product })}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {product?.available ? "Shop Now" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
};

export default CategoryProductCard;
