import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  // Dummy data for now, you can replace this with data fetched from your backend
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    // You would replace these with actual API calls to your backend
    setTotalProducts(120);   // Fetch total products
    setTotalCategories(12);  // Fetch total categories
    setTotalOrders(55);      // Fetch total orders
    setTotalUsers(250);      // Fetch total users
  }, []);

  // Helper function to format numbers as rupees
  const formatRupees = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Dashboard Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Products */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Total Products</h2>
          <p className="text-3xl">{totalProducts}</p>
        </div>

        {/* Total Categories */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Total Categories</h2>
          <p className="text-3xl">{totalCategories}</p>
        </div>

        {/* Total Orders */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Total Orders</h2>
          <p className="text-3xl">{totalOrders}</p>
        </div>

        {/* Total Users */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Total Users</h2>
          <p className="text-3xl">{totalUsers}</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Dummy Orders Data */}
              <tr>
                <td className="p-4">#001</td>
                <td className="p-4">John Doe</td>
                <td className="p-4">{formatRupees(9999)}</td> {/* Total in Rupees */}
                <td className="p-4 text-green-600">Completed</td>
              </tr>
              <tr>
                <td className="p-4">#002</td>
                <td className="p-4">Jane Smith</td>
                <td className="p-4">{formatRupees(5999)}</td> {/* Total in Rupees */}
                <td className="p-4 text-yellow-600">Pending</td>
              </tr>
              <tr>
                <td className="p-4">#003</td>
                <td className="p-4">Chris Evans</td>
                <td className="p-4">{formatRupees(12000)}</td> {/* Total in Rupees */}
                <td className="p-4 text-red-600">Cancelled</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
