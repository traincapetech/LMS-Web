// TEMPLATE FOR ALL COURSE PAGES
// Copy this structure to update your remaining course pages

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart, scrollToTop } from '../utils/cartUtils';
import '../App.css';

const [CourseName]Courses = () => {
  const navigate = useNavigate();

  // Your course data array here
  const [courseName]Courses = [
    // ... your course objects
  ];

  const handleAddToCart = (course) => {
    addToCart(course);
  };

  const handleBrowseAllCourses = () => {
    scrollToTop();
    navigate('/courses');
  };

  const handleGetFreeTrial = () => {
    scrollToTop();
    navigate('/signup');
  };

  return (
    <div className="[course-name]-courses-page">
      {/* Hero Section */}
      <section className="[course-name]-hero">
        <div className="hero-content">
          <h1>Your Hero Title</h1>
          <p>Your hero description</p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">1M+</span>
              <span className="stat-label">Active Learners</span>
            </div>
            {/* Add more stats */}
          </div>
        </div>
        <div className="hero-image">
          <img src="your-image-url" alt="Description" />
        </div>
      </section>

      {/* Why Learn Section */}
      <section className="why-learn">
        <h2>Why Learn [Course Topic] in 2024?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">🚀</div>
            <h3>Benefit Title</h3>
            <p>Benefit description</p>
          </div>
          {/* Add more benefit cards */}
        </div>
      </section>

      {/* Course Categories or Applications */}
      <section className="[course-name]-applications">
        <h2>What Can You Do with [Course Topic]?</h2>
        <div className="applications-grid">
          <div className="app-card">
            <div className="app-icon">🎯</div>
            <h3>Application Title</h3>
            <p>Application description</p>
          </div>
          {/* Add more application cards */}
        </div>
      </section>

      {/* Learning Paths */}
      <section className="learning-paths">
        <h2>[Course Topic] Learning Paths</h2>
        <div className="paths-grid">
          <div className="path-card">
            <h3>🚀 Beginner Path</h3>
            <p>Path description</p>
            <span className="path-duration">2-3 months</span>
          </div>
          {/* Add more path cards */}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="featured-courses">
        <h2>Top-Rated [Course Topic] Courses</h2>
        <div className="courses-grid">
          {[courseName]Courses.map((course) => (
            <div key={course.id} className="course-card">
              <div className="course-image">
                <img src={course.image} alt={course.title} />
                <div className="course-overlay">
                  <button className="preview-btn">Preview</button>
                </div>
              </div>
              <div className="course-content">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-instructor">by {course.instructor}</p>
                <div className="course-rating">
                  <span className="stars">★★★★★</span>
                  <span className="rating-number">{course.rating}</span>
                  <span className="students">({course.students.toLocaleString()})</span>
                </div>
                <p className="course-description">{course.description}</p>
                <div className="course-meta">
                  <span className="duration">{course.duration}</span>
                  <span className="level">{course.level}</span>
                  <span className="updated">Updated {course.lastUpdated}</span>
                </div>
                <div className="course-pricing">
                  <span className="current-price">${course.price}</span>
                  <span className="original-price">${course.originalPrice}</span>
                  <span className="discount">{Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% off</span>
                </div>
                <button 
                  className="enroll-btn"
                  onClick={() => handleAddToCart(course)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Success Stories */}
      <section className="success-stories">
        <h2>Success Stories from Our Learners</h2>
        <div className="stories-grid">
          <div className="story-card">
            <div className="story-avatar">
              <img src="avatar-url" alt="Name" />
            </div>
            <div className="story-content">
              <p>"Success story quote"</p>
              <h4>Name</h4>
              <span>Job Title</span>
            </div>
          </div>
          {/* Add more story cards */}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Master [Course Topic]?</h2>
          <p>Join millions of learners and start your journey today</p>
          <div className="cta-buttons">
            <button className="primary-btn" onClick={handleBrowseAllCourses}>
              Browse All Courses
            </button>
            <button className="secondary-btn" onClick={handleGetFreeTrial}>
              Get Free Trial
            </button>
          </div>
        </div>
      </section>

      {/* Footer Navigation */}
      <section className="footer-nav">
        <div className="nav-links">
          <Link to="/" className="nav-link" onClick={scrollToTop}>← Back to Home</Link>
          <Link to="/courses" className="nav-link" onClick={scrollToTop}>Browse All Courses</Link>
        </div>
      </section>
    </div>
  );
};

export default [CourseName]Courses;

// KEY CHANGES TO MAKE IN EACH FILE:
// 1. Import useNavigate and cart utilities
// 2. Add handleAddToCart function
// 3. Add handleBrowseAllCourses function  
// 4. Add handleGetFreeTrial function
// 5. Add onClick={scrollToTop} to all Link components
// 6. Remove "My Dashboard" link from footer
// 7. Add onClick handlers to CTA buttons
// 8. Add onClick={handleAddToCart} to Add to Cart buttons
