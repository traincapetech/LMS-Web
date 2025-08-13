import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addCourseToCart, forceScrollToTop, setupGlobalScrollToTop } from '../utils/cartUtils';
import '../App.css';

const PowerBICourses = () => {
  const navigate = useNavigate();
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const cleanup = setupGlobalScrollToTop();
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      cleanup();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleAddToCart = (course) => {
    addCourseToCart(course);
  };

  const handleBrowseAllCourses = () => {
    forceScrollToTop();
    navigate('/courses');
  };

  const handleGetFreeTrial = () => {
    forceScrollToTop();
    navigate('/signup');
  };

  const handleLinkClick = () => {
    forceScrollToTop();
  };

  const handleScrollToTop = () => {
    forceScrollToTop();
  };

  const powerBICourses = [
    {
      id: 1,
      title: "Microsoft Power BI - A Complete Introduction",
      instructor: "Manuel Lorenz",
      rating: 4.8,
      students: 680000,
      price: 29.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      description: "Master Power BI from scratch. Learn data modeling, DAX, and create stunning interactive dashboards.",
      duration: "38 hours",
      level: "Beginner",
      lastUpdated: "December 2024"
    },
    {
      id: 2,
      title: "Power BI Masterclass - Data Analysis & Visualization",
      instructor: "Maven Analytics",
      rating: 4.7,
      students: 520000,
      price: 34.99,
      originalPrice: 189.99,
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop",
      description: "Advanced Power BI course covering data analysis, advanced DAX, and professional dashboard design.",
      duration: "42 hours",
      level: "Intermediate",
      lastUpdated: "November 2024"
    },
    {
      id: 3,
      title: "Power BI DAX - Complete Guide to DAX Formulas",
      instructor: "Phil Jarvis",
      rating: 4.9,
      students: 420000,
      price: 24.99,
      originalPrice: 179.99,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
      description: "Master DAX formulas and calculations. Learn advanced data modeling and business intelligence.",
      duration: "32 hours",
      level: "Intermediate",
      lastUpdated: "December 2024"
    },
    {
      id: 4,
      title: "Power BI Service - Complete Guide to Power BI Online",
      instructor: "Manuel Lorenz",
      rating: 4.6,
      students: 280000,
      price: 19.99,
      originalPrice: 149.99,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      description: "Learn Power BI Service, workspace management, and collaboration features for teams.",
      duration: "26 hours",
      level: "Intermediate",
      lastUpdated: "October 2024"
    },
    {
      id: 5,
      title: "Power BI & Excel - Complete Business Intelligence",
      instructor: "Chris Dutton",
      rating: 4.7,
      students: 320000,
      price: 24.99,
      originalPrice: 159.99,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
      description: "Combine Power BI and Excel for comprehensive business intelligence and data analysis.",
      duration: "28 hours",
      level: "Intermediate",
      lastUpdated: "December 2024"
    },
    {
      id: 6,
      title: "Power BI for Beginners - Data Visualization Made Easy",
      instructor: "365 Careers",
      rating: 4.5,
      students: 180000,
      price: 19.99,
      originalPrice: 129.99,
      image: "https://images.unsplash.com/photo-1555066931-4365d9bf0f0c?w=400&h=300&fit=crop",
      description: "Start your Power BI journey with this beginner-friendly course on data visualization.",
      duration: "22 hours",
      level: "Beginner",
      lastUpdated: "November 2024"
    }
  ];

  return (
    <div className="powerbi-courses-page">
      {/* Hero Section */}
      <section className="powerbi-hero">
        <div className="hero-content">
          <h1>Master Microsoft Power BI: Transform Data into Insights</h1>
          <p>Join over 4.8 million learners worldwide who are mastering Power BI and becoming data-driven professionals</p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">4.8M+</span>
              <span className="stat-label">Active Learners</span>
            </div>
            <div className="stat">
              <span className="stat-number">70+</span>
              <span className="stat-label">Expert Instructors</span>
            </div>
            <div className="stat">
              <span className="stat-number">300+</span>
              <span className="stat-label">Course Hours</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop" alt="Microsoft Power BI" />
        </div>
      </section>

      {/* Why Learn Power BI Section */}
      <section className="why-learn">
        <h2>Why Learn Power BI in 2024?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">💼</div>
            <h3>High Demand</h3>
            <p>Power BI professionals are in high demand across industries as companies embrace data-driven decision making.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">💰</div>
            <h3>Excellent Salaries</h3>
            <p>Power BI specialists earn competitive salaries with opportunities for advancement in analytics roles.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🚀</div>
            <h3>Career Growth</h3>
            <p>Move into data analyst, business intelligence, and data science roles with Power BI skills.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🌍</div>
            <h3>Industry Standard</h3>
            <p>Power BI is the leading business intelligence tool used by Fortune 500 companies worldwide.</p>
          </div>
        </div>
      </section>

      {/* Power BI Applications */}
      <section className="powerbi-applications">
        <h2>What Can You Do with Power BI?</h2>
        <div className="applications-grid">
          <div className="app-card">
            <div className="app-icon">📊</div>
            <h3>Data Visualization</h3>
            <p>Create interactive charts, graphs, and dashboards that bring data to life</p>
          </div>
          <div className="app-card">
            <div className="app-icon">🔍</div>
            <h3>Data Analysis</h3>
            <p>Analyze trends, patterns, and insights from complex datasets</p>
          </div>
          <div className="app-card">
            <div className="app-icon">📈</div>
            <h3>Business Intelligence</h3>
            <p>Transform raw data into actionable business insights and reports</p>
          </div>
          <div className="app-card">
            <div className="app-icon">🔄</div>
            <h3>Data Integration</h3>
            <p>Connect and combine data from multiple sources and systems</p>
          </div>
          <div className="app-card">
            <div className="app-icon">📱</div>
            <h3>Mobile Reporting</h3>
            <p>Access dashboards and reports on any device, anywhere</p>
          </div>
          <div className="app-card">
            <div className="app-icon">👥</div>
            <h3>Collaboration</h3>
            <p>Share insights and collaborate with teams across your organization</p>
          </div>
        </div>
      </section>

      {/* Power BI Workflow */}
      <section className="powerbi-workflow">
        <h2>The Power BI Workflow</h2>
        <div className="workflow-grid">
          <div className="workflow-step">
            <div className="step-number">1</div>
            <h3>Data Sources</h3>
            <p>Connect to databases, files, APIs, and cloud services to import data</p>
          </div>
          <div className="workflow-step">
            <div className="step-number">2</div>
            <h3>Data Transformation</h3>
            <p>Clean, reshape, and prepare data using Power Query Editor</p>
          </div>
          <div className="workflow-step">
            <div className="step-number">3</div>
            <h3>Data Modeling</h3>
            <p>Create relationships between tables and build a data model</p>
          </div>
          <div className="workflow-step">
            <div className="step-number">4</div>
            <h3>DAX Calculations</h3>
            <p>Write DAX formulas to create calculated columns and measures</p>
          </div>
          <div className="workflow-step">
            <div className="step-number">5</div>
            <h3>Visualization</h3>
            <p>Create charts, tables, and interactive visualizations</p>
          </div>
          <div className="workflow-step">
            <div className="step-number">6</div>
            <h3>Publishing</h3>
            <p>Publish reports to Power BI Service and share with stakeholders</p>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="learning-paths">
        <h2>Choose Your Power BI Learning Path</h2>
        <div className="paths-grid">
          <div className="path-card">
            <h3>📊 Data Analyst</h3>
            <p>Master data visualization, basic DAX, and dashboard creation</p>
            <span className="duration">8-12 weeks</span>
            <span className="level">Beginner</span>
          </div>
          <div className="path-card">
            <h3>🔧 Power BI Developer</h3>
            <p>Advanced DAX, data modeling, and complex report development</p>
            <span className="duration">12-16 weeks</span>
            <span className="level">Intermediate</span>
          </div>
          <div className="path-card">
            <h3>🏢 Business Intelligence</h3>
            <p>End-to-end BI solutions, governance, and enterprise deployment</p>
            <span className="duration">16-20 weeks</span>
            <span className="level">Advanced</span>
          </div>
          <div className="path-card">
            <h3>☁️ Power BI Service</h3>
            <p>Cloud deployment, workspace management, and collaboration</p>
            <span className="duration">6-10 weeks</span>
            <span className="level">Intermediate</span>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="featured-courses">
        <h2>Top-Rated Power BI Courses</h2>
        <div className="courses-grid">
          {powerBICourses.map((course) => (
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
                <button className="enroll-btn" onClick={() => handleAddToCart(course)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Power BI Features */}
      <section className="powerbi-features">
        <h2>Powerful Features You'll Master</h2>
        <div className="features-grid">
          <div className="feature-category">
            <h3>Data Connectivity</h3>
            <div className="feature-items">
              <span className="feature-item">SQL Databases</span>
              <span className="feature-item">Excel Files</span>
              <span className="feature-item">CSV & Text</span>
              <span className="feature-item">Web APIs</span>
              <span className="feature-item">Cloud Services</span>
              <span className="feature-item">Real-time Data</span>
            </div>
          </div>
          <div className="feature-category">
            <h3>Data Transformation</h3>
            <div className="feature-items">
              <span className="feature-item">Power Query Editor</span>
              <span className="feature-item">Data Cleaning</span>
              <span className="feature-item">Data Shaping</span>
              <span className="feature-item">Custom Functions</span>
              <span className="feature-item">Error Handling</span>
              <span className="feature-item">Data Profiling</span>
            </div>
          </div>
          <div className="feature-category">
            <h3>Data Modeling</h3>
            <div className="feature-items">
              <span className="feature-item">Table Relationships</span>
              <span className="feature-item">Data Types</span>
              <span className="feature-item">Hierarchies</span>
              <span className="feature-item">Calculated Tables</span>
              <span className="feature-item">Row-Level Security</span>
              <span className="feature-item">Optimization</span>
            </div>
          </div>
          <div className="feature-category">
            <h3>DAX Language</h3>
            <div className="feature-items">
              <span className="feature-item">Calculated Columns</span>
              <span className="feature-item">Measures</span>
              <span className="feature-item">Time Intelligence</span>
              <span className="feature-item">Filter Functions</span>
              <span className="feature-item">Aggregation Functions</span>
              <span className="feature-item">Advanced DAX</span>
            </div>
          </div>
          <div className="feature-category">
            <h3>Visualizations</h3>
            <div className="feature-items">
              <span className="feature-item">Charts & Graphs</span>
              <span className="feature-item">Tables & Matrices</span>
              <span className="feature-item">Maps & Geo</span>
              <span className="feature-item">Custom Visuals</span>
              <span className="feature-item">Interactive Elements</span>
              <span className="feature-item">Themes & Styling</span>
            </div>
          </div>
          <div className="feature-category">
            <h3>Power BI Service</h3>
            <div className="feature-items">
              <span className="feature-item">Workspace Management</span>
              <span className="feature-item">Report Publishing</span>
              <span className="feature-item">Sharing & Security</span>
              <span className="feature-item">Scheduled Refresh</span>
              <span className="feature-item">Mobile Apps</span>
              <span className="feature-item">Embedded Analytics</span>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="success-stories">
        <h2>Success Stories from Power BI Learners</h2>
        <div className="stories-grid">
          <div className="story-card">
            <div className="story-avatar">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="Sarah M." />
            </div>
            <div className="story-content">
              <p>"Power BI skills helped me transition from accounting to business intelligence analyst!"</p>
              <h4>Sarah M.</h4>
              <span>BI Analyst</span>
            </div>
          </div>
          <div className="story-card">
            <div className="story-avatar">
              <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" alt="James L." />
            </div>
            <div className="story-content">
              <p>"Built a Power BI dashboard that saved my company $500K annually in operational costs!"</p>
              <h4>James L.</h4>
              <span>Data Analyst</span>
            </div>
          </div>
          <div className="story-card">
            <div className="story-avatar">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="Emily R." />
            </div>
            <div className="story-content">
              <p>"Power BI expertise opened doors to consulting opportunities and higher salaries!"</p>
              <h4>Emily R.</h4>
              <span>BI Consultant</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Transform Data into Insights?</h2>
          <p>Join millions of professionals and master the world's leading business intelligence tool</p>
          <div className="cta-buttons">
            <button className="primary-btn" onClick={handleBrowseAllCourses}>Browse All Power BI Courses</button>
            <button className="secondary-btn" onClick={handleGetFreeTrial}>Get Free Trial</button>
          </div>
        </div>
      </section>

      {/* Footer Navigation */}
      <section className="footer-nav">
        <div className="nav-links">
          <Link to="/" className="nav-link" onClick={handleLinkClick}>← Back to Home</Link>
          <Link to="/courses" className="nav-link" onClick={handleLinkClick}>Browse All Courses</Link>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <button
        className={`scroll-to-top-btn ${showScrollToTop ? 'visible' : ''}`}
        onClick={handleScrollToTop}
        title="Scroll to top"
      >
        ↑
      </button>
    </div>
  );
};

export default PowerBICourses;
