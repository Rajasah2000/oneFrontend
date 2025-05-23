import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "./ProductCard";

// Shimmer Effect Component
const ShimmerCard = () => (
  <div className="min-w-[250px] p-6 rounded-lg shadow-lg bg-gray-200 animate-pulse">
    <div className="h-64 bg-gray-300 rounded-t-lg mb-4"></div>
    <div className="h-6 bg-gray-300 mb-2"></div>
    <div className="h-4 bg-gray-300 mb-4"></div>
    <div className="h-10 w-24 bg-gray-300 rounded-full mx-auto"></div>
  </div>
);

// Featured Collection Section
const FeaturedCollection = ({ featuredCollection, loading }) => {
  // Slider settings for single row with multiple items
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 1 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2.5, slidesToScroll: 1 }, // This is for tablets or smaller screens
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2.2, slidesToScroll: 1 }, // Shows 2 products + part of the next
      },
    ],
  };

  return (
    <section className="bg-gray-100 py-6 ">
      {/* Left: Title */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 15px",
          marginBottom: "20px",
          fontFamily: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "20px",
            fontWeight: "600",
            borderBottom: "3px solid #fbc02d",
            display: "inline-block",
            paddingBottom: "4px",
          }}
        >
          Featured Collection
        </h2>
      </div>

      {loading ? (
        <div className="container mx-auto px-4">
          <div className="flex space-x-6 p-8">
            {/* Show 4 shimmer cards as placeholders */}
            {[1, 2, 3, 4].map((_, idx) => (
              <ShimmerCard key={idx} />
            ))}
          </div>
        </div>
      ) : (
        <div className="container mx-auto">
          <Slider {...sliderSettings} className="flex">
            {featuredCollection.map((product) => (
              <div key={product.id} className="px-2">
                <ProductCard product={product} />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </section>
  );
};

export default FeaturedCollection;
