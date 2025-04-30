import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const ProfilePage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Format date for better readability
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-600 text-white p-4">
            <h2 className="text-2xl font-bold">User Profile</h2>
          </div>
          <div className="p-6">
            <div className="mb-8 text-center">
              <div className="h-24 w-24 rounded-full bg-blue-100 mx-auto flex items-center justify-center">
                <span className="text-3xl font-bold text-blue-600">
                  {user.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
                </span>
              </div>
              <h3 className="text-xl font-bold mt-4">{user.fullName}</h3>
              <p className="text-gray-600">{user.email}</p>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mt-2">
                {user.role}
              </span>
            </div>
            
            <div className="space-y-4">
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-lg font-bold mb-2">Account Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">User ID</p>
                    <p className="font-medium">{user._id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Created</p>
                    <p className="font-medium">{formatDate(user.createdAt)}</p>
                  </div>
                </div>
              </div>
              
              {user.role === "Sales Person" && (
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-lg font-bold mb-2">Sales Information</h4>
                  <p className="text-gray-600">You have access to view and manage leads assigned to you.</p>
                </div>
              )}
              
              {user.role === "Lead Person" && (
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-lg font-bold mb-2">Lead Management</h4>
                  <p className="text-gray-600">You have access to create leads and view leads assigned to you.</p>
                </div>
              )}
              
              {(user.role === "Admin" || user.role === "Manager") && (
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-lg font-bold mb-2">Administrative Access</h4>
                  <p className="text-gray-600">You have access to all leads and administrative functions.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage; 