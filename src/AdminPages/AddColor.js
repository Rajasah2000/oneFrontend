import React, { useState, useEffect } from "react";
import Helpers from "../Helper/Helpers";

import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
const AddColor = () => {
  const [allColor, setAllColor] = useState([]);
  const [color, setColor] = useState("");
  

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllColor();
  }, []);

  const getAllColor = async () => {
    try {
      const res = await Helpers("/admin/color/get", "GET", null, {}); // Pass token as argument
      if (res && res?.status) {
        setAllColor(res?.data);
      } else {
        console.log("Failed to fetch color");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddColor = async (e) => {
    e.preventDefault();
    const data = { name: color };
    try {
      const res = await Helpers("/admin/color/add", "POST", data, {}); // Pass token as argument
      if (res && res?.status) {
        toast?.success("Color Added Successfully");
        getAllColor();
      } else {
        toast?.error(res?.msg);
      }
    } catch (error) {
      console.log(error);
    }

    setColor(""); // Clear input
  };

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const totalPages = Math.ceil(allColor.length / rowsPerPage);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = allColor.slice(indexOfFirstRow, indexOfLastRow);

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
          `/admin/color/delete/${id}`,
          "DELETE",
          null,
          {}
        );

        if (res) {
          getAllColor(); // Refresh allColor after deletion
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

  return (
    <div className="p-8 ">
      <h1 className="text-3xl font-bold mb-8">Color Management</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-4">ID</th>
              <th className="p-4">Color</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRows?.length > 0 ? (
              currentRows.map((color, index) => (
                <tr key={index}>
                  <td className="p-4">
                    {(currentPage - 1) * rowsPerPage + index + 1}.
                  </td>
                  <td className="p-4">{color?.name}</td>
                  <td className="p-4">
                    <button
                      onClick={() => onDelete(color?._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
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
        <form onSubmit={handleAddColor} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color Name
            </label>
            <input
              type="text"
              value={color}
              placeholder="Enter color name"
              onChange={(e) => setColor(e.target.value)}
              className="w-full border border-gray-500 rounded-lg p-2 mt-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
