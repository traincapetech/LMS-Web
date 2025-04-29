const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use environment variable if available, otherwise use the direct connection string with CRM database
    const mongoUri = process.env.MONGODB_URI || 
      'mongodb+srv://traincape:parichay@traincapetechnology.1p6rbwq.mongodb.net/CRM?retryWrites=true&w=majority&appName=TraincapeTechnology';
    
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB; 