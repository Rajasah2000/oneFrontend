import React, { useState, useEffect } from "react";
import Helpers from "../Helper/Helpers";
import { useAuth } from "../context/AuthContextAdmin";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import ImageLoader from "../Loader/ImageLoader";
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState(true);
  const [categoryId, setCategoryId] = useState("");
  const [id, setId] = useState("");

  const [imageLoader, setImageLoader] = useState(false);
  // const { token } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllCategory();
  }, []);

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
        setImage(res?.url);
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

  const getAllCategory = async () => {
    try {
      const res = await Helpers("/admin/category/get", "GET", null, {}); // Pass token as argument
      if (res && res?.status) {
        setCategories(res?.data);
      } else {
        console.log("Failed to fetch categories");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const data = { name: newCategory, image: image };
    try {
      const res = await Helpers("/admin/category/add", "POST", data, {}); // Pass token as argument
      if (res && res?.status) {
        toast?.success("Category Added Successfully");
        getAllCategory();
      } else {
        toast?.error(res?.msg);
      }
    } catch (error) {
      console.log(error);
    }

    setNewCategory(""); // Clear input
    setImage("");
  };
  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    const data = { name: newCategory, image: image };
    try {
      const res = await Helpers(
        `/admin/category/update/${id}`,
        "PUT",
        data,
        {}
      ); // Pass token as argument
      if (res && res?.status) {
        toast?.success("Category Updated Successfully");
        getAllCategory();
      } else {
        toast?.error(res?.msg);
      }
    } catch (error) {
      console.log(error);
    }

    setNewCategory(""); // Clear input
    setImage("");
  };

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const totalPages = Math.ceil(categories.length / rowsPerPage);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = categories.slice(indexOfFirstRow, indexOfLastRow);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const onDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await Helpers(
          `/admin/category/delete/${id}`,
          "DELETE",
          null,
          {}
        );

        if (res) {
          getAllCategory(); // Refresh categories after deletion
          toast.success("Deleted Successfully");
        } else {
          toast.error("Failed to delete");
          console.log("Error deleting category");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleUpdate = (user) => {
    setStatus(false);
    setCategoryId(user?.categoryid?._id);
    setImage(user?.image);
    setNewCategory(user?.name);
    setId(user?._id);
  };

  return (
    <div className="p-8 ">
      <h1 className="text-3xl font-bold mb-8">Category Management</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-4">ID</th>
              <th className="p-4">Category Name</th>
              <th className="p-4">Category Image</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows?.length > 0 ? (
              currentRows.map((category, index) => (
                <tr key={index}>
                  <td className="p-4">
                    {(currentPage - 1) * rowsPerPage + index + 1}.
                  </td>
                  <td className="p-4">{category?.name}</td>
                  <td className="p-4">
                    <img
                      className="h-12 w-12 object-cover rounded"
                      src={category?.image}
                      alt="Category"
                    />
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(category)}
                        className="bg-blue-500 text-white p-2 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(category?._id)}
                        className="bg-red-500 text-white p-2 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <span
                style={{ color: "red", height: "100%", whiteSpace: "nowrap" }}
              >
                No Data Available...
              </span>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={goToPreviousPage}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-300"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span className="px-4 py-2 text-center">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={goToNextPage}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-300"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Add New Category Form */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
        <form onSubmit={handleAddCategory} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full border border-gray-500 rounded-lg p-2 mt-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Image
            </label>
            <input
              type="file"
              id="images" // Unique ID for each row
              accept="image/*"
              onChange={(e) => HandleImage(e)}
              className="border border-gray-300 rounded-md p-1 mb-2"
            />

            {imageLoader ? <ImageLoader /> : null}

            {image && (
              <div>
                <img
                  src={image}
                  alt="Variant"
                  className="mt-2 h-16 w-16 object-cover"
                />
                <button
                  onClick={() => setImage("")}
                  style={{ color: "red" }}
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                >
                  X
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-start">
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded"
              onClick={status ? handleAddCategory : handleUpdateCategory}
            >
              {status ? "Submit" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Categories;
