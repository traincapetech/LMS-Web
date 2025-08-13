import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addCourseToCart, forceScrollToTop, setupGlobalScrollToTop } from '../utils/cartUtils';
import '../App.css';

const ProjectManagementCourses = () => {
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

  const projectManagementCourses = [
    {
      id: 1,
      title: "PMP Exam Prep Seminar - Complete Exam Coverage with 35 PDUs",
      instructor: "Joseph Phillips",
      rating: 4.8,
      students: 850000,
      price: 39.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      description: "Complete PMP exam preparation with 35 PDUs. Master project management fundamentals and pass the PMP exam.",
      duration: "35 hours",
      level: "Intermediate",
      lastUpdated: "December 2024"
    },
    {
      id: 2,
      title: "CAPM Exam Prep Seminar - PMI Certified Associate in Project Management",
      instructor: "Joseph Phillips",
      rating: 4.7,
      students: 420000,
      price: 29.99,
      originalPrice: 179.99,
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop",
      description: "Prepare for CAPM certification. Learn project management basics and earn your PMI certification.",
      duration: "28 hours",
      level: "Beginner",
      lastUpdated: "November 2024"
    },
    {
      id: 3,
      title: "Project Management Professional (PMP) - Complete Course",
      instructor: "Andrew Ramdayal",
      rating: 4.9,
      students: 680000,
      price: 44.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
      description: "Comprehensive PMP preparation course with practice exams, study materials, and expert guidance.",
      duration: "42 hours",
      level: "Intermediate",
      lastUpdated: "December 2024"
    },
    {
      id: 4,
      title: "Agile Project Management: Scrum, Kanban, and Scrumban",
      instructor: "Mauricio Rubio",
      rating: 4.6,
      students: 320000,
      price: 24.99,
      originalPrice: 149.99,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      description: "Master Agile methodologies including Scrum, Kanban, and hybrid approaches for modern project management.",
      duration: "32 hours",
      level: "Intermediate",
      lastUpdated: "October 2024"
    },
    {
      id: 5,
      title: "Microsoft Project 2019 and 365: Complete Course",
      instructor: "Simon Sez IT",
      rating: 4.7,
      students: 280000,
      price: 24.99,
      originalPrice: 159.99,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
      description: "Learn Microsoft Project from basics to advanced features. Master project planning and scheduling.",
      duration: "26 hours",
      level: "Beginner",
      lastUpdated: "December 2024"
    },
    {
      id: 6,
      title: "Project Management: Master Project Management - PMP/PMI",
      instructor: "Bestseller Courses",
      rating: 4.5,
      students: 180000,
      price: 19.99,
      originalPrice: 129.99,
      image: "https://images.unsplash.com/photo-1555066931-4365d9bf0f0c?w=400&h=300&fit=crop",
      description: "Complete project management course covering PMP concepts, tools, and techniques for success.",
      duration: "24 hours",
      level: "All Levels",
      lastUpdated: "November 2024"
    }
  ];

  return (
    <div className="projectmanagement-courses-page">
      {/* Hero Section */}
      <section className="projectmanagement-hero">
        <div className="hero-content">
          <h1>Master Project Management: Lead Projects to Success</h1>
          <p>Join over 2.6 million learners worldwide who are mastering project management and advancing their careers</p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">2.6M+</span>
              <span className="stat-label">Active Learners</span>
            </div>
            <div className="stat">
              <span className="stat-number">60+</span>
              <span className="stat-label">Expert Instructors</span>
            </div>
            <div className="stat">
              <span className="stat-number">250+</span>
              <span className="stat-label">Course Hours</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop" alt="Project Management" />
        </div>
      </section>

      {/* Why Learn Project Management Section */}
      <section className="why-learn">
        <h2>Why Learn Project Management in 2024?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">💼</div>
            <h3>High Demand</h3>
            <p>Project managers are needed in every industry - from IT to construction, healthcare to finance.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">💰</div>
            <h3>Excellent Salaries</h3>
            <p>PMP certified professionals earn 25% more than non-certified project managers.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🚀</div>
            <h3>Career Growth</h3>
            <p>Move into leadership roles and advance your career with project management skills.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🌍</div>
            <h3>Global Recognition</h3>
            <p>PMP certification is recognized worldwide and opens doors to international opportunities.</p>
          </div>
        </div>
      </section>

      {/* Project Management Applications */}
      <section className="projectmanagement-applications">
        <h2>What Can You Manage with Project Management Skills?</h2>
        <div className="applications-grid">
          <div className="app-card">
            <div className="app-icon">💻</div>
            <h3>IT Projects</h3>
            <p>Lead software development, system implementations, and digital transformation projects</p>
          </div>
          <div className="app-card">
            <div className="app-icon">🏗️</div>
            <h3>Construction</h3>
            <p>Manage building projects, infrastructure development, and construction timelines</p>
          </div>
          <div className="app-card">
            <div className="app-icon">🏥</div>
            <h3>Healthcare</h3>
            <p>Lead medical facility projects, system implementations, and process improvements</p>
          </div>
          <div className="app-card">
            <div className="app-icon">🎯</div>
            <h3>Marketing Campaigns</h3>
            <p>Manage product launches, advertising campaigns, and brand initiatives</p>
          </div>
          <div className="app-card">
            <div className="app-icon">📱</div>
            <h3>Product Development</h3>
            <p>Lead new product development from concept to market launch</p>
          </div>
          <div className="app-card">
            <div className="app-icon">🌱</div>
            <h3>Change Management</h3>
            <p>Guide organizations through major transitions and process improvements</p>
          </div>
        </div>
      </section>

      {/* Project Management Process */}
      <section className="projectmanagement-process">
        <h2>The Project Management Lifecycle</h2>
        <div className="process-grid">
          <div className="process-step">
            <div className="step-number">1</div>
            <h3>Initiating</h3>
            <p>Define project scope, objectives, and stakeholders. Get project approval and authorization.</p>
          </div>
          <div className="process-step">
            <div className="step-number">2</div>
            <h3>Planning</h3>
            <p>Develop project plan, schedule, budget, and resource allocation strategies.</p>
          </div>
          <div className="process-step">
            <div className="step-number">3</div>
            <h3>Executing</h3>
            <p>Implement project plan, manage team, and execute project activities.</p>
          </div>
          <div className="process-step">
            <div className="step-number">4</div>
            <h3>Monitoring</h3>
            <p>Track progress, manage changes, and ensure project stays on track.</p>
          </div>
          <div className="process-step">
            <div className="step-number">5</div>
            <h3>Controlling</h3>
            <p>Manage risks, quality, and scope changes throughout the project.</p>
          </div>
          <div className="process-step">
            <div className="step-number">6</div>
            <h3>Closing</h3>
            <p>Complete deliverables, obtain acceptance, and document lessons learned.</p>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="learning-paths">
        <h2>Choose Your Project Management Path</h2>
        <div className="paths-grid">
          <div className="path-card">
            <h3>📚 CAPM Certification</h3>
            <p>Start with Certified Associate in Project Management for beginners</p>
            <span className="duration">8-12 weeks</span>
            <span className="level">Beginner</span>
          </div>
          <div className="path-card">
            <h3>🎯 PMP Certification</h3>
            <p>Advanced certification for experienced project managers</p>
            <span className="duration">12-16 weeks</span>
            <span className="level">Intermediate</span>
          </div>
          <div className="path-card">
            <h3>🔄 Agile/Scrum</h3>
            <p>Master modern Agile methodologies and Scrum frameworks</p>
            <span className="duration">6-10 weeks</span>
            <span className="level">Intermediate</span>
          </div>
          <div className="path-card">
            <h3>🛠️ Tools & Software</h3>
            <p>Learn project management tools like Microsoft Project, Jira, and Asana</p>
            <span className="duration">4-8 weeks</span>
            <span className="level">All Levels</span>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="featured-courses">
        <h2>Top-Rated Project Management Courses</h2>
        <div className="courses-grid">
          {projectManagementCourses.map((course) => (
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

      {/* Project Management Knowledge Areas */}
      <section className="knowledge-areas">
        <h2>PMI Knowledge Areas You'll Master</h2>
        <div className="areas-grid">
          <div className="area-category">
            <h3>Integration Management</h3>
            <div className="area-items">
              <span className="area-item">Project Charter</span>
              <span className="area-item">Project Management Plan</span>
              <span className="area-item">Direct & Manage Work</span>
              <span className="area-item">Monitor & Control</span>
              <span className="area-item">Close Project</span>
            </div>
          </div>
          <div className="area-category">
            <h3>Scope Management</h3>
            <div className="area-items">
              <span className="area-item">Collect Requirements</span>
              <span className="area-item">Define Scope</span>
              <span className="area-item">Create WBS</span>
              <span className="area-item">Validate Scope</span>
              <span className="area-item">Control Scope</span>
            </div>
          </div>
          <div className="area-category">
            <h3>Time Management</h3>
            <div className="area-items">
              <span className="area-item">Define Activities</span>
              <span className="area-item">Sequence Activities</span>
              <span className="area-item">Estimate Resources</span>
              <span className="area-item">Develop Schedule</span>
              <span className="area-item">Control Schedule</span>
            </div>
          </div>
          <div className="area-category">
            <h3>Cost Management</h3>
            <div className="area-items">
              <span className="area-item">Plan Cost Management</span>
              <span className="area-item">Estimate Costs</span>
              <span className="area-item">Determine Budget</span>
              <span className="area-item">Control Costs</span>
              <span className="area-item">Earned Value</span>
            </div>
          </div>
          <div className="area-category">
            <h3>Quality Management</h3>
            <div className="area-items">
              <span className="area-item">Plan Quality</span>
              <span className="area-item">Manage Quality</span>
              <span className="area-item">Control Quality</span>
              <span className="area-item">Quality Tools</span>
              <span className="area-item">Quality Metrics</span>
            </div>
          </div>
          <div className="area-category">
            <h3>Risk Management</h3>
            <div className="area-items">
              <span className="area-item">Plan Risk Management</span>
              <span className="area-item">Identify Risks</span>
              <span className="area-item">Perform Analysis</span>
              <span className="area-item">Plan Responses</span>
              <span className="area-item">Monitor Risks</span>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="success-stories">
        <h2>Success Stories from Project Management Learners</h2>
        <div className="stories-grid">
          <div className="story-card">
            <div className="story-avatar">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="Michael R." />
            </div>
            <div className="story-content">
              <p>"PMP certification helped me land a senior project manager role with 40% salary increase!"</p>
              <h4>Michael R.</h4>
              <span>Senior Project Manager</span>
            </div>
          </div>
          <div className="story-card">
            <div className="story-avatar">
              <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" alt="Jennifer L." />
            </div>
            <div className="story-content">
              <p>"Project management skills enabled me to successfully launch my own consulting business!"</p>
              <h4>Jennifer L.</h4>
              <span>Management Consultant</span>
            </div>
          </div>
          <div className="story-card">
            <div className="story-avatar">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="David K." />
            </div>
            <div className="story-content">
              <p>"From team lead to program director. Project management opened incredible career opportunities!"</p>
              <h4>David K.</h4>
              <span>Program Director</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Lead Projects to Success?</h2>
          <p>Join millions of project managers and advance your career with professional certification</p>
          <div className="cta-buttons">
            <button className="primary-btn" onClick={handleBrowseAllCourses}>Browse All PM Courses</button>
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

export default ProjectManagementCourses;
