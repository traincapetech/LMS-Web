import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Captions from "../components/dashboard/Captions";
import { loadDashboardData, saveDashboardData } from "../utils/dashboardUtils";

const DashboardCaptions = () => {
  const navigate = useNavigate();
  const [captions, setCaptions] = useState("");
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  // Load existing data when component mounts
  useEffect(() => {
    const loadData = async () => {
      const result = await loadDashboardData();
      if (result.success && result.data && result.data.captions) {
        setCaptions(result.data.captions);
      }
    };

    loadData();
  }, []);

  const handleNext = async () => {
    setLoading(true);
    try {
      const result = await saveDashboardData('captions', { captions });
      
      if (result.success) {
        navigate('/dashboard/accessibility');
      } else {
        alert('Failed to save data. Please try again.');
      }
    } catch (error) {
      console.error('Failed to save dashboard data:', error);
      alert('Failed to save data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    navigate('/dashboard/curriculum');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f7f7fa' }}>
      <aside style={{ width: 270, background: '#fff', borderRight: '1px solid #eee', padding: '40px 0 0 0', minHeight: '100vh' }}>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li>
              <button
                className="sidebar-btn"
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '16px 32px',
                  background: 'none',
                  border: 'none',
                  borderLeft: '4px solid transparent',
                  color: '#232323',
                  fontWeight: 500,
                  fontSize: 17,
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'background 0.2s, color 0.2s',
                }}
                onClick={() => navigate('/dashboard/intended')}
              >
                Intended learners
              </button>
            </li>
            <li>
              <button
                className="sidebar-btn"
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '16px 32px',
                  background: 'none',
                  border: 'none',
                  borderLeft: '4px solid transparent',
                  color: '#232323',
                  fontWeight: 500,
                  fontSize: 17,
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'background 0.2s, color 0.2s',
                }}
                onClick={() => navigate('/dashboard/structure')}
              >
                Course structure
              </button>
            </li>
            <li>
              <button
                className="sidebar-btn"
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '16px 32px',
                  background: 'none',
                  border: 'none',
                  borderLeft: '4px solid transparent',
                  color: '#232323',
                  fontWeight: 500,
                  fontSize: 17,
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'background 0.2s, color 0.2s',
                }}
                onClick={() => navigate('/dashboard/setup')}
              >
                Setup & test video
              </button>
            </li>
            <li>
              <button
                className="sidebar-btn"
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '16px 32px',
                  background: 'none',
                  border: 'none',
                  borderLeft: '4px solid transparent',
                  color: '#232323',
                  fontWeight: 500,
                  fontSize: 17,
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'background 0.2s, color 0.2s',
                }}
                onClick={() => navigate('/dashboard/film')}
              >
                Film & edit
              </button>
            </li>
            <li>
              <button
                className="sidebar-btn"
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '16px 32px',
                  background: 'none',
                  border: 'none',
                  borderLeft: '4px solid transparent',
                  color: '#232323',
                  fontWeight: 500,
                  fontSize: 17,
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'background 0.2s, color 0.2s',
                }}
                onClick={() => navigate('/dashboard/curriculum')}
              >
                Curriculum
              </button>
            </li>
            <li>
              <button
                className="sidebar-btn active"
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '16px 32px',
                  background: '#f3f0ff',
                  border: 'none',
                  borderLeft: '4px solid #7c3aed',
                  color: '#5624d0',
                  fontWeight: 700,
                  fontSize: 17,
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'background 0.2s, color 0.2s',
                }}
              >
                Captions (optional)
              </button>
            </li>
            <li>
              <button
                className="sidebar-btn"
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '16px 32px',
                  background: 'none',
                  border: 'none',
                  borderLeft: '4px solid transparent',
                  color: '#232323',
                  fontWeight: 500,
                  fontSize: 17,
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'background 0.2s, color 0.2s',
                }}
                onClick={() => navigate('/dashboard/accessibility')}
              >
                Accessibility (optional)
              </button>
            </li>
            <li>
              <button
                className="sidebar-btn"
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '16px 32px',
                  background: 'none',
                  border: 'none',
                  borderLeft: '4px solid transparent',
                  color: '#232323',
                  fontWeight: 500,
                  fontSize: 17,
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'background 0.2s, color 0.2s',
                }}
                onClick={() => navigate('/dashboard/landing')}
              >
                Course landing page
              </button>
            </li>
            <li>
              <button
                className="sidebar-btn"
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '16px 32px',
                  background: 'none',
                  border: 'none',
                  borderLeft: '4px solid transparent',
                  color: '#232323',
                  fontWeight: 500,
                  fontSize: 17,
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'background 0.2s, color 0.2s',
                }}
                onClick={() => navigate('/dashboard/pricing')}
              >
                Pricing
              </button>
            </li>
            <li>
              <button
                className="sidebar-btn"
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '16px 32px',
                  background: 'none',
                  border: 'none',
                  borderLeft: '4px solid transparent',
                  color: '#232323',
                  fontWeight: 500,
                  fontSize: 17,
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'background 0.2s, color 0.2s',
                }}
                onClick={() => navigate('/dashboard/promotions')}
              >
                Promotions
              </button>
            </li>
            <li>
              <button
                className="sidebar-btn"
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '16px 32px',
                  background: 'none',
                  border: 'none',
                  borderLeft: '4px solid transparent',
                  color: '#232323',
                  fontWeight: 500,
                  fontSize: 17,
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'background 0.2s, color 0.2s',
                }}
                onClick={() => navigate('/dashboard/messages')}
              >
                Course messages
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '48px 48px 48px 48px', maxWidth: 900, margin: '0 auto', position: 'relative' }}>
        <Captions
          captions={captions}
          setCaptions={setCaptions}
          touched={touched}
          setTouched={setTouched}
        />
        <div style={{ display: 'flex', gap: '16px', position: 'fixed', bottom: 40, right: 48 }}>
          <button
            style={{
              background: '#fff',
              color: '#5624d0',
              padding: '16px 38px',
              fontSize: '1.2rem',
              border: '2px solid #5624d0',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 700,
              boxShadow: '0 4px 16px rgba(124, 58, 237, 0.13)',
              zIndex: 100
            }}
            onClick={handlePrevious}
          >
            Previous
          </button>
          <button
            style={{
              background: 'linear-gradient(to right, #5624d0, #7c3aed)',
              color: 'white',
              padding: '16px 38px',
              fontSize: '1.2rem',
              border: 'none',
              borderRadius: '10px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 700,
              boxShadow: '0 4px 16px rgba(124, 58, 237, 0.13)',
              zIndex: 100,
              opacity: loading ? 0.7 : 1
            }}
            onClick={handleNext}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Next: Accessibility'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default DashboardCaptions; 