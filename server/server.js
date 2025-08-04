const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const User = require('./models/User');
const bcrypt = require('bcryptjs');

dotenv.config();

// Debug environment variables
console.log('🔍 Environment variables check:');
console.log('MONGO_URI:', process.env.MONGO_URI ? '✅ Set' : '❌ Not set');
console.log('PORT:', process.env.PORT || '5000 (default)');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Not set');

// Initialize server after environment variables are loaded
const initializeServer = async () => {
  try {
    console.log('🔄 Attempting to connect to MongoDB...');
    await connectDB();
    console.log('🔄 Setting up admin user...');
    await ensureAdminUser();
    console.log('✅ Server initialization complete');
  } catch (error) {
    console.error('❌ Server initialization failed:', error.message);
    console.log('🔄 Retrying in 5 seconds...');
    setTimeout(initializeServer, 5000);
  }
};

// Start server initialization
initializeServer();

async function ensureAdminUser() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@traincape.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  let admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    admin = new User({
      name: 'Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
    });
    await admin.save();
    console.log('✅ Admin user created');
  } else {
    admin.password = hashedPassword;
    admin.role = 'admin';
    await admin.save();
    console.log('✅ Admin user password and role updated');
  }
}

const app = express();
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use('/uploads', express.static('uploads'));
app.use('/api/upload', require('./routes/uploadRoutes'));

// Routes
app.use("/api", require("./routes/otpRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/instructor-requests", require("./routes/instructorRequestRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/pending-courses", require("./routes/pendingCourseRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/coupons", require("./routes/couponRoutes"));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
