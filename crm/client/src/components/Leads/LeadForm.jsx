import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { leadsAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../services/api';

const LeadForm = ({ lead = null, onSuccess }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    countryCode: '',
    phone: '',
    country: '',
    pseudoId: '',
    company: '',
    client: '',
    status: 'New',
    source: '',
    sourceLink: '',
    assignedTo: '',
    leadPerson: '',
    remarks: '',
    feedback: ''
  });

  // Fetch users for assignment dropdown
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('Fetching users for assignment dropdown');
        // Only fetch users with the Sales Person role for assignment
        const res = await authAPI.getUsers('Sales Person');
        console.log('Users fetched:', res.data.data);
        setUsers(res.data.data);
      } catch (err) {
        console.error('Failed to fetch users', err);
      }
    };
    
    fetchUsers();
  }, []);

  // If editing, populate form with lead data
  useEffect(() => {
    console.log('Current user:', user);
    console.log('User ID from context:', user?._id);
    console.log('Lead data:', lead);
    
    if (lead) {
      setFormData({
        name: lead.name || '',
        email: lead.email || '',
        course: lead.course || '',
        countryCode: lead.countryCode || '',
        phone: lead.phone || '',
        country: lead.country || '',
        pseudoId: lead.pseudoId || '',
        company: lead.company || '',
        client: lead.client || '',
        status: lead.status || 'New',
        source: lead.source || '',
        sourceLink: lead.sourceLink || '',
        assignedTo: lead.assignedTo?._id || '',
        leadPerson: lead.leadPerson?._id || '',
        remarks: lead.remarks || '',
        feedback: lead.feedback || ''
      });
      console.log('Form data set from lead. assignedTo:', lead.assignedTo?._id);
    } else {
      // Default assignedTo to current user if creating a new lead
      setFormData(prev => {
        // Use the correct user ID property based on the API response structure
        const userId = user?._id || user?.id || '';
        console.log('Setting default assignedTo with user ID:', userId);
        
        const newFormData = {
          ...prev,
          assignedTo: userId,
          leadPerson: user?.role === 'Lead Person' ? userId : ''
        };
        console.log('Default form data set:', newFormData);
        return newFormData;
      });
    }
  }, [lead, user]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Field changed: ${name}, value: ${value}`);
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Debug form data being submitted
    console.log('Form being submitted with data:', formData);
    console.log('assignedTo value:', formData.assignedTo);
    console.log('Current user:', user);
    
    try {
      let response;
      if (lead) {
        // Update existing lead
        response = await leadsAPI.update(lead._id, formData);
      } else {
        // Create new lead
        response = await leadsAPI.create(formData);
      }
      
      console.log('API response after create/update:', response.data);
      
      if (onSuccess) {
        onSuccess(response.data.data);
      } else {
        navigate('/leads');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err.response?.data?.message || 'Failed to save lead. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">
        {lead ? 'Edit Lead' : 'Add New Lead'}
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Lead Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name*
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email*
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Course */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course*
            </label>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Country Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country Code*
            </label>
            <input
              type="text"
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              required
              placeholder="+1"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number*
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country*
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Pseudo ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pseudo ID
            </label>
            <input
              type="text"
              name="pseudoId"
              value={formData.pseudoId}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Client */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Client
            </label>
            <input
              type="text"
              name="client"
              value={formData.client}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Lost">Lost</option>
              <option value="Converted">Converted</option>
            </select>
          </div>

          {/* Source */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Source
            </label>
            <input
              type="text"
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Source Link (LinkedIn) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Source Link (LinkedIn)
            </label>
            <input
              type="text"
              name="sourceLink"
              value={formData.sourceLink}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Assigned To */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assigned To (Sales Person)* <span className="text-red-500 font-bold">Required</span>
            </label>
            <select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              required
              className="w-full p-2 bg-blue-50 border border-blue-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a Sales Person</option>
              {users.length === 0 && (
                <option value="" disabled>No sales persons available</option>
              )}
              {users.map(u => (
                <option key={u._id} value={u._id}>
                  {u.fullName} - {u.email} (ID: {u._id})
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Assigning a lead to a sales person will make it visible to them. Current value: "{formData.assignedTo}"
            </p>
          </div>
        </div>

        {/* Remarks */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Remarks
          </label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            rows="3"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        {/* Feedback (only for editing and if user is a Sales Person) */}
        {lead && (user?.role === 'Sales Person' || user?.role === 'Manager' || user?.role === 'Admin') && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Feedback (Sales)
            </label>
            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
        )}

        <div className="mt-6 flex space-x-3">
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded-md text-white ${
              loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            } transition duration-300`}
          >
            {loading ? 'Saving...' : lead ? 'Update Lead' : 'Add Lead'}
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/leads')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeadForm; 