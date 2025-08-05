const { sendOtpEmail } = require('./utils/emailService');

// Test email functionality
async function testEmail() {
  console.log('🧪 Testing email functionality...');
  
  try {
    const result = await sendOtpEmail('test@example.com', '123456', 'verification');
    
    if (result) {
      console.log('✅ Email test successful!');
      console.log('📧 Check your email configuration and try the forgot password or instructor registration flow.');
    } else {
      console.log('❌ Email test failed!');
      console.log('🔧 Please check your email configuration in .env file');
      console.log('📖 See EMAIL_SETUP.md for setup instructions');
    }
  } catch (error) {
    console.error('❌ Email test error:', error.message);
  }
}

// Run test if this file is executed directly
if (require.main === module) {
  testEmail();
}

module.exports = { testEmail }; 