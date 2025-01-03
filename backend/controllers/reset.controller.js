const { sendEmail } = require("../config/nodemailer")
const httpError = require("../middleware/httpError")
const userModel = require("../models/userModel")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken'); // Ensure you have jsonwebtoken installed

const passwordReset = async (req, res, next) => {
  const { email } = req.params;

  try {
    // Find the user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return next(new httpError('No one found with this email. Enter a correct one.', 404));
    }

    // Generate a JWT token with a 1-hour expiration
    const token = jwt.sign(
      { userId: user._id }, // Payload containing the user ID
      'reset', // Secret key (store it securely in environment variables)
      { expiresIn: '4m' } // Token expires in 1 minute
    );

    // Construct the reset link with the token
    const resetLink = `http://localhost:5173/reset-password?token=${token}`;
    // Email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 400px; margin: 0 auto;">
        <h1 style="color: #2c3e50; text-align: center;">Debre Markos University</h1>
        <h2 style="color: #34495e; text-align: center;">Dormitory Student Management System</h2>
        <div style="border-top: 3px solid #2c3e50; margin: 20px 0;"></div>
        <p style="font-size: 16px;">Dear Student,</p>
        <p style="font-size: 16px;">
          You requested a password reset for your account on the <strong>Debre Markos University Dormitory Management System</strong>. 
          For your security, we have provided a secure link to reset your password. Please click the link below to proceed:
        </p>
        <p style="text-align: center; margin: 20px 0;">
          <a href="${resetLink}" style="
            display: inline-block;
            padding: 10px 20px;
            background-color: #3498db;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
          ">
            Reset Password
          </a>
        </p>
        <p style="font-size: 14px; color: #7f8c8d; text-align: center;">
          This link will expire in 1 hour for security purposes. If you did not request this, please ignore this email or contact our support team immediately.
        </p>
        <div style="border-top: 3px solid #2c3e50; margin: 20px 0;"></div>
        <p style="font-size: 14px; color: #7f8c8d;">
          Thank you for using the Debre Markos University Dormitory Management System. Your security is our top priority.
        </p>
        <p style="font-size: 14px; color: #7f8c8d;">
          For any issues, please contact us at <a href="mailto:support@dmudormsystem.edu" style="color: #3498db;">support@dmudormsystem.edu</a>.
        </p>
        <p style="font-size: 14px; color: #7f8c8d;">
          Regards,<br />
          <strong>Debre Markos University Dormitory Management Team</strong>
        </p>
      </div>
    `;

    // Send the email
    await sendEmail(user.email, 'Password Reset Request', emailHtml);

    res.status(200).json({
      message: 'Please check your email. We have sent a link to reset your password.',
      status: 'success',
    });
  } catch (error) {
    next(new httpError(error.message, 500));
  }
};

const changePassword = async (req, res, next) => {

    const { password } = req.body
    const userId = req.userId
    try {
        const user = await userModel.findById(userId)
    
        if (!user) return next(new httpError('No one Found with this Email Enter correct one', 404))
        const salt = await bcrypt.genSalt(10)
        const hashNewPassword = await bcrypt.hash(password, salt)
      await userModel.findByIdAndUpdate(
            user._id,
            { password:hashNewPassword},
            { new: true })
        res.status(200).json({
            message: 'Your password is successfully reset',
            status: 'success'
        })

    } catch (error) {
        next(new httpError(error.message, 500))
    }
}

module.exports = {
    passwordReset,
    changePassword
}