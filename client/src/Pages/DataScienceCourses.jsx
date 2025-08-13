import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addCourseToCart, forceScrollToTop, setupGlobalScrollToTop } from '../utils/cartUtils';
import '../App.css';

const DataScienceCourses = () => {
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

  const dataScienceCourses = [
    {
      id: 1,
      title: "Data Science and Machine Learning Bootcamp with R",
      instructor: "Jose Portilla",
      rating: 4.8,
      students: 1200000,
      price: 39.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      description: "Learn data science fundamentals, statistics, and machine learning with R. Build real-world data projects.",
      duration: "44 hours",
      level: "Beginner",
      lastUpdated: "December 2024"
    },
    {
      id: 2,
      title: "Python for Data Science and Machine Learning Bootcamp",
      instructor: "Jose Portilla",
      rating: 4.9,
      students: 1800000,
      price: 44.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop",
      description: "Master Python for data analysis, visualization, and machine learning with pandas, numpy, and scikit-learn.",
      duration: "44 hours",
      level: "Intermediate",
      lastUpdated: "December 2024"
    },
    {
      id: 3,
      title: "Machine Learning A-Z: Hands-On Python & R In Data Science",
      instructor: "Kirill Eremenko",
      rating: 4.7,
      students: 950000,
      price: 49.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
      description: "Learn machine learning algorithms and techniques. Build predictive models and solve real business problems.",
      duration: "44 hours",
      level: "Intermediate",
      lastUpdated: "November 2024"
    },
    {
      id: 4,
      title: "Statistics for Data Science and Business Analysis",
      instructor: "365 Careers",
      rating: 4.6,
      students: 680000,
      price: 29.99,
      originalPrice: 179.99,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      description: "Master statistics fundamentals essential for data science. Learn hypothesis testing, regression, and more.",
      duration: "32 hours",
      level: "Beginner",
      lastUpdated: "October 2024"
    },
    {
      id: 5,
      title: "Deep Learning A-Z: Hands-On Artificial Neural Networks",
      instructor: "Kirill Eremenko",
      rating: 4.8,
      students: 520000,
      price: 54.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
      description: "Master deep learning with neural networks, CNNs, RNNs, and more. Build AI applications from scratch.",
      duration: "44 hours",
      level: "Advanced",
      lastUpdated: "December 2024"
    },
    {
      id: 6,
      title: "SQL for Data Science: Essential Skills",
      instructor: "Jose Portilla",
      rating: 4.7,
      students: 380000,
      price: 24.99,
      originalPrice: 149.99,
      image: "https://images.unsplash.com/photo-1555066931-4365d9bf0f0c?w=400&h=300&fit=crop",
      description: "Learn SQL for data extraction, manipulation, and analysis. Master database queries for data science.",
      duration: "28 hours",
      level: "Beginner",
      lastUpdated: "November 2024"
    }
  ];

  return (
    <div className="datascience-courses-page">
      {/* Hero Section */}
      <section className="datascience-hero">
        <div className="hero-content">
          <h1>Master Data Science: Unlock the Power of Data</h1>
          <p>Join over 7.9 million learners worldwide who are mastering data science and transforming industries</p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">7.9M+</span>
              <span className="stat-label">Active Learners</span>
            </div>
            <div className="stat">
              <span className="stat-number">60+</span>
              <span className="stat-label">Expert Instructors</span>
            </div>
            <div className="stat">
              <span className="stat-number">300+</span>
              <span className="stat-label">Course Hours</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop" alt="Data Science" />
        </div>
      </section>

      {/* Why Learn Data Science Section */}
      <section className="why-learn">
        <h2>Why Learn Data Science in 2024?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">💰</div>
            <h3>High Salaries</h3>
            <p>Data scientists are among the highest-paid professionals with salaries ranging from $80K to $200K+.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🚀</div>
            <h3>High Demand</h3>
            <p>Every industry needs data scientists. From tech to healthcare, finance to retail, opportunities are endless.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🔍</div>
            <h3>Problem Solving</h3>
            <p>Use data to solve real-world problems and make informed decisions that impact millions of people.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🌍</div>
            <h3>Global Impact</h3>
            <p>Shape the future of AI, machine learning, and data-driven decision making across industries.</p>
          </div>
        </div>
      </section>

      {/* Data Science Applications */}
      <section className="datascience-applications">
        <h2>What Can You Do with Data Science?</h2>
        <div className="applications-grid">
          <div className="app-card">
            <div className="app-icon">🏥</div>
            <h3>Healthcare</h3>
            <p>Predict diseases, optimize treatments, and improve patient outcomes with medical data analysis</p>
          </div>
          <div className="app-card">
            <div className="app-icon">💳</div>
            <h3>Finance</h3>
            <p>Detect fraud, predict market trends, and optimize investment strategies</p>
          </div>
          <div className="app-card">
            <div className="app-icon">🛒</div>
            <h3>E-commerce</h3>
            <p>Personalize recommendations, optimize pricing, and improve customer experience</p>
          </div>
          <div className="app-card">
            <div className="app-icon">🚗</div>
            <h3>Transportation</h3>
            <p>Optimize routes, predict maintenance, and develop autonomous vehicles</p>
          </div>
          <div className="app-card">
            <div className="app-icon">🎮</div>
            <h3>Gaming</h3>
            <p>Analyze player behavior, optimize game mechanics, and create AI opponents</p>
          </div>
          <div className="app-card">
            <div className="app-icon">🌱</div>
            <h3>Environment</h3>
            <p>Predict climate patterns, monitor pollution, and optimize renewable energy</p>
          </div>
        </div>
      </section>

      {/* Data Science Process */}
      <section className="datascience-process">
        <h2>The Data Science Process</h2>
        <div className="process-grid">
          <div className="process-step">
            <div className="step-number">1</div>
            <h3>Data Collection</h3>
            <p>Gather data from various sources: databases, APIs, web scraping, sensors, and more</p>
          </div>
          <div className="process-step">
            <div className="step-number">2</div>
            <h3>Data Cleaning</h3>
            <p>Handle missing values, remove duplicates, and ensure data quality and consistency</p>
          </div>
          <div className="process-step">
            <div className="step-number">3</div>
            <h3>Exploratory Analysis</h3>
            <p>Understand data patterns, distributions, and relationships through visualization and statistics</p>
          </div>
          <div className="process-step">
            <div className="step-number">4</div>
            <h3>Feature Engineering</h3>
            <p>Create new features, transform variables, and prepare data for modeling</p>
          </div>
          <div className="process-step">
            <div className="step-number">5</div>
            <h3>Model Building</h3>
            <p>Train machine learning models, tune hyperparameters, and validate performance</p>
          </div>
          <div className="process-step">
            <div className="step-number">6</div>
            <h3>Deployment</h3>
            <p>Deploy models to production, monitor performance, and iterate improvements</p>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="learning-paths">
        <h2>Choose Your Data Science Path</h2>
        <div className="paths-grid">
          <div className="path-card">
            <h3>📊 Data Analyst</h3>
            <p>Master data visualization, SQL, and basic statistics for business intelligence</p>
            <span className="duration">8-12 weeks</span>
            <span className="level">Beginner</span>
          </div>
          <div className="path-card">
            <h3>🤖 Machine Learning Engineer</h3>
            <p>Build and deploy machine learning models for production applications</p>
            <span className="duration">16-20 weeks</span>
            <span className="level">Intermediate</span>
          </div>
          <div className="path-card">
            <h3>🧠 Deep Learning Specialist</h3>
            <p>Master neural networks, computer vision, and natural language processing</p>
            <span className="duration">20-24 weeks</span>
            <span className="level">Advanced</span>
          </div>
          <div className="path-card">
            <h3>📈 Business Intelligence</h3>
            <p>Transform data into actionable insights for strategic decision making</p>
            <span className="duration">12-16 weeks</span>
            <span className="level">Intermediate</span>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="featured-courses">
        <h2>Top-Rated Data Science Courses</h2>
        <div className="courses-grid">
          {dataScienceCourses.map((course) => (
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

      {/* Tools & Technologies */}
      <section className="tools-technologies">
        <h2>Tools & Technologies You'll Master</h2>
        <div className="tools-grid">
          <div className="tool-category">
            <h3>Programming Languages</h3>
            <div className="tool-items">
              <span className="tool-item">Python</span>
              <span className="tool-item">R</span>
              <span className="tool-item">SQL</span>
              <span className="tool-item">Julia</span>
            </div>
          </div>
          <div className="tool-category">
            <h3>Data Manipulation</h3>
            <div className="tool-items">
              <span className="tool-item">Pandas</span>
              <span className="tool-item">NumPy</span>
              <span className="tool-item">dplyr</span>
              <span className="tool-item">DataFrames.jl</span>
            </div>
          </div>
          <div className="tool-category">
            <h3>Visualization</h3>
            <div className="tool-items">
              <span className="tool-item">Matplotlib</span>
              <span className="tool-item">Seaborn</span>
              <span className="tool-item">ggplot2</span>
              <span className="tool-item">Plotly</span>
            </div>
          </div>
          <div className="tool-category">
            <h3>Machine Learning</h3>
            <div className="tool-items">
              <span className="tool-item">Scikit-learn</span>
              <span className="tool-item">TensorFlow</span>
              <span className="tool-item">PyTorch</span>
              <span className="tool-item">Keras</span>
            </div>
          </div>
          <div className="tool-category">
            <h3>Big Data</h3>
            <div className="tool-items">
              <span className="tool-item">Spark</span>
              <span className="tool-item">Hadoop</span>
              <span className="tool-item">Kafka</span>
              <span className="tool-item">Airflow</span>
            </div>
          </div>
          <div className="tool-category">
            <h3>Cloud Platforms</h3>
            <div className="tool-items">
              <span className="tool-item">AWS SageMaker</span>
              <span className="tool-item">Google AI Platform</span>
              <span className="tool-item">Azure ML</span>
              <span className="tool-item">Databricks</span>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="success-stories">
        <h2>Success Stories from Data Science Learners</h2>
        <div className="stories-grid">
          <div className="story-card">
            <div className="story-avatar">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="Dr. Lisa M." />
            </div>
            <div className="story-content">
              <p>"Transitioned from academia to industry. Now leading data science teams at a Fortune 500 company!"</p>
              <h4>Dr. Lisa M.</h4>
              <span>Senior Data Scientist</span>
            </div>
          </div>
          <div className="story-card">
            <div className="story-avatar">
              <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" alt="Alex K." />
            </div>
            <div className="story-content">
              <p>"Built a predictive model that saved my company $2M annually. Data science is truly transformative!"</p>
              <h4>Alex K.</h4>
              <span>ML Engineer</span>
            </div>
          </div>
          <div className="story-card">
            <div className="story-avatar">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="Sarah R." />
            </div>
            <div className="story-content">
              <p>"Started with Python basics, now working on cutting-edge AI research. The possibilities are endless!"</p>
              <h4>Sarah R.</h4>
              <span>AI Researcher</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Unlock the Power of Data?</h2>
          <p>Join millions of data scientists and shape the future with AI and machine learning</p>
          <div className="cta-buttons">
            <button className="primary-btn" onClick={handleBrowseAllCourses}>Browse All Data Science Courses</button>
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

export default DataScienceCourses;
