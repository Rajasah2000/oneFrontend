import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const ProductCard = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const touchStartX = useRef(null);
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product?.variants?.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product?.variants?.length - 1 : prevIndex - 1
    );
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (touchStartX.current === null) {
      return;
    }

    const touchEndX = e.touches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      nextImage();
    } else if (diff < -50) {
      prevImage();
    }

    touchStartX.current = null;
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 3000); // Auto-scroll every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full sm:w-[270px] md:w-[300px] bg-white transition transform hover:scale-105 hover:shadow-2xl shadow-lg rounded-lg p-5 group mx-auto">
      <div
        className="relative h-36 sm:h-28 md:h-32 lg:h-40 xl:h-64 mb-4 overflow-hidden"
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {product?.variants?.map((image, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image?.image}
              alt={`${product.productName} - Image ${index + 1}`}
              layout="fill"
              className="rounded-md"
            />
          </div>
        ))}
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-1"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-1"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      <h3 className="text-lg font-semibold mb-2 truncate">
        {product.productName}
      </h3>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="flex flex-col mb-2 sm:mb-0">
          <span className="text-xl font-bold text-black">
            ₹{product.variants[0]?.price}
          </span>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 line-through">
              ₹{(product.variants[0]?.price * 15) / 100}
            </span>
            <span className="text-sm text-green-600 font-semibold">
              15% OFF
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="ml-1 text-sm text-gray-600">
            4.1 ({product?.quantity})
          </span>
        </div>
      </div>
      {/* <Link to={`/products/${product?._id}`}> */}
        <button onClick={() => {
          navigate(`/products`, { state: product });
        }} className="w-full py-2 bg-gray-100 text-center text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors">
          Shop Now
        </button>
      {/* </Link> */}
    </div>
  );
};

export default ProductCard;
