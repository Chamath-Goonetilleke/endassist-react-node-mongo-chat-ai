// otp-service.js
import nodemailer from "nodemailer";
import crypto from "crypto";

/**
 * Configuration for the email service
 * Replace these with your actual SMTP credentials
 */
const emailConfig = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: "chamathgoonetilleke@gmail.com",
    pass: "jier uoha chgu cabr",
  },
};

/**
 * OTP configuration
 */
const otpConfig = {
  length: 6, // Length of OTP
  expiry: 10 * 60 * 1000, // OTP validity in milliseconds (10 minutes)
};

/**
 * Store OTPs with their expiry time
 * In production, you would use a database instead
 */
const otpStore = new Map();

/**
 * Generate a numeric OTP of specified length
 * @param {number} length - Length of OTP
 * @returns {string} - Generated OTP
 */
function generateOTP(length = otpConfig.length) {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return Math.floor(min + crypto.randomInt(max - min + 1)).toString();
}

/**
 * Send OTP email to user
 * @param {string} email - Recipient email address
 * @param {string} name - Recipient name
 * @returns {Promise<{success: boolean, message: string, otp?: string}>} - Result object
 */
export async function sendOTPEmail(email, name) {
  try {
    // Generate OTP
    const otp = generateOTP();

    // Create transporter
    const transporter = nodemailer.createTransport(emailConfig);

    // Email content
    const mailOptions = {
      from: `"endAssist" <${emailConfig.auth.user}>`,
      to: email,
      subject: "Your Verification Code for endAssist",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #f5f5f5; padding: 20px; text-align: center;">
            <h1 style="color: #333;">endAssist</h1>
          </div>
          <div style="padding: 20px;">
            <p>Hello ${name},</p>
            <p>Your verification code for endAssist is:</p>
            <div style="background-color: #f5f5f5; padding: 10px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
              ${otp}
            </div>
            <p>This code will expire in 10 minutes.</p>
            <p>If you didn't request this code, please ignore this email.</p>
            <p>Thank you,<br>The endAssist Team</p>
          </div>
          <div style="background-color: #f5f5f5; padding: 10px; text-align: center; font-size: 12px; color: #666;">
            <p>This is an automated message, please do not reply to this email.</p>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Store OTP with expiry time
    const expiryTime = Date.now() + otpConfig.expiry;
    otpStore.set(email, { otp, expiryTime });

    return {
      success: true,
      message: "OTP sent successfully"
    };
  } catch (error) {
    console.error("Error sending OTP:", error);
    return {
      success: false,
      message: "Failed to send OTP",
    };
  }
}

/**
 * Verify OTP provided by user
 * @param {string} email - User email
 * @param {string} userOTP - OTP provided by user
 * @returns {boolean} - Whether OTP is valid
 */
export function verifyOTP(email, userOTP) {
  const otpData = otpStore.get(email);

  if (!otpData) {
    return false; // No OTP found for this email
  }

  const { otp, expiryTime } = otpData;

  // Check if OTP has expired
  if (Date.now() > expiryTime) {
    otpStore.delete(email); // Clean up expired OTP
    return false;
  }

  // Verify OTP
  const isValid = otp === userOTP;

  if (isValid) {
    otpStore.delete(email); // Clean up used OTP
  }

  return isValid;
}
