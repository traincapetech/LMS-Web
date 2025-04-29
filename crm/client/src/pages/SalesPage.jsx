// src/pages/SalesPage.jsx
import React from "react";

const SalesPage = () => {
  // Mock data for sales (This will be dynamic later)
  const months = [
    { name: "January", sales: [{ name: "John Doe", salesAmount: 1000, status: "Completed", remarks: "" }] },
    { name: "February", sales: [{ name: "Jane Smith", salesAmount: 2000, status: "Pending", remarks: "" }] },
    // Add more months as needed
  ];

  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold mb-4">Sales Sheet</h2>

      {/* Loop through each month */}
      {months.map((month) => (
        <div key={month.name} className="mb-8">
          <h3 className="text-2xl mb-2">{month.name} Sales</h3>

          <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left">Sales Person</th>
                <th className="py-2 px-4 text-left">Sales Amount</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Remarks</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {month.sales.map((sale, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 px-4">{sale.name}</td>
                  <td className="py-2 px-4">{sale.salesAmount}</td>
                  <td className="py-2 px-4">{sale.status}</td>
                  <td className="py-2 px-4">
                    <input
                      type="text"
                      value={sale.remarks}
                      className="border p-1 rounded"
                      placeholder="Add remarks"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700 transition duration-300">
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default SalesPage;
