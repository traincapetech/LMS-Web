import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addCourseToCart, forceScrollToTop } from '../utils/cartUtils';
import '../App.css';

const ChatGPTCourses = () => {
  const navigate = useNavigate();

  const chatgptCourses = [
    {
      id: 1,
      title: "ChatGPT Complete Course: From Beginner to Expert",
      instructor: "Dr. Sarah Johnson",
      rating: 4.8,
      students: 125000,
      price: 89.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
      description: "Master ChatGPT from basics to advanced techniques. Learn prompt engineering, API integration, and real-world applications.",
      duration: "12 hours",
      level: "All Levels",
      lastUpdated: "December 2024"
    },
    {
      id: 2,
      title: "ChatGPT for Business: Boost Productivity & Innovation",
      instructor: "Mike Chen",
      rating: 4.7,
      students: 89000,
      price: 74.99,
      originalPrice: 149.99,
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
      description: "Transform your business operations with ChatGPT. Learn automation, customer service, and content creation strategies.",
      duration: "8 hours",
      level: "Intermediate",
      lastUpdated: "November 2024"
    },
    {
      id: 3,
      title: "ChatGPT for Developers: API Integration & Automation",
      instructor: "Alex Rodriguez",
      rating: 4.9,
      students: 67000,
      price: 94.99,
      originalPrice: 179.99,
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop",
      description: "Integrate ChatGPT into your applications. Build chatbots, automate workflows, and create AI-powered features.",
      duration: "10 hours",
      level: "Advanced",
      lastUpdated: "December 2024"
    },
    {
      id: 4,
      title: "ChatGPT for Content Creators: Writing & Marketing",
      instructor: "Emma Wilson",
      rating: 4.6,
      students: 45000,
      price: 64.99,
      originalPrice: 129.99,
      image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&h=300&fit=crop",
      description: "Create engaging content, marketing copy, and social media posts with ChatGPT. Boost your creative workflow.",
      duration: "6 hours",
      level: "Beginner",
      lastUpdated: "October 2024"
    },
    {
      id: 5,
      title: "ChatGPT Prompt Engineering Masterclass",
      instructor: "David Kim",
      rating: 4.9,
      students: 112000,
      price: 79.99,
      originalPrice: 159.99,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
      description: "Master the art of prompt engineering. Learn to get the best results from ChatGPT and other AI models.",
      duration: "9 hours",
      level: "Intermediate",
      lastUpdated: "December 2024"
    },
    {
      id: 6,
      title: "ChatGPT for Education: Teaching & Learning",
      instructor: "Prof. Lisa Thompson",
      rating: 4.7,
      students: 38000,
      price: 69.99,
      originalPrice: 139.99,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
      description: "Transform your teaching methods with ChatGPT. Create lesson plans, assessments, and personalized learning experiences.",
      duration: "7 hours",
      level: "All Levels",
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
    <div className="chatgpt-courses-page">
      {/* Hero Section */}
      <section className="chatgpt-hero">
        <div className="hero-content">
          <h1>Master ChatGPT: The Future of AI is Here</h1>
          <p>Join over 4.7 million learners worldwide who are mastering ChatGPT and transforming their careers</p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">4.7M+</span>
              <span className="stat-label">Active Learners</span>
            </div>
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Expert Instructors</span>
            </div>
            <div className="stat">
              <span className="stat-number">200+</span>
              <span className="stat-label">Course Hours</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop" alt="ChatGPT AI" />
        </div>
      </section>

      {/* Why Learn ChatGPT Section */}
      <section className="why-learn">
        <h2>Why Learn ChatGPT in 2024?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">🚀</div>
            <h3>Career Growth</h3>
            <p>ChatGPT skills are in high demand across industries. Boost your resume and unlock new opportunities.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">⚡</div>
            <h3>Productivity Boost</h3>
            <p>Automate repetitive tasks, generate content faster, and focus on high-value work.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">💡</div>
            <h3>Innovation</h3>
            <p>Stay ahead of the curve and leverage AI to create innovative solutions and products.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🌍</div>
            <h3>Global Impact</h3>
            <p>Join the AI revolution and shape the future of technology and human-AI collaboration.</p>
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="course-categories">
        <h2>Explore ChatGPT Learning Paths</h2>
        <div className="category-grid">
          <div className="category-card">
            <h3>🚀 Beginner Friendly</h3>
            <p>Start your ChatGPT journey with foundational concepts and practical applications</p>
            <span className="course-count">15 courses</span>
          </div>
          <div className="category-card">
            <h3>💼 Business Applications</h3>
            <p>Learn to integrate ChatGPT into your business processes and workflows</p>
            <span className="course-count">12 courses</span>
          </div>
          <div className="category-card">
            <h3>👨‍💻 Technical Deep Dive</h3>
            <p>Master API integration, automation, and advanced ChatGPT techniques</p>
            <span className="course-count">8 courses</span>
          </div>
          <div className="category-card">
            <h3>✍️ Content Creation</h3>
            <p>Harness ChatGPT for writing, marketing, and creative content generation</p>
            <span className="course-count">10 courses</span>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="featured-courses">
        <h2>Top-Rated ChatGPT Courses</h2>
        <div className="courses-grid">
          {chatgptCourses.map((course) => (
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
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="John D." />
            </div>
            <div className="story-content">
              <p>"ChatGPT helped me automate 80% of my daily tasks. I got promoted within 3 months!"</p>
              <h4>John D.</h4>
              <span>Marketing Manager</span>
            </div>
          </div>
          <div className="story-card">
            <div className="story-avatar">
              <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" alt="Sarah M." />
            </div>
            <div className="story-content">
              <p>"I built a successful freelance business using ChatGPT for content creation. Life-changing!"</p>
              <h4>Sarah M.</h4>
              <span>Content Creator</span>
            </div>
          </div>
          <div className="story-card">
            <div className="story-avatar">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="Mike R." />
            </div>
            <div className="story-content">
              <p>"As a developer, ChatGPT integration skills opened doors to exciting AI projects."</p>
              <h4>Mike R.</h4>
              <span>Software Engineer</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Master ChatGPT?</h2>
          <p>Join millions of learners and start your AI journey today</p>
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

export default ChatGPTCourses;
