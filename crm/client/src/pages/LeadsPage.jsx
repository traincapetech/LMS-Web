// src/pages/LeadsPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { leadsAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";
import LeadForm from "../components/Leads/LeadForm";

const LeadsPage = () => {
  const { user } = useAuth();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  
  // Fetch leads on component mount
  useEffect(() => {
    fetchLeads();
  }, []);
  
  // Function to fetch leads from the API
  const fetchLeads = async () => {
    try {
      setLoading(true);
      console.log('Current user:', user);
      const response = await leadsAPI.getAll();
      console.log('API Response:', response.data);
      setLeads(response.data.data);
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
      setLeads(leads.map(l => l._id === lead._id ? lead : l));
      setSelectedLead(null);
    } else {
      // Add the new lead to the leads list
      setLeads([...leads, lead]);
      setShowAddForm(false);
    }
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
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
          {loading ? (
            <div className="text-center py-10">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-2 text-gray-600">Loading leads...</p>
            </div>
          ) : (
            <>
              {leads.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-600">No leads found. Add your first lead!</p>
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
                        {leads.map((lead) => (
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
  );
};

export default LeadsPage;
