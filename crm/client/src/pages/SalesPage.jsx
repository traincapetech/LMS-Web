// src/pages/SalesPage.jsx
import React, { useState, useEffect } from "react";
import { leadsAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";

const SalesPage = () => {
  const { user } = useAuth();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState({});
  const [updating, setUpdating] = useState({});

  // Fetch leads assigned to the sales person
  useEffect(() => {
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

    if (user) {
      fetchLeads();
    }
  }, [user]);

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

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
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
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Phone</th>
                <th className="py-3 px-4 text-left">Course</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Feedback</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
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
                    <button
                      onClick={() => updateFeedback(lead._id)}
                      disabled={updating[lead._id]}
                      className={`px-4 py-2 rounded-md text-white ${
                        updating[lead._id] ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                      } transition duration-300`}
                    >
                      {updating[lead._id] ? 'Saving...' : 'Save Feedback'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SalesPage;
