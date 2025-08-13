import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addCourseToCart, forceScrollToTop } from '../utils/cartUtils';
import '../App.css';

const WebDevelopmentCourses = () => {
  const navigate = useNavigate();

  const webDevCourses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp 2024",
      instructor: "Dr. Angela Yu",
      rating: 4.9,
      students: 1800000,
      price: 39.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
      description: "Learn HTML, CSS, JavaScript, React, Node.js, and MongoDB. Build real-world projects and become a full-stack developer.",
      duration: "55 hours",
      level: "All Levels",
      lastUpdated: "December 2024"
    },
    {
      id: 2,
      title: "React - The Complete Guide (incl Hooks, React Router, Redux)",
      instructor: "Max Schwarzmüller",
      rating: 4.8,
      students: 1200000,
      price: 34.99,
      originalPrice: 189.99,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
      description: "Master React with hooks, context, Redux, and advanced patterns. Build modern, scalable web applications.",
      duration: "48 hours",
      level: "Intermediate",
      lastUpdated: "December 2024"
    },
    {
      id: 3,
      title: "JavaScript: The Complete Developer's Guide",
      instructor: "Stephen Grider",
      rating: 4.7,
      students: 850000,
      price: 29.99,
      originalPrice: 179.99,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
      description: "Master JavaScript fundamentals, ES6+, async programming, and modern development practices.",
      duration: "42 hours",
      level: "All Levels",
      lastUpdated: "November 2024"
    },
    {
      id: 4,
      title: "Node.js: The Complete Guide (MVC, REST APIs, GraphQL)",
      instructor: "Max Schwarzmüller",
      rating: 4.8,
      students: 650000,
      price: 44.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop",
      description: "Build scalable backend applications with Node.js, Express, MongoDB, and modern APIs.",
      duration: "38 hours",
      level: "Intermediate",
      lastUpdated: "December 2024"
    },
    {
      id: 5,
      title: "CSS - The Complete Guide 2024 (incl. Flexbox, Grid & Sass)",
      instructor: "Jonas Schmedtmann",
      rating: 4.9,
      students: 720000,
      price: 24.99,
      originalPrice: 149.99,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      description: "Master CSS3, Flexbox, Grid, animations, and responsive design. Create stunning, modern websites.",
      duration: "28 hours",
      level: "All Levels",
      lastUpdated: "December 2024"
    },
    {
      id: 6,
      title: "Vue.js - The Complete Guide (w/ Router, Vuex, Composition API)",
      instructor: "Max Schwarzmüller",
      rating: 4.7,
      students: 380000,
      price: 39.99,
      originalPrice: 189.99,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
      description: "Learn Vue.js 3 with Composition API, Vuex, Vue Router, and build modern single-page applications.",
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

  return (
    <div className="web-development-courses-page">
      {/* Hero Section */}
      <section className="web-dev-hero">
        <div className="hero-content">
          <h1>Master Web Development: Build the Future of the Internet</h1>
          <p>Join over 3.2 million developers worldwide who are creating amazing web experiences and applications</p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">3.2M+</span>
              <span className="stat-label">Active Developers</span>
            </div>
            <div className="stat">
              <span className="stat-number">150+</span>
              <span className="stat-label">Expert Instructors</span>
            </div>
            <div className="stat">
              <span className="stat-number">800+</span>
              <span className="stat-label">Course Hours</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop" alt="Web Development" />
        </div>
      </section>

      {/* Why Learn Web Development Section */}
      <section className="why-learn">
        <h2>Why Learn Web Development in 2024?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">💼</div>
            <h3>High Demand</h3>
            <p>Web developers are in high demand globally with excellent salaries and job security.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🌍</div>
            <h3>Global Opportunities</h3>
            <p>Work remotely, freelance, or join companies worldwide. The internet has no borders.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🚀</div>
            <h3>Creative Freedom</h3>
            <p>Build anything you can imagine - from simple websites to complex web applications.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">📈</div>
            <h3>Career Growth</h3>
            <p>Start as a frontend developer and grow into full-stack, DevOps, or specialized roles.</p>
          </div>
        </div>
      </section>

      {/* Web Development Stack */}
      <section className="web-dev-stack">
        <h2>Modern Web Development Stack</h2>
        <div className="stack-grid">
          <div className="stack-card">
            <div className="stack-icon">🎨</div>
            <h3>Frontend</h3>
            <p>HTML5, CSS3, JavaScript, React, Vue.js, Angular, and modern build tools</p>
          </div>
          <div className="stack-card">
            <div className="stack-icon">⚙️</div>
            <h3>Backend</h3>
            <p>Node.js, Python, PHP, Java, databases, APIs, and server architecture</p>
          </div>
          <div className="stack-card">
            <div className="stack-icon">📱</div>
            <h3>Responsive Design</h3>
            <p>Mobile-first design, progressive web apps, and cross-platform compatibility</p>
          </div>
          <div className="stack-card">
            <div className="stack-icon">🔧</div>
            <h3>DevOps & Tools</h3>
            <p>Git, Docker, CI/CD, cloud platforms, and deployment strategies</p>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="learning-paths">
        <h2>Web Development Learning Paths</h2>
        <div className="paths-grid">
          <div className="path-card">
            <h3>🎨 Frontend Developer</h3>
            <p>Master HTML, CSS, JavaScript, and modern frameworks like React and Vue.js</p>
            <span className="path-duration">4-6 months</span>
          </div>
          <div className="path-card">
            <h3>⚙️ Backend Developer</h3>
            <p>Learn server-side programming, databases, APIs, and backend frameworks</p>
            <span className="path-duration">5-7 months</span>
          </div>
          <div className="path-card">
            <h3>🚀 Full-Stack Developer</h3>
            <p>Combine frontend and backend skills to build complete web applications</p>
            <span className="path-duration">8-12 months</span>
          </div>
          <div className="path-card">
            <h3>📱 Mobile Web Developer</h3>
            <p>Specialize in responsive design, PWA development, and mobile optimization</p>
            <span className="path-duration">3-5 months</span>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="featured-courses">
        <h2>Top-Rated Web Development Courses</h2>
        <div className="courses-grid">
          {webDevCourses.map((course) => (
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
        <h2>Success Stories from Our Web Developers</h2>
        <div className="stories-grid">
          <div className="story-card">
            <div className="story-avatar">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="Alex K." />
            </div>
            <div className="story-content">
              <p>"Started with HTML/CSS, now I'm a senior frontend developer at a top tech company!"</p>
              <h4>Alex K.</h4>
              <span>Senior Frontend Developer</span>
            </div>
          </div>
          <div className="story-card">
            <div className="story-avatar">
              <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" alt="Maria S." />
            </div>
            <div className="story-content">
              <p>"I built a successful e-commerce platform and now run my own web development agency."</p>
              <h4>Maria S.</h4>
              <span>Agency Owner</span>
            </div>
          </div>
          <div className="story-card">
            <div className="story-avatar">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="David L." />
            </div>
            <div className="story-content">
              <p>"From zero coding to full-stack developer in 8 months. The courses here are amazing!"</p>
              <h4>David L.</h4>
              <span>Full-Stack Developer</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Build Amazing Websites?</h2>
          <p>Join millions of developers and start your web development journey today</p>
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
    </div>
  );
};

export default WebDevelopmentCourses;
