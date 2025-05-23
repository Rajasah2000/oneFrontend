import React from "react";

const TrackOrder = ({ currentStatus, onClose }) => {
  const statuses = [
    { id: 1, label: "Shipped" },
    { id: 2, label: "Yet to Deliver" },
    { id: 3, label: "Location of Current Address" },
    { id: 4, label: "Out for Delivery" },
    { id: 5, label: "Delivered" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Track Order</h2>
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Status Checkpoints */}
        <div className="space-y-4">
          {statuses.map((status) => (
            <div
              key={status.id}
              className={`flex items-center ${
                status.id <= currentStatus ? "text-green-600" : "text-gray-400"
              }`}
            >
              {/* Icon */}
              <div
                className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${
                  status.id <= currentStatus
                    ? "border-green-600 bg-green-100"
                    : "border-gray-400"
                }`}
              >
                {status.id <= currentStatus && "✔"}
              </div>
              {/* Label */}
              <p className="ml-4 text-sm">{status.label}</p>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="mt-6 text-right">
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
