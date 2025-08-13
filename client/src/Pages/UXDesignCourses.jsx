import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addCourseToCart, forceScrollToTop, setupGlobalScrollToTop } from '../utils/cartUtils';
import '../App.css';

const UXDesignCourses = () => {
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

  const uxDesignCourses = [
    {
      id: 1,
      title: "User Experience (UX): The Ultimate Guide to Usability",
      instructor: "David Travis",
      rating: 4.8,
      students: 680000,
      price: 29.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      description: "Master UX design principles, user research, and usability testing. Create user-centered digital experiences.",
      duration: "38 hours",
      level: "Beginner",
      lastUpdated: "December 2024"
    },
    {
      id: 2,
      title: "UX & UI Design Master Course: Strategy, Design, Development",
      instructor: "Joe Natoli",
      rating: 4.7,
      students: 520000,
      price: 34.99,
      originalPrice: 189.99,
      image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop",
      description: "Complete UX/UI design course covering strategy, research, design, and development implementation.",
      duration: "45 hours",
      level: "All Levels",
      lastUpdated: "November 2024"
    },
    {
      id: 3,
      title: "Figma UI UX Design Essentials",
      instructor: "Daniel Walter Scott",
      rating: 4.8,
      students: 420000,
      price: 24.99,
      originalPrice: 179.99,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
      description: "Master Figma for UI/UX design. Create prototypes, wireframes, and interactive designs.",
      duration: "32 hours",
      level: "Beginner",
      lastUpdated: "December 2024"
    },
    {
      id: 4,
      title: "UX Research: User Interviews, Surveys & Usability Testing",
      instructor: "David Travis",
      rating: 4.6,
      students: 280000,
      price: 19.99,
      originalPrice: 149.99,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      description: "Learn user research methods, conduct interviews, surveys, and usability testing sessions.",
      duration: "26 hours",
      level: "Intermediate",
      lastUpdated: "October 2024"
    },
    {
      id: 5,
      title: "Mobile App Design in Figma: UI/UX Design App",
      instructor: "Daniel Walter Scott",
      rating: 4.7,
      students: 320000,
      price: 24.99,
      originalPrice: 159.99,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
      description: "Design mobile apps from concept to prototype. Master mobile UI/UX design principles.",
      duration: "28 hours",
      level: "Intermediate",
      lastUpdated: "December 2024"
    },
    {
      id: 6,
      title: "UX Writing: How to Write for a Better User Experience",
      instructor: "Katie Sherwin",
      rating: 4.5,
      students: 180000,
      price: 19.99,
      originalPrice: 129.99,
      image: "https://images.unsplash.com/photo-1555066931-4365d9bf0f0c?w=400&h=300&fit=crop",
      description: "Master UX writing and microcopy. Create clear, helpful text that improves user experience.",
      duration: "20 hours",
      level: "Intermediate",
      lastUpdated: "November 2024"
    }
  ];

  return (
    <div className="uxdesign-courses-page">
      {/* Hero Section */}
      <section className="uxdesign-hero">
        <div className="hero-content">
          <h1>Master UX Design: Create Amazing User Experiences</h1>
          <p>Join over 2.1 million learners worldwide who are mastering UX design and transforming digital products</p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">2.1M+</span>
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
          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop" alt="UX Design" />
        </div>
      </section>

      {/* Why Learn UX Design Section */}
      <section className="why-learn">
        <h2>Why Learn UX Design in 2024?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">💼</div>
            <h3>High Demand</h3>
            <p>UX designers are in high demand across tech companies, startups, and digital agencies worldwide.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">💰</div>
            <h3>Excellent Salaries</h3>
            <p>UX designers earn competitive salaries with senior positions reaching $150K+ in major tech hubs.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🚀</div>
            <h3>Impact & Innovation</h3>
            <p>Shape the future of digital products and create experiences that millions of people use daily.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🌍</div>
            <h3>Remote Opportunities</h3>
            <p>Enjoy flexible work arrangements and remote opportunities in the growing digital economy.</p>
          </div>
        </div>
      </section>

      {/* UX Design Applications */}
      <section className="uxdesign-applications">
        <h2>What Can You Design with UX Skills?</h2>
        <div className="applications-grid">
          <div className="app-card">
            <div className="app-icon">📱</div>
            <h3>Mobile Apps</h3>
            <p>Design intuitive mobile experiences for iOS and Android applications</p>
          </div>
          <div className="app-card">
            <div className="app-icon">🌐</div>
            <h3>Websites</h3>
            <p>Create user-friendly websites with excellent navigation and user flow</p>
          </div>
          <div className="app-card">
            <div className="app-icon">💻</div>
            <h3>Software Interfaces</h3>
            <p>Design desktop applications and enterprise software interfaces</p>
          </div>
          <div className="app-card">
            <div className="app-icon">🎮</div>
            <h3>Gaming</h3>
            <p>Create engaging user experiences for video games and interactive media</p>
          </div>
          <div className="app-card">
            <div className="app-icon">🏥</div>
            <h3>Healthcare Apps</h3>
            <p>Design accessible and user-friendly healthcare and wellness applications</p>
          </div>
          <div className="app-card">
            <div className="app-icon">🛒</div>
            <h3>E-commerce</h3>
            <p>Optimize online shopping experiences and conversion rates</p>
          </div>
        </div>
      </section>

      {/* UX Design Process */}
      <section className="uxdesign-process">
        <h2>The UX Design Process</h2>
        <div className="process-grid">
          <div className="process-step">
            <div className="step-number">1</div>
            <h3>Research</h3>
            <p>Understand users through interviews, surveys, and market research</p>
          </div>
          <div className="process-step">
            <div className="step-number">2</div>
            <h3>Analysis</h3>
            <p>Analyze research data and create user personas and journey maps</p>
          </div>
          <div className="process-step">
            <div className="step-number">3</div>
            <h3>Design</h3>
            <p>Create wireframes, prototypes, and visual designs</p>
          </div>
          <div className="process-step">
            <div className="step-number">4</div>
            <h3>Testing</h3>
            <p>Validate designs through usability testing and user feedback</p>
          </div>
          <div className="process-step">
            <div className="step-number">5</div>
            <h3>Implementation</h3>
            <p>Work with developers to bring designs to life</p>
          </div>
          <div className="process-step">
            <div className="step-number">6</div>
            <h3>Iteration</h3>
            <p>Continuously improve based on user feedback and analytics</p>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="learning-paths">
        <h2>Choose Your UX Design Path</h2>
        <div className="paths-grid">
          <div className="path-card">
            <h3>🎨 UX Designer</h3>
            <p>Master user research, wireframing, and usability testing fundamentals</p>
            <span className="duration">12-16 weeks</span>
            <span className="level">Beginner</span>
          </div>
          <div className="path-card">
            <h3>📱 UI Designer</h3>
            <p>Focus on visual design, typography, and creating beautiful interfaces</p>
            <span className="duration">10-14 weeks</span>
            <span className="level">Intermediate</span>
          </div>
          <div className="path-card">
            <h3>🔍 UX Researcher</h3>
            <p>Specialize in user research, data analysis, and usability testing</p>
            <span className="duration">14-18 weeks</span>
            <span className="level">Intermediate</span>
          </div>
          <div className="path-card">
            <h3>🚀 Product Designer</h3>
            <p>Master end-to-end design process from research to implementation</p>
            <span className="duration">16-20 weeks</span>
            <span className="level">Advanced</span>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="featured-courses">
        <h2>Top-Rated UX Design Courses</h2>
        <div className="courses-grid">
          {uxDesignCourses.map((course) => (
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

      {/* UX Design Skills */}
      <section className="uxdesign-skills">
        <h2>Essential UX Design Skills You'll Master</h2>
        <div className="skills-grid">
          <div className="skill-category">
            <h3>Research & Analysis</h3>
            <div className="skill-items">
              <span className="skill-item">User Interviews</span>
              <span className="skill-item">Surveys & Questionnaires</span>
              <span className="skill-item">Usability Testing</span>
              <span className="skill-item">User Personas</span>
              <span className="skill-item">Journey Mapping</span>
              <span className="skill-item">Competitive Analysis</span>
            </div>
          </div>
          <div className="skill-category">
            <h3>Design & Prototyping</h3>
            <div className="skill-items">
              <span className="skill-item">Wireframing</span>
              <span className="skill-item">Prototyping</span>
              <span className="skill-item">Information Architecture</span>
              <span className="skill-item">Interaction Design</span>
              <span className="skill-item">Visual Design</span>
              <span className="skill-item">Responsive Design</span>
            </div>
          </div>
          <div className="skill-category">
            <h3>Tools & Software</h3>
            <div className="skill-items">
              <span className="skill-item">Figma</span>
              <span className="skill-item">Sketch</span>
              <span className="skill-item">Adobe XD</span>
              <span className="skill-item">InVision</span>
              <span className="skill-item">Axure RP</span>
              <span className="skill-item">Balsamiq</span>
            </div>
          </div>
          <div className="skill-category">
            <h3>Soft Skills</h3>
            <div className="skill-items">
              <span className="skill-item">Communication</span>
              <span className="skill-item">Collaboration</span>
              <span className="skill-item">Problem Solving</span>
              <span className="skill-item">Empathy</span>
              <span className="skill-item">Presentation</span>
              <span className="skill-item">Stakeholder Management</span>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="success-stories">
        <h2>Success Stories from UX Design Learners</h2>
        <div className="stories-grid">
          <div className="story-card">
            <div className="story-avatar">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="Rachel L." />
            </div>
            <div className="story-content">
              <p>"Transitioned from marketing to UX design. Now working at a top tech company!"</p>
              <h4>Rachel L.</h4>
              <span>Senior UX Designer</span>
            </div>
          </div>
          <div className="story-card">
            <div className="story-avatar">
              <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" alt="Mark T." />
            </div>
            <div className="story-content">
              <p>"UX skills helped me launch my own successful mobile app startup!"</p>
              <h4>Mark T.</h4>
              <span>Startup Founder</span>
            </div>
          </div>
          <div className="story-card">
            <div className="story-avatar">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="Lisa K." />
            </div>
            <div className="story-content">
              <p>"From graphic design to UX research. The possibilities are endless!"</p>
              <h4>Lisa K.</h4>
              <span>UX Researcher</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Design Amazing User Experiences?</h2>
          <p>Join millions of designers and create products that users love</p>
          <div className="cta-buttons">
            <button className="primary-btn" onClick={handleBrowseAllCourses}>Browse All UX Design Courses</button>
            <button className="secondary-btn" onClick={handleGetFreeTrial}>Get Free Trial</button>
          </div>
        </div>
      </section>

      {/* Footer Navigation */}
      <section className="footer-nav">
        <div className="nav-links">
          <Link to="/" className="nav-link" onClick={handleLinkClick}>← Back to Home</Link>
          <Link to="/courses" className="nav-link" onClick={handleScrollToTop}>Browse All Courses</Link>
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

export default UXDesignCourses;
