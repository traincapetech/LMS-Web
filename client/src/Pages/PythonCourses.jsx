import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addCourseToCart, forceScrollToTop, setupGlobalScrollToTop } from '../utils/cartUtils';
import '../App.css';

const PythonCourses = () => {
  const navigate = useNavigate();
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Setup global scroll to top effect
  useEffect(() => {
    const cleanup = setupGlobalScrollToTop();
    
    // Add scroll listener for scroll to top button
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

  const pythonCourses = [
    {
      id: 1,
      title: "Python for Beginners: Complete Programming Course",
      instructor: "Dr. Angela Yu",
      rating: 4.9,
      students: 2500000,
      price: 29.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop",
      description: "Learn Python programming from scratch. Master fundamentals, data structures, and build real-world projects.",
      duration: "22 hours",
      level: "Beginner",
      lastUpdated: "December 2024"
    },
    {
      id: 2,
      title: "Python for Data Science & Machine Learning",
      instructor: "Jose Portilla",
      rating: 4.8,
      students: 1800000,
      price: 39.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      description: "Master Python for data analysis, visualization, and machine learning with pandas, numpy, and scikit-learn.",
      duration: "44 hours",
      level: "Intermediate",
      lastUpdated: "December 2024"
    },
    {
      id: 3,
      title: "Python Web Development: Django & Flask",
      instructor: "Max Schwarzmüller",
      rating: 4.7,
      students: 950000,
      price: 34.99,
      originalPrice: 189.99,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
      description: "Build modern web applications with Python. Learn Django, Flask, and full-stack development.",
      duration: "35 hours",
      level: "Intermediate",
      lastUpdated: "November 2024"
    },
    {
      id: 4,
      title: "Python Automation: Scripts & Tools",
      instructor: "Al Sweigart",
      rating: 4.6,
      students: 450000,
      price: 24.99,
      originalPrice: 149.99,
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop",
      description: "Automate boring tasks with Python. Create scripts for file management, web scraping, and more.",
      duration: "18 hours",
      level: "Beginner",
      lastUpdated: "October 2024"
    },
    {
      id: 5,
      title: "Advanced Python: Design Patterns & Best Practices",
      instructor: "Robert Smallshire",
      rating: 4.8,
      students: 320000,
      price: 44.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
      description: "Master advanced Python concepts, design patterns, and professional coding practices.",
      duration: "28 hours",
      level: "Advanced",
      lastUpdated: "December 2024"
    },
    {
      id: 6,
      title: "Python for Finance: Trading & Analysis",
      instructor: "Dr. Yves Hilpisch",
      rating: 4.7,
      students: 280000,
      price: 49.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      description: "Learn Python for financial analysis, algorithmic trading, and quantitative finance.",
      duration: "32 hours",
      level: "Intermediate",
      lastUpdated: "November 2024"
    }
  ];

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

  return (
    <div className="python-courses-page">
      {/* Hero Section */}
      <section className="python-hero">
        <div className="hero-content">
          <h1>Master Python: The World's Most Popular Programming Language</h1>
          <p>Join over 48 million learners worldwide who are mastering Python and building amazing applications</p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">48.7M+</span>
              <span className="stat-label">Active Learners</span>
            </div>
            <div className="stat">
              <span className="stat-number">100+</span>
              <span className="stat-label">Expert Instructors</span>
            </div>
            <div className="stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">Course Hours</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&h=400&fit=crop" alt="Python Programming" />
        </div>
      </section>

      {/* Why Learn Python Section */}
      <section className="why-learn">
        <h2>Why Learn Python in 2024?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">🚀</div>
            <h3>Versatile & Powerful</h3>
            <p>Python is used in web development, data science, AI, automation, and more. One language, endless possibilities.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">📈</div>
            <h3>High Demand</h3>
            <p>Python developers are among the highest-paid professionals with excellent job prospects worldwide.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🎯</div>
            <h3>Beginner Friendly</h3>
            <p>Clean, readable syntax makes Python perfect for beginners while being powerful for experts.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🌍</div>
            <h3>Huge Community</h3>
            <p>Access to millions of libraries, frameworks, and a supportive community of developers.</p>
          </div>
        </div>
      </section>

      {/* Python Applications */}
      <section className="python-applications">
        <h2>What Can You Build with Python?</h2>
        <div className="applications-grid">
          <div className="app-card">
            <div className="app-icon">🌐</div>
            <h3>Web Applications</h3>
            <p>Build websites, APIs, and web services with Django, Flask, and FastAPI</p>
          </div>
          <div className="app-card">
            <div className="app-icon">📊</div>
            <h3>Data Science</h3>
            <p>Analyze data, create visualizations, and build machine learning models</p>
          </div>
          <div className="app-card">
            <div className="app-icon">🤖</div>
            <h3>Artificial Intelligence</h3>
            <p>Develop AI applications, chatbots, and intelligent systems</p>
          </div>
          <div className="app-card">
            <div className="app-icon">📱</div>
            <h3>Desktop Apps</h3>
            <p>Create cross-platform applications with PyQt, Tkinter, and Kivy</p>
          </div>
          <div className="app-card">
            <div className="app-icon">🔧</div>
            <h3>Automation</h3>
            <p>Automate repetitive tasks, file processing, and system administration</p>
          </div>
          <div className="app-card">
            <div className="app-icon">🎮</div>
            <h3>Games</h3>
            <p>Develop 2D and 3D games with Pygame and Panda3D</p>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="learning-paths">
        <h2>Python Learning Paths</h2>
        <div className="paths-grid">
          <div className="path-card">
            <h3>🚀 Beginner Path</h3>
            <p>Start with Python basics, syntax, and fundamental programming concepts</p>
            <span className="path-duration">2-3 months</span>
          </div>
          <div className="path-card">
            <h3>📊 Data Science Path</h3>
            <p>Learn pandas, numpy, matplotlib, and machine learning with Python</p>
            <span className="path-duration">4-6 months</span>
          </div>
          <div className="path-card">
            <h3>🌐 Web Development Path</h3>
            <p>Master Django, Flask, and build full-stack web applications</p>
            <span className="path-duration">3-5 months</span>
          </div>
          <div className="path-card">
            <h3>🤖 AI & ML Path</h3>
            <p>Dive into artificial intelligence, deep learning, and neural networks</p>
            <span className="path-duration">6-8 months</span>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="featured-courses">
        <h2>Top-Rated Python Courses</h2>
        <div className="courses-grid">
          {pythonCourses.map((course) => (
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
        <h2>Success Stories from Our Python Learners</h2>
        <div className="stories-grid">
          <div className="story-card">
            <div className="story-avatar">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="John D." />
            </div>
            <div className="story-content">
              <p>"Python helped me land my dream job as a data scientist. The courses here are exceptional!"</p>
              <h4>John D.</h4>
              <span>Data Scientist</span>
            </div>
          </div>
          <div className="story-card">
            <div className="story-avatar">
              <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" alt="Sarah M." />
            </div>
            <div className="story-content">
              <p>"I built a successful startup using Python. The web development courses were game-changing!"</p>
              <h4>Sarah M.</h4>
              <span>Startup Founder</span>
            </div>
          </div>
          <div className="story-card">
            <div className="story-avatar">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="Mike R." />
            </div>
            <div className="story-content">
              <p>"From beginner to Python expert in 6 months. The learning path was perfectly structured."</p>
              <h4>Mike R.</h4>
              <span>Software Engineer</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Master Python?</h2>
          <p>Join millions of learners and start your programming journey today</p>
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

export default PythonCourses;
