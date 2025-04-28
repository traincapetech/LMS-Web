// src/pages/LeadsPage.jsx
import React from "react";

const LeadsPage = () => {
  // Mock data for leads (This will be dynamic later)
  const months = [
    { name: "January", leads: [{ name: "John Doe", status: "Open", remarks: "" }] },
    { name: "February", leads: [{ name: "Jane Smith", status: "Closed", remarks: "" }] },
    // Add more months as needed
  ];

  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold mb-4">Leads Sheet</h2>

      {/* Loop through each month */}
      {months.map((month) => (
        <div key={month.name} className="mb-8">
          <h3 className="text-2xl mb-2">{month.name} Leads</h3>

          <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left">Lead Name</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Remarks</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {month.leads.map((lead, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 px-4">{lead.name}</td>
                  <td className="py-2 px-4">{lead.status}</td>
                  <td className="py-2 px-4">
                    <input
                      type="text"
                      value={lead.remarks}
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

export default LeadsPage;
