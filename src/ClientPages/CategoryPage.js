import { useParams } from "react-router-dom";
import CategoryProductCard from "./CategoryProductCard";
import { useEffect, useState } from "react";
import Helpers from "../Helper/Helpers";

const products = [
  {
    name: "Premium Wireless Noise-Cancelling Headphones",
    price: 299.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviewCount: 1024,
    inStock: true,
  },
  {
    name: "Smart Fitness Tracker with Heart Rate Monitor",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    reviewCount: 2048,
    inStock: true,
  },
  {
    name: '4K Ultra HD Smart LED TV - 55" Class',
    price: 699.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviewCount: 3072,
    inStock: false,
  },
  {
    name: "Portable Bluetooth Speaker with 360° Sound",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.4,
    reviewCount: 1536,
    inStock: true,
  },
  {
    name: "Professional DSLR Camera with 24-70mm Lens",
    price: 1299.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviewCount: 512,
    inStock: true,
  },
  {
    name: "Ergonomic Office Chair with Lumbar Support",
    price: 249.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviewCount: 768,
    inStock: true,
  },
];

export default function CategoryPage() {
  const [categoryData, setCategoryData] = useState(null);
  const { id } = useParams(); // get params.id from the URL
  const [loading, setLoading] = useState(true);

  console.log("jjjjkjkjiui", categoryData);

  useEffect(() => {
    getAllCategory();
  }, [id]);

  const getAllCategory = async () => {
    try {
      const res = await Helpers("/admin/category/get", "GET", null, {});
      if (res && res?.status) {
        // Assuming res.data contains the array of categories
        const filteredCategory = res.data.find(
          (category) => category?.name?.toLowerCase() === id
        );

        if (filteredCategory) {
          // If a matching category is found, call another function
          fetchCategoryDetails(filteredCategory?._id);
        } else {
          console.log("Category not found");
        }
      } else {
        console.log("Failed to fetch categories");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const fetchCategoryDetails = async (categoryId) => {
    try {
      const res = await Helpers(
        `/admin/products/getcategoryproducts/${categoryId}`,
        "GET",
        null,
        {}
      );
      if (res && res?.status) {
        // Assuming you want to store the fetched category details in state
        setCategoryData(res?.data);
      } else {
        console.log("Failed to fetch category details");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Featured Products
          </h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-4 sm:gap-6">
          {categoryData?.length > 0 ? (
            categoryData?.map((product, index) => (
              <CategoryProductCard key={index} product={product} />
            ))
          ) : (
            <p style={{ color: "red" }}>
              No products found for this category .
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
