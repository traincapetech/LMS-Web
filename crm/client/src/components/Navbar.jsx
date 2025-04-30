// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CurrencySelector from "./CurrencySelector";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <a href="/"> <h1 className="text-xl font-bold">My CRM</h1></a>
        <ul className="flex space-x-4">
          {/* Home link accessible to all */}
          <li>
            <Link to="/" className="hover:text-blue-300">Home</Link>
          </li>

          {/* Lead Person, Manager, and Admin can access Leads page */}
          {user && (user.role === "Lead Person" || user.role === "Manager" || user.role === "Admin") && (
            <li>
              <Link to="/leads" className="hover:text-blue-300">Leads</Link>
            </li>
          )}

          {/* Sales Person can access Sales page */}
          {user && user.role === "Sales Person" && (
            <li>
              <Link to="/sales" className="hover:text-blue-300">My Leads</Link>
            </li>
          )}
          
          {/* Sales Person, Manager, and Admin can access Sales Tracking */}
          {user && (user.role === "Sales Person" || user.role === "Manager" || user.role === "Admin") && (
            <li>
              <Link to="/sales-tracking" className="hover:text-blue-300">Sales Tracking</Link>
            </li>
          )}

          {/* Admin only links */}
          {user && user.role === "Admin" && (
            <>
              <li>
                <Link to="/admin" className="hover:text-blue-300">Admin Dashboard</Link>
              </li>
              <li>
                <Link to="/admin/users" className="hover:text-blue-300">Manage Users</Link>
              </li>
              <li>
                <Link to="/admin/leads" className="hover:text-blue-300">Manage Leads</Link>
              </li>
            </>
          )}

          {/* Currency Selector */}
          <li className="ml-4">
            <CurrencySelector />
          </li>

          {/* Profile and Logout buttons for authenticated users */}
          {user ? (
            <>
              <li>
                <Link to="/profile" className="hover:text-blue-300">Profile</Link>
              </li>
              <li>
                <button 
                  onClick={handleLogout} 
                  className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded-md transition duration-300"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="hover:text-blue-300">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
