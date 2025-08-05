import React, { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await fetch("https://lms-backend-5s5x.onrender.com/api/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) {
          localStorage.setItem("user", JSON.stringify(data));
          setUser(data);
        }
      } catch {}
    };
    fetchProfile();
  }, []);

  return (
    <div style={{ 
      maxWidth: 600, 
      margin: '40px auto', 
      padding: 32, 
      background: '#fff', 
      borderRadius: 16, 
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb'
    }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h2 style={{ 
          fontWeight: 800, 
          fontSize: 32, 
          marginBottom: 8,
          color: '#1f2937'
        }}>
          Welcome, {user?.name}! 👋
        </h2>
        <p style={{ 
          color: '#6b7280', 
          fontSize: 16,
          marginBottom: 24
        }}>
          Your account has been successfully created and you're now logged in.
        </p>
      </div>

      <div style={{ 
        background: '#f8fafc', 
        padding: 24, 
        borderRadius: 12,
        marginBottom: 24
      }}>
        <h3 style={{ 
          fontWeight: 600, 
          fontSize: 18, 
          marginBottom: 16,
          color: '#374151'
        }}>
          Account Information
        </h3>
        <div style={{ display: 'grid', gap: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
            <span style={{ fontWeight: 500, color: '#6b7280' }}>Name:</span>
            <span style={{ fontWeight: 600, color: '#1f2937' }}>{user?.name}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
            <span style={{ fontWeight: 500, color: '#6b7280' }}>Email:</span>
            <span style={{ fontWeight: 600, color: '#1f2937' }}>{user?.email}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
            <span style={{ fontWeight: 500, color: '#6b7280' }}>Role:</span>
            <span style={{ 
              fontWeight: 600,
              color: user?.role === 'admin'
                ? '#dc2626'
                : user?.role === 'instructor'
                  ? '#059669'
                  : '#2563eb',
              textTransform: 'capitalize'
            }}>
              {user?.role}
            </span>
          </div>
        </div>
      </div>

      <div style={{ 
        background: '#f0f9ff', 
        padding: 20, 
        borderRadius: 12,
        border: '1px solid #bae6fd'
      }}>
        <h4 style={{ 
          fontWeight: 600, 
          fontSize: 16, 
          marginBottom: 8,
          color: '#0369a1'
        }}>
          🎉 What's Next?
        </h4>
        <p style={{ 
          color: '#0c4a6e', 
          fontSize: 14,
          lineHeight: 1.5
        }}>
          {user?.role === "admin"
            ? "As an admin, you can manage instructors, courses, and system settings. Explore the admin dashboard to get started."
            : user?.role === "instructor"
              ? "As an instructor, you can create and manage courses. Start by creating your first course!"
              : "As a student, you can browse courses, enroll in classes, and track your learning progress. Explore our course catalog to get started."}
        </p>
      </div>

      <div style={{ 
        marginTop: 24, 
        textAlign: 'center'
      }}>
        <a 
          href="/" 
          style={{
            background: 'linear-gradient(to right, #5624d0, #7c3aed)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600,
            display: 'inline-block',
            transition: 'transform 0.2s'
          }}
          onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={e => e.target.style.transform = 'scale(1)'}
        >
          🏠 Go to Homepage
        </a>
      </div>
    </div>
  );
};

export default Profile; 