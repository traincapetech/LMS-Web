import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const steps = [
  { key: "intended", label: "Intended learners" },
  { key: "structure", label: "Course structure" },
  { key: "setup", label: "Setup & test video" },
  { key: "film", label: "Film & edit" },
  { key: "curriculum", label: "Curriculum" },
  { key: "captions", label: "Captions (optional)" },
  { key: "accessibility", label: "Accessibility (optional)" },
  { key: "landing", label: "Course landing page" },
  { key: "pricing", label: "Pricing" },
  { key: "promotions", label: "Promotions" },
  { key: "messages", label: "Course messages" },
];

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the first step when accessing /dashboard
    navigate('/dashboard/intended');
  }, [navigate]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      background: '#f7f7fa',
      flexDirection: 'column',
      gap: '20px'
    }}>
      <div style={{ fontSize: '24px', color: '#5624d0', fontWeight: 'bold' }}>
        Redirecting to Dashboard...
      </div>
      <div style={{ fontSize: '16px', color: '#666' }}>
        Please wait while we redirect you to the first step.
      </div>
    </div>
  );
};

export default Dashboard;
