// src/routes/AllRoutes.jsx
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import LeadsPage from "../pages/LeadsPage";
import SalesPage from "../pages/SalesPage";
import SalesTrackingPage from "../pages/SalesTrackingPage";
import ProfilePage from "../pages/ProfilePage";
import TokenDebugPage from "../pages/TokenDebugPage";
import AdminDashboardPage from "../pages/AdminDashboardPage";
import AdminUsersPage from "../pages/AdminUsersPage";
import AdminLeadsPage from "../pages/AdminLeadsPage";
import ProtectedRoute from "./ProtectedRoute";

const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/debug" element={<TokenDebugPage />} />

        {/* Protected Routes */}
        <Route
          path="/leads"
          element={
            <ProtectedRoute allowedRoles={["Lead Person", "Manager", "Admin"]}>
              <LeadsPage />
            </ProtectedRoute>
          }
        />
        
        {/* Sales Routes */}
        <Route
          path="/sales"
          element={
            <ProtectedRoute allowedRoles={["Sales Person", "Manager", "Admin"]}>
              <SalesPage />
            </ProtectedRoute>
          }
        />
        
        {/* Sales Tracking Route */}
        <Route
          path="/sales-tracking"
          element={
            <ProtectedRoute allowedRoles={["Sales Person", "Manager", "Admin"]}>
              <SalesTrackingPage />
            </ProtectedRoute>
          }
        />
        
        {/* Profile Route - accessible to all authenticated users */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["Sales Person", "Lead Person", "Manager", "Admin"]}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        
        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminUsersPage />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/admin/leads"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminLeadsPage />
            </ProtectedRoute>
          }
        />
        
        {/* Catch-all route for 404 errors */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
};

export default AllRoutes;
