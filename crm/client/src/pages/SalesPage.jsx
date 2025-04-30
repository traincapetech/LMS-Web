// src/pages/SalesPage.jsx
import React, { useState, useEffect } from "react";
import { leadsAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout/Layout";

const SalesPage = () => {
  const { user } = useAuth();
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState({});
  const [updating, setUpdating] = useState({});
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

  // Fetch leads assigned to the sales person
  useEffect(() => {
    fetchLeads();
  }, [user]);
  
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

  const fetchLeads = async () => {
    try {
      setLoading(true);
      console.log("Fetching leads for sales person:", user?.fullName);
      
      const response = await leadsAPI.getAssigned();
      console.log("Leads response:", response.data);
      
      if (response.data.success) {
        setLeads(response.data.data);
        
        // Initialize feedback state with current values
        const feedbackState = {};
        response.data.data.forEach(lead => {
          feedbackState[lead._id] = lead.feedback || '';
        });
        setFeedback(feedbackState);
      } else {
        setError("Failed to load leads");
      }
    } catch (err) {
      console.error("Error fetching leads:", err);
      setError("Failed to load leads. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle feedback change
  const handleFeedbackChange = (leadId, value) => {
    setFeedback(prev => ({
      ...prev,
      [leadId]: value
    }));
  };

  // Handle feedback update
  const updateFeedback = async (leadId) => {
    if (!leadId || !feedback[leadId]) return;
    
    try {
      setUpdating(prev => ({ ...prev, [leadId]: true }));
      
      const response = await leadsAPI.updateFeedback(leadId, feedback[leadId]);
      
      if (response.data.success) {
        // Update the leads state with the updated lead
        setLeads(leads.map(lead => 
          lead._id === leadId ? response.data.data : lead
        ));
        alert("Feedback updated successfully!");
      } else {
        setError("Failed to update feedback");
      }
    } catch (err) {
      console.error("Error updating feedback:", err);
      setError("Failed to update feedback. Please try again.");
    } finally {
      setUpdating(prev => ({ ...prev, [leadId]: false }));
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

  // View lead details
  const viewLeadDetails = (lead) => {
    setSelectedLead(lead);
  };

  // Close lead details modal
  const closeLeadDetails = () => {
    setSelectedLead(null);
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6">My Assigned Leads</h2>
        
        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-md">
            {error}
          </div>
        )}
        
        {/* Loading indicator */}
        {loading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">Loading your assigned leads...</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No leads assigned to you yet.</p>
          </div>
        ) : (
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
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {filteredLeads.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-600">No leads found for the selected time period.</p>
                  <button
                    onClick={handleResetToCurrentMonth}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300"
                  >
                    View Current Month
                  </button>
                </div>
              ) : (
                <table className="min-w-full table-auto">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-4 text-left">Date</th>
                      <th className="py-3 px-4 text-left">Name</th>
                      <th className="py-3 px-4 text-left">Email</th>
                      <th className="py-3 px-4 text-left">Phone</th>
                      <th className="py-3 px-4 text-left">Course</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-left">Source</th>
                      <th className="py-3 px-4 text-left">Feedback</th>
                      <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((lead) => (
                      <tr key={lead._id} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-4">{formatDate(lead.createdAt)}</td>
                        <td className="py-3 px-4">{lead.name}</td>
                        <td className="py-3 px-4">{lead.email}</td>
                        <td className="py-3 px-4">{lead.countryCode} {lead.phone}</td>
                        <td className="py-3 px-4">{lead.course}</td>
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
                        <td className="py-3 px-4">{lead.source || 'N/A'}</td>
                        <td className="py-3 px-4">
                          <textarea
                            value={feedback[lead._id] || ''}
                            onChange={(e) => handleFeedbackChange(lead._id, e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Add your feedback"
                            rows="2"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-col space-y-2">
                            <button
                              onClick={() => updateFeedback(lead._id)}
                              disabled={updating[lead._id]}
                              className={`px-4 py-2 rounded-md text-white ${
                                updating[lead._id] ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                              } transition duration-300`}
                            >
                              {updating[lead._id] ? 'Saving...' : 'Save Feedback'}
                            </button>
                            <button
                              onClick={() => viewLeadDetails(lead)}
                              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition duration-300"
                            >
                              View Details
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {/* Lead Details Modal */}
        {selectedLead && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
                <h3 className="text-xl font-bold">Lead Details</h3>
                <button 
                  onClick={closeLeadDetails}
                  className="text-white hover:text-gray-200"
                >
                  &times;
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-bold mb-4">Contact Information</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Name</p>
                        <p className="font-medium">{selectedLead.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium">{selectedLead.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium">{selectedLead.countryCode} {selectedLead.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Country</p>
                        <p className="font-medium">{selectedLead.country || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-bold mb-4">Lead Information</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Course</p>
                        <p className="font-medium">{selectedLead.course}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <p className="font-medium">{selectedLead.status}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Source</p>
                        <p className="font-medium">{selectedLead.source || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Created Date</p>
                        <p className="font-medium">{formatDate(selectedLead.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 border-t border-gray-200 pt-4">
                  <h4 className="text-lg font-bold mb-4">Additional Information</h4>
                  <div className="space-y-3">
                    {selectedLead.company && (
                      <div>
                        <p className="text-sm text-gray-600">Company</p>
                        <p className="font-medium">{selectedLead.company}</p>
                      </div>
                    )}
                    {selectedLead.client && (
                      <div>
                        <p className="text-sm text-gray-600">Client</p>
                        <p className="font-medium">{selectedLead.client}</p>
                      </div>
                    )}
                    {selectedLead.remarks && (
                      <div>
                        <p className="text-sm text-gray-600">Remarks</p>
                        <p className="font-medium">{selectedLead.remarks}</p>
                      </div>
                    )}
                    {selectedLead.sourceLink && (
                      <div>
                        <p className="text-sm text-gray-600">Source Link</p>
                        <a 
                          href={selectedLead.sourceLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {selectedLead.sourceLink}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-6 border-t border-gray-200 pt-4">
                  <h4 className="text-lg font-bold mb-4">Feedback</h4>
                  <textarea
                    value={feedback[selectedLead._id] || ''}
                    onChange={(e) => handleFeedbackChange(selectedLead._id, e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Add your feedback about this lead"
                    rows="4"
                  />
                  <button
                    onClick={() => updateFeedback(selectedLead._id)}
                    disabled={updating[selectedLead._id]}
                    className={`mt-3 px-4 py-2 rounded-md text-white ${
                      updating[selectedLead._id] ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                    } transition duration-300 w-full`}
                  >
                    {updating[selectedLead._id] ? 'Saving Feedback...' : 'Save Feedback'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SalesPage;
