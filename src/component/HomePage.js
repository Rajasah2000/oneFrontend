import React, { useState, useEffect } from "react";
import mensCollectionImage from "../images/mensCollection.jpg";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css"; // Assuming Tailwind is already installed
import LatestTrends from "./LatestTrends";
import FeaturedCollection from "./FeaturedCollection";
import { Button } from "@mui/material";
import Helpers from "../Helper/Helpers";
import MovingHeader from "../ClientPages/MovingHeader";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./QuickCardsHomepage.css";
import SocialMediaIcons from "./SocialMediaIcons";
import EcommerceLogos from "./EcommerceLogos";

const HomePage = () => {
  const [latestTrends, setLatestTrends] = useState([]);
  const [featuredCollection, setFeaturedCollection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [categories, setCategories] = useState([]);
  console.log("hdjhsjhjdshds", latestTrends, featuredCollection);

  const CustomPrevArrow = ({ onClick }) => (
    <div
      style={{
        position: "absolute",
        left: "-20px",
        top: "40%",
        zIndex: 1,
        fontSize: "24px",
        color: "#7f8c8d", // custom color
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <FaChevronLeft />
    </div>
  );

  const CustomNextArrow = ({ onClick }) => (
    <div
      style={{
        position: "absolute",
        right: "-20px",
        top: "40%",
        zIndex: 1,
        fontSize: "24px",
        color: "#7f8c8d", // custom color
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <FaChevronRight />
    </div>
  );

  const testimonials = [
    {
      rating: 5,
      text: "I have 2 restaurants and ordered 10 cards for each location. I am very impressed with how well these work.",
      name: "Rahul Sharma",
      designation: "restaurant owner",
      image: "/cus2.jpeg",
    },
    {
      rating: 5,
      text: "Xcess Support Team did a great job helping us change the links on our cards. It's a fantastic products and haven't ran into any issues yet so thank you!",
      name: "Dr. Singh",
      designation: "Doctor",
      image: "/cus1.jpeg",
    },
    {
      rating: 5,
      text: "Xcess has revolutionized the way I collect customer reviews! The Google Review cards have made it so easy for my customers to leave feedback.",
      name: "Sarah M",
      designation: "Boutique Owner",
      image: "/cus4.jpeg",
    },
  ];

  const settingss = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    swipe: false, // disable swipe on desktop
    draggable: false, // disable drag on desktop
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          swipe: false,
          draggable: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          swipe: true, // ✅ enable swipe on mobile
          draggable: true, // ✅ enable drag on mobile
          arrows: false, // optional: hide arrows on mobile for cleaner look
        },
      },
    ],
  };
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    window.scrollTo(0, 0);
    // getAllOrders();
    getAllCategory();
  }, []);

  const getAllCategory = async () => {
    try {
      const res = await Helpers("/admin/category/get", "GET", null, {});
      if (res && res?.status) {
        setCategories(res?.data);
      } else {
        console.log("Failed to fetch categories");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   fetch("https://fakestoreapi.com/products/")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const updateData = data.map((product) => ({
  //         ...product,
  //         colors: ["white", "blue", "red"],
  //         originalPrice: product.price * 8,
  //         discountPercentage: 15,
  //         image: [
  //           product.image,
  //           "https://img.freepik.com/free-psd/white-t-shirt-front-mockup_23-292935585.jpg?t=st=1730027864~exp=1730031464~hmac=2e03a0e6c376fb815b627c017a99103dc09626d44dc8495f47133197bc6a30b9&w=740",
  //           "https://img.freepik.com/free-photo/white-tshirt-red-background-template_1409-4076.jpg?t=st=1730028188~exp=1730031788~hmac=1c5b222eeef44b63bd53b942278a59b213203776a45e71662be5c36cf5cc0380&w=740",
  //         ],
  //       }));
  //       setLatestTrends(updateData);
  //       setFeaturedCollection(updateData);
  //       setLoading(false);

  //       console.log(updateData);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching the products:", error);
  //       setLoading(false);
  //     });
  // }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllLatestProduct();
    getAllFeaturedProduct();
  }, []);

  const getAllLatestProduct = async () => {
    try {
      const res = await Helpers("/admin/products/latest-products", "GET", null); // Pass token as argument

      if (res && res?.status) {
        setLatestTrends(res?.data);
        setLoading(false);
      } else {
        console.log("Failed to fetch Latest Products");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getAllFeaturedProduct = async () => {
    try {
      const res = await Helpers(
        "/admin/products/featured-products",
        "GET",
        null,
        {}
      ); // Pass token as argument
      if (res && res?.status) {
        setFeaturedCollection(res?.data);
        setLoading(false);
      } else {
        console.log("Failed to fetch Latest Products");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const CategoryCard = ({ category }) => {
    return (
      <div
        className="category-item"
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div
          className="image-container"
          style={{
            width: "130px",
            height: "130px",
            borderRadius: "10px",
            backgroundColor: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <img
            src={category?.image}
            alt={category?.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </div>
        <h3
          style={{
            fontSize: "1rem",
            fontWeight: "800",
            color: "#333",
            margin: 0,
            padding: "0 4px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: "110px",
          }}
          title={category?.name}
        >
          {category?.name}
        </h3>
      </div>
    );
  };

  return (
    <div className="pt-16 font-bebas">
      <section className="relative h-[85vh] flex flex-col md:flex-row">
        {/* Left side */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full">
          <img
            src="https://img.freepik.com/free-photo/handsome-man-exercising-park-sports-wear_1303-21908.jpg?ga=GA1.1.441838425.1730028145&semt=ais_hybrid"
            alt="Man demonstrating flexibility"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right side */}
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full">
          <img
            src="https://media.istockphoto.com/id/1321017606/photo/multicolored-sport-sleeveless-t-shirts-and-shirts.jpg?s=612x612&w=0&k=20&c=NddwChiHYyB2Swr3emp94PiSGHV2RQXzghkmmj3KkWo="
            alt="Close-up of feet with one wearing a blue athletic shoe"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Overlay for enhanced text visibility */}
        <div className="absolute inset-0 bg-black opacity-40 z-5"></div>

        {/* Overlay text */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-wider">
            ULTIMATE
          </h1>
          <h2 className="text-5xl md:text-7xl font-light mb-8">COMFORT</h2>
          <p className="text-xl mb-8">Rest & Recovery</p>
          <Button
            variant="outlined"
            size="large"
            style={{
              color: "white",
              borderColor: "white",
            }}
            className="hover:bg-black hover:text-black transition-colors"
          >
            SHOP ALL
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Button>
        </div>

        {/* Logo */}
        <div className="absolute bottom-4 left-4 z-20">
          <img
            src="https://media.istockphoto.com/id/173884521/photo/red-football-shirt.webp?a=1&b=1&s=612x612&w=0&k=20&c=_4g1-OJKmNQAD3ILUZU3RyOuajTe9Scf8X0-A0AZfEs="
            alt="Under Armour logo"
            width={50}
            height={50}
          />
        </div>
      </section>
      <div style={{ marginTop: "12px" }}>
        <MovingHeader />
      </div>

      <div>
        <section
          className="categories-section"
          style={{ padding: "20px 0", position: "relative" }}
        >
          {/* Heading */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 15px",
              marginBottom: "20px",
              fontFamily:
                '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
            }}
          >
            {/* Left: Title */}
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
              Popular Categories
            </h2>

            {/* Right: Toggle Button */}
            <button
              onClick={() => setShowAll(!showAll)}
              style={{
                padding: "6px 14px",
                fontSize: "12px",
                fontWeight: "bold",
                color: "white",
                background: "#4caf50",
                border: "none",
                borderRadius: "30px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontFamily:
                  '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
              }}
            >
              {showAll ? "<< Show Less >>" : "<< Show All >>"}
            </button>
          </div>

          {/* Slider or Grid View */}
          {!showAll ? (
            <Slider {...settingss} className="category-grid">
              {categories.map((category, index) => (
                <div
                  key={index}
                  // onClick={() =>
                  //   handleCategorywiseProduct(
                  //     category?.categoryid?._id,
                  //     category?._id
                  //   )
                  // }
                >
                  <CategoryCard category={category} />
                </div>
              ))}
            </Slider>
          ) : (
            <div
              className="category-grid-expanded"
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "repeat(2, 1fr)" // 2 columns on mobile
                  : "repeat(auto-fill, minmax(120px, 1fr))", // Auto-fit on larger screens
                gap: "12px 10px",
                padding: "10px 15px",
              }}
            >
              {categories.map((category, index) => (
                <div
                  key={index}
                  // onClick={() =>
                  //   handleCategorywiseProduct(
                  //     category?.categoryid?._id,
                  //     category?._id
                  //   )
                  // }
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center", // centers the CategoryCard in each cell
                  }}
                >
                  <CategoryCard category={category} />
                </div>
              ))}
            </div>
          )}

          {/* Slider spacing fix */}
          <style>
            {`
      .slick-slide > div {
        padding: 0 10px;
      }
      .slick-list {
        margin: 0 -10px;
      }

      @media(min-width: 1024px) {
        .category-grid-expanded {
          grid-template-columns: repeat(5, 1fr) !important;
        }
      }

      @media(max-width: 768px) {
        .category-grid-expanded {
          grid-template-columns: repeat(2, 1fr) !important;
        }
      }

      @media(max-width: 480px) {
        .category-grid-expanded {
          grid-template-columns: repeat(1, 1fr) !important;
        }
      }
    `}
          </style>
        </section>
      </div>

      {/* Men Section with Background Image and Overlay */}
      <section
        className="relative bg-cover bg-center bg-no-repeat py-24 text-center m-8 rounded-md"
        style={{ backgroundImage: `url(${mensCollectionImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-60 rounded-md"></div>

        <div className="relative z-10 ">
          <h2 className="text-5xl font-bold mb-4 text-white">
            Men's Collection
          </h2>
          <p className="text-lg text-gray-200 mb-8">
            Explore the best collection of men's sportswear.
          </p>
          <Link to="/men">
            <button className="bg-white text-black py-2 px-4 rounded-full hover:bg-gray-200 transition">
              Shop Men’s Collection
            </button>
          </Link>
        </div>
      </section>

      {/* Latest Trends */}
      <LatestTrends latestTrends={latestTrends} loading={loading} />

      {/* Featured Collection */}
      <FeaturedCollection
        featuredCollection={featuredCollection}
        loading={loading}
      />

      <section className="bestsellers">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 15px",
            marginBottom: "20px",
            fontFamily:
              '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
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
            Social Media
          </h2>
        </div>

        {/* Add this */}
        <SocialMediaIcons />
      </section>

      {/* Also available  */}
      <section className="bestsellers">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 15px",
            marginBottom: "20px",
            fontFamily:
              '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
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
            Also Available On
          </h2>
        </div>

        {/* Add this */}
        <EcommerceLogos />
      </section>

      <section className="testimonials-section">
        <h2
          style={{
            marginBottom: "15px",
            fontSize: "20px",
            fontWeight: "600",
            borderBottom: "3px solid #fbc02d",
            display: "inline-block",
            paddingBottom: "4px",
          }}
        >
          Our happy clients say about us
        </h2>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="stars">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="star">
                    ⭐
                  </span>
                ))}
              </div>
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="user-info">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="user-image"
                />
                <div className="user-details">
                  <h3 className="user-name">{testimonial.name}</h3>
                  <p className="user-designation">{testimonial.designation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
