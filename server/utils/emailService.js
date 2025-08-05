const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password'
  }
});

// Send OTP email
const sendOtpEmail = async (email, otp, purpose = 'verification') => {
  try {
    const subject = purpose === 'password-reset' 
      ? 'Password Reset OTP - Traincape LMS'
      : 'Email Verification OTP - Traincape LMS';
    
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Traincape LMS</h1>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-bottom: 20px; text-align: center;">
            ${purpose === 'password-reset' ? 'Password Reset Request' : 'Email Verification'}
          </h2>
          
          <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
            ${purpose === 'password-reset' 
              ? 'You have requested to reset your password. Use the OTP below to complete the process:'
              : 'Thank you for registering! Please use the OTP below to verify your email address:'
            }
          </p>
          
          <div style="background: #fff; border: 2px solid #667eea; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
            <h1 style="color: #667eea; font-size: 36px; margin: 0; letter-spacing: 5px; font-weight: bold;">${otp}</h1>
          </div>
          
          <p style="color: #666; font-size: 14px; text-align: center; margin-top: 20px;">
            This OTP will expire in 10 minutes for security reasons.
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
            <p style="color: #999; font-size: 12px;">
              If you didn't request this, please ignore this email.
            </p>
          </div>
        </div>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: email,
      subject: subject,
      html: htmlContent
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent successfully to ${email}`);
    return true;
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    return false;
  }
};

module.exports = { sendOtpEmail }; 