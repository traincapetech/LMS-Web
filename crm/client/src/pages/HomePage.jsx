// src/pages/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-700 to-indigo-800 text-white min-h-[50vh] flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">TrainCape CRM</h1>
            <p className="text-xl mb-6">Manage leads and track sales in one centralized platform.</p>
            {!user ? (
              <div className="flex flex-wrap gap-4">
                <Link to="/login" className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition">
                  Sign In
                </Link>
              </div>
            ) : (
              <div className="flex flex-wrap gap-4">
                {user.role === "Sales Person" && (
                  <Link to="/sales" className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition">
                    My Leads
                  </Link>
                )}
                {(user.role === "Lead Person" || user.role === "Manager" || user.role === "Admin") && (
                  <Link to="/leads" className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition">
                    Manage Leads
                  </Link>
                )}
                <Link to="/profile" className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-700 transition">
                  My Profile
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Quick Access Cards */}
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 -mt-10 relative z-10">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-lg shadow hover:shadow-md transition">
              <div className="flex items-start">
                <div className="bg-blue-100 text-blue-700 p-3 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Contact Management</h3>
                  <p className="text-gray-600 text-sm">Organize client data with powerful filters and segments.</p>
                  <Link to="/leads" className="text-blue-700 font-medium text-sm mt-2 inline-block">Access Contacts →</Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow hover:shadow-md transition">
              <div className="flex items-start">
                <div className="bg-green-100 text-green-700 p-3 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Sales Pipeline</h3>
                  <p className="text-gray-600 text-sm">Track deals from lead to close with customizable processes.</p>
                  <Link to="/sales" className="text-green-700 font-medium text-sm mt-2 inline-block">View Pipeline →</Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow hover:shadow-md transition">
              <div className="flex items-start">
                <div className="bg-purple-100 text-purple-700 p-3 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Task Management</h3>
                  <p className="text-gray-600 text-sm">Never miss a follow-up with automated reminders.</p>
                  <Link to="/sales-tracking" className="text-purple-700 font-medium text-sm mt-2 inline-block">Manage Tasks →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="bg-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Leads", value: "Today", icon: "📊" },
              { label: "Tasks", value: "Pending", icon: "✅" },
              { label: "Sales", value: "This Month", icon: "💰" },
              { label: "Team", value: "Members", icon: "👥" }
            ].map((stat, index) => (
              <Link key={index} to={index === 0 ? "/leads" : index === 1 ? "/leads" : index === 2 ? "/sales" : "/profile"} 
                className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-lg font-bold">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.value}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Role-based Access */}
      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Your Role: {user?.role || "Not Logged In"}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-lg shadow">
              <h3 className="font-bold text-blue-700 mb-2">Lead Person</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-sm">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Create and manage leads
                </li>
                <li className="flex items-center text-sm">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Assign leads to team members
                </li>
                <li className="flex items-center text-sm">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Track lead progress
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow">
              <h3 className="font-bold text-green-700 mb-2">Sales Person</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-sm">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Access assigned leads
                </li>
                <li className="flex items-center text-sm">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Update lead status
                </li>
                <li className="flex items-center text-sm">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Close deals and record sales
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow">
              <h3 className="font-bold text-purple-700 mb-2">Manager/Admin</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-sm">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Full system access
                </li>
                <li className="flex items-center text-sm">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  View all leads and sales
                </li>
                <li className="flex items-center text-sm">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Manage team and generate reports
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          {!user ? (
            <div>
              <h2 className="text-2xl font-bold mb-4">Sign in to access your dashboard</h2>
              <Link to="/login" className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow hover:bg-gray-100 transition inline-block">
                Login
              </Link>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-4">Welcome, {user.fullName}</h2>
              <p className="mb-4">Access your dashboard to manage your tasks.</p>
              <Link to={user.role === "Sales Person" ? "/sales" : "/leads"} className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow hover:bg-gray-100 transition inline-block">
                Go to Dashboard
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
