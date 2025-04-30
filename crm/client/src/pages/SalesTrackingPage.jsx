import React, { useState, useEffect } from "react";
import { salesAPI, leadsAPI, authAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout/Layout";
import { formatCurrency } from "../utils/helpers";

const SalesTrackingPage = () => {
  const { user } = useAuth();
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingSale, setEditingSale] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSale, setNewSale] = useState({
    leadId: "",
    amount: 0,
    token: 0,
    pending: 0,
    product: "",
    status: "Pending"
  });
  const [availableLeads, setAvailableLeads] = useState([]);
  const [leadOptions, setLeadOptions] = useState([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  
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

  // Fetch sales data
  useEffect(() => {
    fetchSales();
  }, [user]);
  
  // Apply date filters when sales, month, or year changes
  useEffect(() => {
    if (sales.length > 0) {
      filterSalesByDate();
    }
  }, [sales, filterMonth, filterYear, showCurrentMonth]);
  
  // Function to filter sales by selected date
  const filterSalesByDate = () => {
    if (showCurrentMonth) {
      // Show current month data
      const currentMonth = new Date().getMonth() + 1; // 1-12
      const currentYear = new Date().getFullYear();
      
      const filtered = sales.filter(sale => {
        const saleDate = new Date(sale.createdAt);
        return (
          saleDate.getMonth() + 1 === currentMonth && 
          saleDate.getFullYear() === currentYear
        );
      });
      
      setFilteredSales(filtered);
    } else {
      // Show selected month/year data
      const filtered = sales.filter(sale => {
        const saleDate = new Date(sale.createdAt);
        return (
          saleDate.getMonth() + 1 === filterMonth && 
          saleDate.getFullYear() === filterYear
        );
      });
      
      setFilteredSales(filtered);
    }
  };

  const fetchSales = async () => {
    try {
      setLoading(true);
      const response = await salesAPI.getAll();
      
      if (response.data.success) {
        // Debug log the response data
        console.log("Sales API response:", response.data);
        
        // Initialize sales with additional fields we want to track
        const processedSales = await Promise.all(
          response.data.data.map(async (sale) => {
            // If sale doesn't have token or pending, initialize them
            if (!sale.token) sale.token = 0;
            if (!sale.pending) sale.pending = sale.amount - (sale.token || 0);
            
            // Debug log individual sale
            console.log("Processing sale:", {
              id: sale._id,
              leadId: sale.leadId,
              salesPerson: sale.salesPerson,
              leadName: sale.leadId?.name,
              phone: sale.leadId?.phone,
              countryCode: sale.leadId?.countryCode,
              country: sale.leadId?.country,
              leadBy: sale.leadId?.leadPerson?.fullName || sale.leadId?.createdBy?.fullName,
              saleBy: sale.salesPerson?.fullName
            });
            
            return sale;
          })
        );
        
        setSales(processedSales);
      } else {
        setError("Failed to load sales data");
      }
    } catch (err) {
      console.error("Error fetching sales:", err);
      setError("Failed to load sales data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch available leads for selection in add sale form
  const fetchAvailableLeads = async () => {
    try {
      setLoadingLeads(true);
      let leadsData = [];
      
      // If sales person, fetch assigned leads
      if (user.role === 'Sales Person') {
        const response = await leadsAPI.getAssigned();
        if (response.data.success) {
          leadsData = response.data.data.filter(lead => lead.status !== 'Converted');
        }
      } else {
        // For admin and manager, fetch all leads
        const response = await leadsAPI.getAll();
        if (response.data.success) {
          leadsData = response.data.data.filter(lead => lead.status !== 'Converted');
        }
      }
      
      setAvailableLeads(leadsData);
      
      // Create options for select dropdown
      const options = leadsData.map(lead => ({
        value: lead._id,
        label: `${lead.name} - ${lead.course} (${lead.status})`,
        data: lead
      }));
      
      setLeadOptions(options);
    } catch (err) {
      console.error("Error fetching leads:", err);
      setError("Failed to load leads. Please try again.");
    } finally {
      setLoadingLeads(false);
    }
  };

  // Handle opening add sale modal
  const handleAddSaleClick = () => {
    fetchAvailableLeads();
    setShowAddModal(true);
  };

  // Handle lead selection in add form
  const handleLeadSelect = (e) => {
    const selectedLeadId = e.target.value;
    const selectedLead = availableLeads.find(lead => lead._id === selectedLeadId);
    
    if (selectedLead) {
      setNewSale(prev => ({
        ...prev,
        leadId: selectedLeadId,
        product: selectedLead.course || '',
      }));
    }
  };

  // Handle new sale form input changes
  const handleNewSaleChange = (field, value) => {
    setNewSale(prev => {
      const updates = { ...prev, [field]: value };
      
      // Automatically calculate pending when amount or token changes
      if (field === 'amount' || field === 'token') {
        const amount = field === 'amount' ? parseFloat(value) || 0 : parseFloat(prev.amount) || 0;
        const token = field === 'token' ? parseFloat(value) || 0 : parseFloat(prev.token) || 0;
        updates.pending = amount - token;
      }
      
      return updates;
    });
  };

  // Submit new sale
  const handleSubmitNewSale = async (e) => {
    e.preventDefault();
    
    try {
      const saleData = {
        ...newSale,
        amount: parseFloat(newSale.amount),
        token: parseFloat(newSale.token),
        pending: parseFloat(newSale.pending),
        status: 'Pending' // Default status for new sale
      };
      
      console.log("Submitting new sale with data:", saleData);
      
      const response = await salesAPI.create(saleData);
      
      if (response.data.success) {
        console.log("Sale created successfully:", response.data.data);
        
        // Add new sale to the list
        setSales(prev => [response.data.data, ...prev]);
        
        // Close modal and reset form
        setShowAddModal(false);
        setNewSale({
          leadId: "",
          amount: 0,
          token: 0,
          pending: 0,
          product: "",
          status: "Pending"
        });
        
        // Show success message
        alert("Sale added successfully!");
      } else {
        setError("Failed to add sale");
      }
    } catch (err) {
      console.error("Error adding sale:", err);
      setError("Failed to add sale. Please try again.");
    }
  };

  // Handle edit mode for a sale
  const handleEdit = (sale) => {
    setEditingSale(sale._id);
    setEditValues({
      amount: sale.amount,
      token: sale.token || 0,
      pending: sale.pending || (sale.amount - (sale.token || 0))
    });
  };

  // Handle saving edits
  const handleSave = async (saleId) => {
    try {
      const response = await salesAPI.update(saleId, {
        amount: parseFloat(editValues.amount),
        token: parseFloat(editValues.token),
        pending: parseFloat(editValues.pending)
      });
      
      if (response.data.success) {
        setSales(sales.map(sale => 
          sale._id === saleId ? response.data.data : sale
        ));
        setEditingSale(null);
      } else {
        setError("Failed to update sale");
      }
    } catch (err) {
      console.error("Error updating sale:", err);
      setError("Failed to update sale. Please try again.");
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingSale(null);
    setEditValues({});
  };

  // Handle input change for editable fields
  const handleInputChange = (field, value) => {
    setEditValues(prev => {
      const updates = { ...prev, [field]: value };
      
      // Automatically calculate pending amount when amount or token changes
      if (field === 'amount' || field === 'token') {
        updates.pending = updates.amount - updates.token;
      }
      
      return updates;
    });
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
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

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Sales Tracking</h2>
          <button
            onClick={handleAddSaleClick}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition duration-300"
          >
            Add New Sale
          </button>
        </div>
        
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
            <p className="mt-2 text-gray-600">Loading sales data...</p>
          </div>
        ) : (
          <>
            {/* Date Filter Controls */}
            <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-3">Filter Sales by Date</h3>
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
                  <p>Showing sales for current month: {months[new Date().getMonth()].label} {new Date().getFullYear()}</p>
                ) : (
                  <p>Showing sales for: {months[filterMonth - 1].label} {filterYear}</p>
                )}
                <p>Total: {filteredSales.length} sales</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {filteredSales.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-600">No sales found for the selected time period.</p>
                  <div className="mt-4 space-x-4">
                    <button
                      onClick={handleResetToCurrentMonth}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300"
                    >
                      View Current Month
                    </button>
                    <button
                      onClick={handleAddSaleClick}
                      className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition duration-300"
                    >
                      Add Your First Sale
                    </button>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-3 px-4 text-left">Date</th>
                        <th className="py-3 px-4 text-left">Name</th>
                        <th className="py-3 px-4 text-left">Course</th>
                        <th className="py-3 px-4 text-left">Number</th>
                        <th className="py-3 px-4 text-left">Country</th>
                        <th className="py-3 px-4 text-left">Total Amount</th>
                        <th className="py-3 px-4 text-left">Token</th>
                        <th className="py-3 px-4 text-left">Pending</th>
                        <th className="py-3 px-4 text-left">Lead By</th>
                        <th className="py-3 px-4 text-left">Sale By</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSales.map((sale) => (
                        <tr key={sale._id} className="border-t border-gray-200 hover:bg-gray-50">
                          <td className="py-3 px-4">{formatDate(sale.createdAt)}</td>
                          <td className="py-3 px-4">{sale.leadId?.name || 'N/A'}</td>
                          <td className="py-3 px-4">{sale.product}</td>
                          <td className="py-3 px-4">
                            {(sale.leadId?.phone && sale.leadId?.countryCode) ? 
                              `${sale.leadId.countryCode} ${sale.leadId.phone}` : 
                              'N/A'}
                          </td>
                          <td className="py-3 px-4">{sale.leadId?.country || 'N/A'}</td>
                          
                          {/* Total Amount - Editable */}
                          <td className="py-3 px-4">
                            {editingSale === sale._id ? (
                              <input
                                type="number"
                                value={editValues.amount}
                                onChange={(e) => handleInputChange('amount', parseFloat(e.target.value) || 0)}
                                className="w-full p-1 border border-gray-300 rounded-md"
                              />
                            ) : (
                              formatCurrency(sale.amount)
                            )}
                          </td>
                          
                          {/* Token Amount - Editable */}
                          <td className="py-3 px-4">
                            {editingSale === sale._id ? (
                              <input
                                type="number"
                                value={editValues.token}
                                onChange={(e) => handleInputChange('token', parseFloat(e.target.value) || 0)}
                                className="w-full p-1 border border-gray-300 rounded-md"
                              />
                            ) : (
                              formatCurrency(sale.token || 0)
                            )}
                          </td>
                          
                          {/* Pending Amount - Editable */}
                          <td className="py-3 px-4">
                            {editingSale === sale._id ? (
                              <input
                                type="number"
                                value={editValues.pending}
                                onChange={(e) => handleInputChange('pending', parseFloat(e.target.value) || 0)}
                                className="w-full p-1 border border-gray-300 rounded-md"
                              />
                            ) : (
                              formatCurrency(sale.pending || (sale.amount - (sale.token || 0)))
                            )}
                          </td>
                          
                          <td className="py-3 px-4">{sale.leadId?.leadPerson?.fullName || sale.leadId?.createdBy?.fullName || 'N/A'}</td>
                          <td className="py-3 px-4">{sale.salesPerson?.fullName || 'N/A'}</td>
                          
                          {/* Actions */}
                          <td className="py-3 px-4">
                            {editingSale === sale._id ? (
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleSave(sale._id)}
                                  className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={handleCancelEdit}
                                  className="px-3 py-1 bg-gray-400 hover:bg-gray-500 text-white rounded-md text-sm"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleEdit(sale)}
                                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
                              >
                                Edit
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
        
        {/* Add Sale Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-green-600 text-white p-4 flex justify-between items-center">
                <h3 className="text-xl font-bold">Add New Sale</h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-white hover:text-gray-200 text-2xl"
                >
                  &times;
                </button>
              </div>
              
              <form onSubmit={handleSubmitNewSale} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Lead Selection */}
                  <div className="col-span-2">
                    <label htmlFor="leadId" className="block text-sm font-medium text-gray-700 mb-1">
                      Select Lead
                    </label>
                    {loadingLeads ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
                        <span className="text-sm text-gray-500">Loading leads...</span>
                      </div>
                    ) : leadOptions.length === 0 ? (
                      <div className="text-red-500 text-sm">
                        No available leads found. Please create leads first.
                      </div>
                    ) : (
                      <select
                        id="leadId"
                        value={newSale.leadId}
                        onChange={handleLeadSelect}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="">-- Select a lead --</option>
                        {leadOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                  
                  {/* Course/Product */}
                  <div>
                    <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-1">
                      Course/Product
                    </label>
                    <input
                      id="product"
                      type="text"
                      value={newSale.product}
                      onChange={(e) => handleNewSaleChange('product', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g. Web Development, Data Science"
                      required
                    />
                  </div>
                  
                  {/* Amount Fields */}
                  <div className="grid grid-cols-3 gap-3 col-span-1">
                    <div>
                      <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                        Total Amount
                      </label>
                      <input
                        id="amount"
                        type="number"
                        value={newSale.amount}
                        onChange={(e) => handleNewSaleChange('amount', parseFloat(e.target.value) || 0)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-1">
                        Token
                      </label>
                      <input
                        id="token"
                        type="number"
                        value={newSale.token}
                        onChange={(e) => handleNewSaleChange('token', parseFloat(e.target.value) || 0)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="pending" className="block text-sm font-medium text-gray-700 mb-1">
                        Pending
                      </label>
                      <input
                        id="pending"
                        type="number"
                        value={newSale.pending}
                        onChange={(e) => handleNewSaleChange('pending', parseFloat(e.target.value) || 0)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        min="0"
                        step="0.01"
                        disabled
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition duration-300"
                  >
                    Add Sale
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SalesTrackingPage; 