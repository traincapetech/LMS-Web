// src/routes/AllRoutes.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import LeadsPage from "../pages/LeadsPage";
import SalesPage from "../pages/SalesPage";
import ProtectedRoute from "./ProtectedRoute";

const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route
          path="/leads"
          element={
            <ProtectedRoute allowedRoles={["Lead Person", "Manager", "Admin"]}>
              <LeadsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sales"
          element={
            <ProtectedRoute allowedRoles={["Sales Person", "Manager", "Admin"]}>
              <SalesPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AllRoutes;
