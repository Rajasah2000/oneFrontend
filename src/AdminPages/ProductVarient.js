import React, { useState } from "react";

const initialVariants = [
  {
    id: 1,
    size: "S",
    color: "White",
    price: 4500.0,
    quantity: 10,
    image:
      "https://thesketch.in/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-08-at-11.41.57.jpeg?height=40&width=40",
  },
];

export default function ProductVariant() {
  const [variants, setVariants] = useState(initialVariants);

  const handleQuantityChange = (id, increment) => {
    setVariants(
      variants.map((variant) =>
        variant.id === id
          ? { ...variant, quantity: Math.max(0, variant.quantity + increment) }
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

  return (
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
            <input
              type="text"
              value={variant.size}
              onChange={(e) =>
                handleEditChange(variant.id, "size", e.target.value)
              }
              className="border border-gray-300 rounded-md p-1 mb-2"
              placeholder="Size"
            />
            <input
              type="text"
              value={variant.color}
              onChange={(e) =>
                handleEditChange(variant.id, "color", e.target.value)
              }
              className="border border-gray-300 rounded-md p-1 mb-2"
              placeholder="Color"
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
                <td className="px-4 py-4 whitespace-nowrap">
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
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    value={variant.size}
                    onChange={(e) =>
                      handleEditChange(variant.id, "size", e.target.value)
                    }
                    className="border border-gray-300 rounded-md p-1 mb-2 w-full"
                    placeholder="Size"
                  />
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    value={variant.color}
                    onChange={(e) =>
                      handleEditChange(variant.id, "color", e.target.value)
                    }
                    className="border border-gray-300 rounded-md p-1 mb-2 w-full"
                    placeholder="Color"
                  />
                </td>
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
  );
}
