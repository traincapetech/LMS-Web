import React, { useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Plans from "./Pages/Plans";
import Home from "./Pages/Home";
import Teach from "./Pages/teach";
import Signup from "./Pages/Signup";
import Login from "./Pages/login";
import Footer from "./components/Footer";
import Form from "./Pages/Form";
import Create from "./Pages/Create";
import Dashboard from "./Pages/Dashboard";   
import SubPages from "./Pages/subPages";
import IBMPages from "./Pages/IBMPages";
import "./App.css";
import Html from "./CourseContent/Html";
import Cart from "./Pages/Cart";
import Payment from "./Pages/Payment";
import C from "./CourseContent/C";
import AdminDashboard from "./Pages/AdminDashboard";
import PendingCourseDetails from "./Pages/PendingCourseDetails";
import Courses from "./Pages/Courses";
import InstructorDashboard from "./Pages/InstructorDashboard";
import AdminInstructors from "./Pages/AdminInstructors";
import AdminCoupons from "./Pages/AdminCoupons";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import OtpVerification from "./Pages/OtpVerification";
import SetNewPassword from "./Pages/SetNewPassword";
import CourseDetails from "./Pages/CourseDetails";

// Cart context setup
export const CartContext = createContext();

// Placeholder pages for profile and dropdown menu

const MyLearning = () => <div style={{padding:'2rem'}}>My Learning Page</div>;
const Wishlist = () => <div style={{padding:'2rem'}}>Wishlist Page</div>;
const Notifications = () => <div style={{padding:'2rem'}}>Notifications Page</div>;
const Messages = () => <div style={{padding:'2rem'}}>Messages Page</div>;
const AccountSettings = () => <div style={{padding:'2rem'}}>Account Settings Page</div>;
const PaymentMethods = () => <div style={{padding:'2rem'}}>Payment Methods Page</div>;
const Subscriptions = () => <div style={{padding:'2rem'}}>Subscriptions Page</div>;
const Credits = () => <div style={{padding:'2rem'}}>Credits Page</div>;
const PurchaseHistory = () => <div style={{padding:'2rem'}}>Purchase History Page</div>;
const PublicProfile = () => <div style={{padding:'2rem'}}>Public Profile Page</div>;
const Profile = () => <div style={{padding:'2rem'}}>Profile Page</div>;
const Settings = () => <div style={{padding:'2rem'}}>Settings Page</div>;

function App() {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Calculate total cart count from both local state and localStorage
  const getCartCount = () => {
    const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
    return cart.length + localCart.length;
  };

  // Update cart count when cart changes
  React.useEffect(() => {
    setCartCount(getCartCount());
  }, [cart]);

  // Listen for localStorage changes
  React.useEffect(() => {
    const handleStorageChange = () => {
      setCartCount(getCartCount());
    };

    const handleCustomCartChange = () => {
      setCartCount(getCartCount());
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cartUpdated', handleCustomCartChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCustomCartChange);
    };
  }, []);

  const addToCart = (course) => {
    setCart((prev) => {
      // Prevent duplicates by title
      if (prev.find((item) => item.title === course.title)) return prev;
      const newCart = [...prev, course];
      // Dispatch custom event to update cart count
      setTimeout(() => window.dispatchEvent(new Event('cartUpdated')), 0);
      return newCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, setCart }}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar cartCount={cartCount} />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/teach" element={<Teach />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/form" element={<Form />} />
              <Route path="/create" element={<Create />} />
              <Route path="/dashboard" element={<Dashboard />} /> {/* ✅ ADD THIS ROUTE */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/pending-course/:id" element={<PendingCourseDetails />} />
              <Route path="/admin/instructors" element={<AdminInstructors />} />
              <Route path="/admin/coupons" element={<AdminCoupons />} />
              <Route path="/subpage" element={<SubPages />} />
              <Route path="/ibm" element={<IBMPages />} />
              <Route path="/html" element={<Html />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/c" element={<C />} />
              <Route path="/cpp" element={<div style={{padding: '2rem', textAlign: 'center'}}>Page not available yet!</div>} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
              <Route path="/verify-otp" element={<OtpVerification />} />
              <Route path="/set-new-password" element={<SetNewPassword />} />
              <Route path="/course/:id" element={<CourseDetails />} />
              {/* Profile and dropdown menu routes */}
              <Route path="/my-learning" element={<MyLearning />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/settings" element={<AccountSettings />} />
              <Route path="/payment-methods" element={<PaymentMethods />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/credits" element={<Credits />} />
              <Route path="/purchase-history" element={<PurchaseHistory />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/public-profile" element={<PublicProfile />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </CartContext.Provider>
  );
}

export default App;
