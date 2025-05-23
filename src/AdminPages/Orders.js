import React, { useState, useEffect } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // Dummy order data
  useEffect(() => {
    setOrders([
      {
        id: 1,
        customerName: 'John Doe',
        address: '123 Main St, Cityville, State, 123456',
        phone: '123-456-7890',
        items: [
          { product: 'Track Suit', quantity: 2 },
          { product: 'T-Shirt', quantity: 1 }
        ],
        totalAmount: 4800,
        status: 'Ready to Ship'
      },
      {
        id: 2,
        customerName: 'Jane Smith',
        address: '456 Elm St, Townsville, State, 654321',
        phone: '987-654-3210',
        items: [
          { product: 'Sneakers', quantity: 1 },
          { product: 'T-Shirt', quantity: 3 }
        ],
        totalAmount: 4600,
        status: 'Order Shipped'
      },
      {
        id: 3,
        customerName: 'Alice Johnson',
        address: '789 Oak St, Villagetown, State, 789012',
        phone: '555-123-4567',
        items: [
          { product: 'Track Suit', quantity: 1 },
          { product: 'Sneakers', quantity: 1 }
        ],
        totalAmount: 5500,
        status: 'Deliver in 7 Days'
      },
      {
        id: 4,
        customerName: 'Bob Brown',
        address: '321 Pine St, Forestville, State, 345678',
        phone: '111-222-3333',
        items: [
          { product: 'T-Shirt', quantity: 1 },
        ],
        totalAmount: 1200,
        status: 'Delivered'
      }
    ]);
  }, []);

  const handleChangeStatus = (id, newStatus) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === id) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    setOrders(updatedOrders);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ready to Ship':
        return 'bg-yellow-500'; // Yellow for Ready to Ship
      case 'Order Shipped':
        return 'bg-blue-500'; // Blue for Order Shipped
      case 'Deliver in 7 Days':
        return 'bg-orange-500'; // Orange for Deliver in 7 Days
      case 'Delivered':
        return 'bg-green-500'; // Green for Delivered
      default:
        return 'bg-gray-300'; // Default color
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Orders Management</h1>

      {/* Orders Table */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer Name</th>
              <th className="p-4">Address</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Items</th>
              <th className="p-4">Total Amount (₹)</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="p-4">{order.id}</td>
                <td className="p-4">{order.customerName}</td>
                <td className="p-4">{order.address}</td>
                <td className="p-4">{order.phone}</td>
                <td className="p-4">
                  {order.items.map((item, index) => (
                    <div key={index}>
                      {item.product} (Qty: {item.quantity})
                    </div>
                  ))}
                </td>
                <td className="p-4">₹{order.totalAmount.toLocaleString('en-IN')}</td>
                <td className={`p-4 ${getStatusColor(order.status)} text-white rounded`}>
                  {order.status}
                </td>
                <td className="p-1">
                  <select
                    value={order.status}
                    onChange={(e) => handleChangeStatus(order.id, e.target.value)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    <option value="Ready to Ship">Ready to Ship</option>
                    <option value="Order Shipped">Order Shipped</option>
                    <option value="Deliver in 7 Days">Deliver in 7 Days</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
