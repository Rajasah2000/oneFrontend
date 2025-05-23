import React, { useState, useEffect } from "react";
import Helpers from "../Helper/Helpers";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllUserData();
  }, []);

  const getAllUserData = async () => {
    try {
      const res = await Helpers("/admin/users", "GET", null, {}); // Pass token as argument
      if (res && res?.status) {
        setUsers(res?.data);
      } else {
        console.log("Failed to fetch cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const totalPages = Math.ceil(users.length / rowsPerPage);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = users.slice(indexOfFirstRow, indexOfLastRow);

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

  return (
    <div className="p-8 ">
      <h1 className="text-3xl font-bold mb-8">User Management</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
            </tr>
          </thead>
          <tbody>
            {users?.length > 0 ? (
              users.map((item, index) => (
                <tr key={index}>
                  <td className="p-4">
                    {(currentPage - 1) * rowsPerPage + index + 1}.
                  </td>
                  <td className="p-4">{item?.name}</td>
                  <td className="p-4">{item?.email}</td>
                  {/* <td className="p-4">
                    <button
                      onClick={() => onDelete(color?._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td> */}
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
    </div>
  );
};

export default Users;
