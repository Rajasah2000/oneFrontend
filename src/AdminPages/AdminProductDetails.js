import React, { useEffect, useState } from "react";

import {
  Bold,
  Italic,
  Underline,
  Link,
  Image,
  Quote,
  Code,
  List,
} from "lucide-react";

import Helpers from "../Helper/Helpers";
import Select from "react-select";
import ImageLoader from "../Loader/ImageLoader";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
const initialVariants = [
  {
    id: 1,
    size: [],
    color: "",
    price: 0,
    quantity: 0,
    image: "",
  },
];
function AdminProductDetails() {
  const [allCategory, setAllCategory] = useState([]);
  const [colorOptions, setAllColor] = useState([]);
  const [cateogory, setCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [productDisc, setProductDesc] = useState("");
  const [variants, setVariants] = useState(initialVariants);
  const [image, setImage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const [imageLoader, setImageLoader] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    FetchAllCategoryValue();
    FetchAllColor();
  }, []);

  useEffect(() => {
    console.log("jkjkkkjkjiuiuiutdsdsds", location?.state?.variants);
    let data = location?.state;
    if (location?.state) {
      setProductName(data?.productName);
      setProductDesc(data?.productDisc);
      setCategory(data?.category);
      // setVariants(data?.variants);
      const formattedVariants = data?.variants.map((variant) => ({
        id: variant.id,
        size: variant.size || [],
        color: variant.color?._id || "",
        price: variant.price,
        quantity: variant.quantity,
        image: variant.image,
      }));

      setVariants(formattedVariants);
    }
  }, []);

  const FetchAllCategoryValue = async () => {
    try {
      const res = await Helpers("/admin/category/get", "GET", null, {});
      if (res && res?.status) {
        setAllCategory(res?.data);
      } else {
        console.log("Failed to fetch categories");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const FetchAllColor = async () => {
    try {
      const res = await Helpers("/admin/color/get", "GET", null, {});
      if (res && res?.status) {
        let arr = [{ value: "", label: "Select Color" }];
        res?.data?.forEach((ele) => {
          arr.push({ value: ele?._id, label: ele?.name });
        });
        setAllColor(arr);
      } else {
        console.log("Failed to fetch color");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const HandleImage = async (e, id) => {
    e.preventDefault();
    setImageLoader(true);

    // Prepare image data
    const file = e.target.files[0];
    const data = new FormData();
    data.append("image", file);

    try {
      // Directly using fetch to upload the image
      const response = await fetch(
        "http://localhost:7025/api/admin/image-upload",
        {
          method: "POST",
          body: data,
        }
      );

      const res = await response.json();

      if (res && res.status) {
        setVariants((prevVariants) =>
          prevVariants.map((variant) =>
            variant.id === id ? { ...variant, image: res.url } : variant
          )
        );
        console.log("UploadImageRes", res);
      } else {
        toast.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("An error occurred while uploading the image");
    } finally {
      setImageLoader(false);
    }
  };

  const HandleCrossClick = (id) => {
    setVariants((prevVariants) =>
      prevVariants.map((variant) =>
        variant.id === id ? { ...variant, image: "" } : variant
      )
    );

    // Clear file input for the specific row
    const fileInput = document.querySelector(`#images-${id}`);
    if (fileInput) {
      fileInput.value = "";
    }
  };
  const handleQuantityChange = (id, increment) => {
    setVariants(
      variants.map((variant) =>
        variant.id === id
          ? {
              ...variant,
              quantity: Math.max(0, variant.quantity + increment),
            }
          : variant
      )
    );
  };

  const handleEditChange = (id, field, value) => {
    setVariants(
      variants.map((variant) =>
        variant.id === id ? { ...variant, [field]: value } : variant
      )
    );
  };

  const handleImageChange = (id, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleEditChange(id, "image", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (id) => {
    setVariants(variants.filter((variant) => variant.id !== id));
  };

  const handleAddVariant = () => {
    const newId = variants.length ? variants[variants.length - 1].id + 1 : 1;
    setVariants([
      ...variants,
      { id: newId, size: "", color: "", price: 0.0, quantity: 0, image: "" },
    ]);
  };

  const sizeOptions = [
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
    { value: "XXL", label: "XXL" },
    { value: "Free Size", label: "Free Size" },
  ];

  const HandleProduct = async (e) => {
    e.preventDefault();
    let data = {
      category: cateogory,
      productName: productName,
      productDisc: productDisc,
      variants: variants,
    };

    if (!cateogory || !productName || !productDisc || !variants.length) {
      toast.error("All product fields are required!");
      return;
    }

    try {
      const res = await Helpers(
        `/admin/products/edit/${location?.state?._id}`,
        "PUT",
        data,
        {}
      ); // Pass token as argument
      if (res && res?.status) {
        toast?.success("Product Updated Successfully");
        setCategory("");
        setProductName("");
        setProductDesc("");
        setVariants(initialVariants);
        const fileInput = document.querySelector(`#images-1`);
        if (fileInput) {
          fileInput.value = "";
        }
        navigate("/admin/products");
      } else {
        toast?.error(res?.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-32">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md m-2">
        <h2 className="text-2xl font-semibold mb-4">
          Update Product Information
        </h2>
        <form className="space-y-6">
          <div className="w-full">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              value={cateogory}
              onChange={(e) => setCategory(e?.target?.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-400"
            >
              <option value="">Select Category</option>
              {allCategory?.map((ele, index) => {
                return <option value={ele?._id}>{ele?.name}</option>;
              })}
            </select>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              id="name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              type="text"
              placeholder="Enter product name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          {/* <div className="flex gap-4">
            <div className="w-full">
              <label
                htmlFor="sku"
                className="block text-sm font-medium text-gray-700"
              >
                SKU
              </label>
              <input
                id="sku"
                type="text"
                placeholder="124617209"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-400"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="weight"
                className="block text-sm font-medium text-gray-700"
              >
                Weight
              </label>
              <div className="flex">
                <input
                  id="weight"
                  type="number"
                  placeholder="0.2"
                  className="block w-full border border-gray-300 rounded-l-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-400"
                />
                <select className="border border-gray-300 rounded-r-md p-2 focus:outline-none focus:ring focus:ring-blue-400">
                  <option value="kg">kg</option>
                  <option value="lb">lb</option>
                  <option value="oz">oz</option>
                </select>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Used to calculate shipping rates at checkout and label prices
                during fulfillment.
              </p>
            </div>
          </div> */}

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description (Optional)
            </label>
            <textarea
              id="description"
              value={productDisc}
              onChange={(e) => setProductDesc(e.target.value)}
              placeholder="Enter product description"
              rows={6}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          {/* <div className="flex gap-2">
            <button type="button" className="p-2 rounded hover:bg-gray-200">
              <Bold className="h-4 w-4" />
            </button>
            <button type="button" className="p-2 rounded hover:bg-gray-200">
              <Italic className="h-4 w-4" />
            </button>
            <button type="button" className="p-2 rounded hover:bg-gray-200">
              <Underline className="h-4 w-4" />
            </button>
            <button type="button" className="p-2 rounded hover:bg-gray-200">
              <Link className="h-4 w-4" />
            </button>
            <button type="button" className="p-2 rounded hover:bg-gray-200">
              <Image className="h-4 w-4" />
            </button>
            <button type="button" className="p-2 rounded hover:bg-gray-200">
              <Quote className="h-4 w-4" />
            </button>
            <button type="button" className="p-2 rounded hover:bg-gray-200">
              <Code className="h-4 w-4" />
            </button>
            <button type="button" className="p-2 rounded hover:bg-gray-200">
              <List className="h-4 w-4" />
            </button>
          </div> */}
        </form>
      </div>

      {/* Product Varient */}

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Variants
          </h3>
          <button
            onClick={handleAddVariant}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg
              className="-ml-0.5 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add variant
          </button>
        </div>

        {/* Mobile-friendly column layout */}
        <div className="sm:hidden">
          {variants.map((variant) => (
            <div key={variant.id} className="border-b border-gray-200 p-4">
              <div className="flex flex-col mb-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(variant.id, e)}
                  className="border border-gray-300 rounded-md p-1 mb-2"
                />
                {variant.image && (
                  <img
                    src={variant.image}
                    alt="Variant"
                    className="mt-2 h-16 w-16 object-cover"
                  />
                )}
              </div>

              {/* Multi-select dropdown for Size */}
              <Select
                isMulti
                options={sizeOptions}
                value={sizeOptions.filter((option) =>
                  variant.size.includes(option.value)
                )}
                onChange={(selected) =>
                  handleEditChange(
                    variant.id,
                    "size",
                    selected.map((option) => option.value)
                  )
                }
                className="w-full text-sm border border-gray-300 rounded-md shadow-sm p-1 mb-2"
                placeholder="Select Size(s)"
              />

              {/* Single-select dropdown for Color */}
              <Select
                options={colorOptions}
                value={colorOptions.find(
                  (option) => option.value === variant.color
                )}
                onChange={(selected) =>
                  handleEditChange(variant.id, "color", selected.value)
                }
                className="w-full text-sm border border-gray-300 rounded-md shadow-sm p-1 mb-2"
                placeholder="Select Color"
              />

              <input
                type="text"
                value={variant.price}
                onChange={(e) =>
                  handleEditChange(
                    variant.id,
                    "price",
                    parseFloat(e.target.value) || 0
                  )
                }
                className="border border-gray-300 rounded-md p-1 mb-2"
                placeholder="Price (₹)"
              />

              <div className="flex items-center mb-2">
                <button
                  onClick={() => handleQuantityChange(variant.id, -1)}
                  className="bg-gray-200 p-1 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={variant.quantity <= 0}
                >
                  <svg
                    className="h-5 w-5 text-gray-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  className="mx-2 max-w-[4rem] block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={variant.quantity}
                  readOnly
                />
                <button
                  onClick={() => handleQuantityChange(variant.id, 1)}
                  className="bg-gray-200 p-1 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg
                    className="h-5 w-5 text-gray-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <button
                onClick={() => handleDelete(variant.id)}
                className="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* Desktop table layout */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {/* Table Headers */}
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Image
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Size
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Color
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Price (₹)
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Quantity
                </th>
                <th scope="col" className="relative px-4 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {variants.map((variant) => (
                <tr key={variant.id}>
                  {/* Image Upload */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <input
                      type="file"
                      id={`images-${variant.id}`} // Unique ID for each row
                      accept="image/*"
                      onChange={(e) => HandleImage(e, variant.id)}
                      className="border border-gray-300 rounded-md p-1 mb-2"
                    />

                    {imageLoader ? <ImageLoader /> : null}

                    {variant.image && (
                      <div>
                        <img
                          src={variant.image}
                          alt="Variant"
                          className="mt-2 h-16 w-16 object-cover"
                        />
                        <button
                          onClick={() => HandleCrossClick(variant.id)}
                          style={{ color: "red" }}
                          type="button"
                          className="btn-close"
                          aria-label="Close"
                        >
                          X
                        </button>
                      </div>
                    )}
                  </td>

                  {/* Size Multi-Select Dropdown */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <Select
                      isMulti
                      options={sizeOptions}
                      value={sizeOptions.filter((option) =>
                        variant.size.includes(option.value)
                      )}
                      onChange={(selected) =>
                        handleEditChange(
                          variant.id,
                          "size",
                          selected.map((option) => option.value)
                        )
                      }
                      className="w-full text-sm border border-gray-300 rounded-md shadow-sm p-1 mb-2"
                      placeholder="Select Size"
                    />
                  </td>

                  {/* Color Multi-Select Dropdown */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <Select
                      options={colorOptions}
                      value={colorOptions.find(
                        (option) => option.value === variant.color
                      )}
                      onChange={(selected) =>
                        handleEditChange(variant.id, "color", selected.value)
                      }
                      className="w-full text-sm border border-gray-300 rounded-md shadow-sm p-1 mb-2"
                      placeholder="Select Color"
                    />
                  </td>

                  {/* Price Input */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <input
                      type="text"
                      value={variant.price}
                      onChange={(e) =>
                        handleEditChange(
                          variant.id,
                          "price",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="border border-gray-300 rounded-md p-1 mb-2 w-full"
                      placeholder="Price (₹)"
                    />
                  </td>

                  {/* Quantity Input and Buttons */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <button
                        onClick={() => handleQuantityChange(variant.id, -1)}
                        className="bg-gray-200 p-1 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        disabled={variant.quantity <= 0}
                      >
                        <svg
                          className="h-5 w-5 text-gray-600"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <input
                        type="text"
                        className="mx-2 max-w-[4rem] block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={variant.quantity}
                        readOnly
                      />
                      <button
                        onClick={() => handleQuantityChange(variant.id, 1)}
                        className="bg-gray-200 p-1 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <svg
                          className="h-5 w-5 text-gray-600"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>

                  {/* Delete Button */}
                  <td className="px-4 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => handleDelete(variant.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-primary"
        style={{
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "5px",
          cursor: "pointer",
          margin: "5px",
        }}
        onClick={(e) => HandleProduct(e)}
      >
        Submit
      </button>

      {/* <ProductVarient /> */}
    </div>
  );
}

export default AdminProductDetails;
