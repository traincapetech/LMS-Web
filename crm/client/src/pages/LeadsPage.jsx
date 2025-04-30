// src/pages/LeadsPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { leadsAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";
import LeadForm from "../components/Leads/LeadForm";
import Layout from "../components/Layout/Layout";

const LeadsPage = () => {
  const { user } = useAuth();
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  
  // Date filtering state
  const [filterMonth, setFilterMonth] = useState(new Date().getMonth() + 1); // Current month (1-12)
  const [filterYear, setFilterYear] = useState(new Date().getFullYear()); // Current year
  const [showCurrentMonth, setShowCurrentMonth] = useState(true); // Flag to show current month by default
  
  // Generate month options
  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" }
  ];
  
  // Generate year options (5 years back from current year)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear - i);
  
  // Fetch leads on component mount
  useEffect(() => {
    fetchLeads();
  }, []);
  
  // Apply date filters when leads, month, or year changes
  useEffect(() => {
    if (leads.length > 0) {
      filterLeadsByDate();
    }
  }, [leads, filterMonth, filterYear, showCurrentMonth]);
  
  // Function to filter leads by selected date
  const filterLeadsByDate = () => {
    if (showCurrentMonth) {
      // Show current month data
      const currentMonth = new Date().getMonth() + 1; // 1-12
      const currentYear = new Date().getFullYear();
      
      const filtered = leads.filter(lead => {
        const leadDate = new Date(lead.createdAt);
        return (
          leadDate.getMonth() + 1 === currentMonth && 
          leadDate.getFullYear() === currentYear
        );
      });
      
      setFilteredLeads(filtered);
    } else {
      // Show selected month/year data
      const filtered = leads.filter(lead => {
        const leadDate = new Date(lead.createdAt);
        return (
          leadDate.getMonth() + 1 === filterMonth && 
          leadDate.getFullYear() === filterYear
        );
      });
      
      setFilteredLeads(filtered);
    }
  };
  
  // Function to fetch leads from the API
  const fetchLeads = async () => {
    try {
      setLoading(true);
      console.log('Current user:', user);
      const response = await leadsAPI.getAll();
      console.log('API Response:', response.data);
      setLeads(response.data.data);
      // Initially filter for current month
      filterLeadsByDate(response.data.data);
      console.log('Leads set in state:', response.data.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching leads:", err);
      setError("Failed to load leads. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  // Function to handle successful lead creation/update
  const handleLeadSuccess = (lead) => {
    if (selectedLead) {
      // Update the leads list with the updated lead
      const updatedLeads = leads.map(l => l._id === lead._id ? lead : l);
      setLeads(updatedLeads);
      setSelectedLead(null);
    } else {
      // Add the new lead to the leads list
      const updatedLeads = [...leads, lead];
      setLeads(updatedLeads);
      setShowAddForm(false);
    }
  };
  
  // Handle month change
  const handleMonthChange = (e) => {
    setFilterMonth(parseInt(e.target.value));
    setShowCurrentMonth(false);
  };
  
  // Handle year change
  const handleYearChange = (e) => {
    setFilterYear(parseInt(e.target.value));
    setShowCurrentMonth(false);
  };
  
  // Handle reset to current month
  const handleResetToCurrentMonth = () => {
    setFilterMonth(new Date().getMonth() + 1);
    setFilterYear(new Date().getFullYear());
    setShowCurrentMonth(true);
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Leads Management</h1>
          
          {!showAddForm && !selectedLead && (
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300"
            >
              Add New Lead
            </button>
          )}
        </div>
        
        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-md">
            {error}
          </div>
        )}
        
        {/* Add/Edit Lead Form */}
        {(showAddForm || selectedLead) && (
          <div className="mb-6">
            <LeadForm 
              lead={selectedLead}
              onSuccess={handleLeadSuccess}
            />
            
            <button
              onClick={() => {
                setShowAddForm(false);
                setSelectedLead(null);
              }}
              className="mt-4 text-blue-600 hover:text-blue-800"
            >
              ← Back to Leads List
            </button>
          </div>
        )}
        
        {/* Leads Table */}
        {!showAddForm && !selectedLead && (
          <>
            {/* Date Filter Controls */}
            <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-3">Filter Leads by Date</h3>
              <div className="flex flex-wrap items-center gap-4">
                <div>
                  <label htmlFor="month" className="block text-sm font-medium text-gray-600 mb-1">Month</label>
                  <select
                    id="month"
                    value={filterMonth}
                    onChange={handleMonthChange}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    disabled={showCurrentMonth}
                  >
                    {months.map(month => (
                      <option key={month.value} value={month.value}>
                        {month.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-gray-600 mb-1">Year</label>
                  <select
                    id="year"
                    value={filterYear}
                    onChange={handleYearChange}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    disabled={showCurrentMonth}
                  >
                    {years.map(year => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center ml-4">
                  <input
                    id="currentMonth"
                    type="checkbox"
                    checked={showCurrentMonth}
                    onChange={() => setShowCurrentMonth(!showCurrentMonth)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="currentMonth" className="ml-2 block text-sm text-gray-700">
                    Show Current Month Only
                  </label>
                </div>
                
                <button
                  onClick={handleResetToCurrentMonth}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md ml-auto transition duration-300"
                >
                  Reset to Current Month
                </button>
              </div>
              
              <div className="mt-3 text-sm text-gray-500">
                {showCurrentMonth ? (
                  <p>Showing leads for current month: {months[new Date().getMonth()].label} {new Date().getFullYear()}</p>
                ) : (
                  <p>Showing leads for: {months[filterMonth - 1].label} {filterYear}</p>
                )}
                <p>Total: {filteredLeads.length} leads</p>
              </div>
            </div>
            
            {loading ? (
              <div className="text-center py-10">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                <p className="mt-2 text-gray-600">Loading leads...</p>
              </div>
            ) : (
              <>
                {filteredLeads.length === 0 ? (
                  <div className="text-center py-10 bg-white rounded-lg shadow-md">
                    <p className="text-gray-600">No leads found for the selected time period.</p>
                    <button
                      onClick={handleResetToCurrentMonth}
                      className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300"
                    >
                      View Current Month
                    </button>
                  </div>
                ) : (
                  <div>
                    {/* Info about lead assignment */}
                    <div className="mb-4 p-3 bg-blue-50 text-blue-800 border border-blue-200 rounded-md text-sm">
                      <p>
                        <strong>Note:</strong> When a lead is assigned to a Sales Person, it will be visible in their dashboard. 
                        {user?.role === 'Sales Person' ? " You are only seeing leads assigned to you." : 
                        user?.role === 'Lead Person' ? " You can see leads you've created and those assigned to you." : 
                        " As " + user?.role + ", you can see all leads."}
                      </p>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="py-3 px-4 text-left">Date</th>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Course</th>
                            <th className="py-3 px-4 text-left">Phone</th>
                            <th className="py-3 px-4 text-left">Country</th>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-left">Status</th>
                            <th className="py-3 px-4 text-left">Assigned To</th>
                            <th className="py-3 px-4 text-left">Remarks</th>
                            <th className="py-3 px-4 text-left">Feedback</th>
                            <th className="py-3 px-4 text-left">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredLeads.map((lead) => (
                            <tr key={lead._id} className="border-t border-gray-200 hover:bg-gray-50">
                              <td className="py-3 px-4">{formatDate(lead.createdAt)}</td>
                              <td className="py-3 px-4">{lead.name}</td>
                              <td className="py-3 px-4">{lead.course}</td>
                              <td className="py-3 px-4">{lead.countryCode} {lead.phone}</td>
                              <td className="py-3 px-4">{lead.country}</td>
                              <td className="py-3 px-4">{lead.email}</td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  lead.status === 'New' ? 'bg-blue-100 text-blue-800' :
                                  lead.status === 'Contacted' ? 'bg-yellow-100 text-yellow-800' :
                                  lead.status === 'Qualified' ? 'bg-purple-100 text-purple-800' :
                                  lead.status === 'Converted' ? 'bg-green-100 text-green-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {lead.status}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                {lead.assignedTo ? lead.assignedTo.fullName : 'Unassigned'}
                              </td>
                              <td className="py-3 px-4">{lead.remarks?.substring(0, 30)}{lead.remarks?.length > 30 ? '...' : ''}</td>
                              <td className="py-3 px-4">{lead.feedback?.substring(0, 30)}{lead.feedback?.length > 30 ? '...' : ''}</td>
                              <td className="py-3 px-4">
                                <button
                                  onClick={() => setSelectedLead(lead)}
                                  className="text-blue-600 hover:text-blue-900 mr-2"
                                >
                                  Edit
                                </button>
                                {(user?.role === 'Admin' || user?.role === 'Manager') && (
                                  <button
                                    onClick={async () => {
                                      if (window.confirm('Are you sure you want to delete this lead?')) {
                                        try {
                                          await leadsAPI.delete(lead._id);
                                          setLeads(leads.filter(l => l._id !== lead._id));
                                        } catch (err) {
                                          setError("Failed to delete lead. Please try again.");
                                        }
                                      }
                                    }}
                                    className="text-red-600 hover:text-red-900"
                                  >
                                    Delete
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default LeadsPage;
