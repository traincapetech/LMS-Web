// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const userRole = localStorage.getItem("userRole"); // Get the user role from local storage

  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">My CRM</h1>
        <ul className="flex space-x-4">
          {/* Home link accessible to all */}
          <li>
            <Link to="/" className="hover:text-blue-300">Home</Link>
          </li>

          {/* Lead Person, Manager, and Admin can access Leads page */}
          {userRole === "Lead Person" || userRole === "Manager" || userRole === "Admin" ? (
            <li>
              <Link to="/leads" className="hover:text-blue-300">Leads</Link>
            </li>
          ) : null}

          {/* Sales Person, Manager, and Admin can access Sales page */}
          {userRole === "Sales Person" || userRole === "Manager" || userRole === "Admin" ? (
            <li>
              <Link to="/sales" className="hover:text-blue-300">Sales</Link>
            </li>
          ) : null}

          {/* Admin only link to Admin Dashboard */}
          {userRole === "Admin" && (
            <li>
              <Link to="/admin" className="hover:text-blue-300">Admin Dashboard</Link>
            </li>
          )}

          {/* Login link accessible to all */}
          {!userRole ? (
            <li>
              <Link to="/login" className="hover:text-blue-300">Login</Link>
            </li>
          ) : (
            <li>
              <button onClick={() => { localStorage.removeItem("userRole"); window.location.reload(); }} className="hover:text-blue-300">
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
