

import User from '../models/User.js';
import ResetToken from '../models/ResetToken.js';
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config();

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    
    const user = await User.findOne({ "username":email});
    console.log('user',user)
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
   
    const token = crypto.randomBytes(20).toString('hex');
    const expiresAt = Date.now() + 3600000; // 1 hour

    await ResetToken.create({
      userId: user._id,
      token,
      expiresAt
    });

    const resetUrl = `${req.protocol}://${req.get('host')}/auth/resetPassword/${token}`;

    // Enviar correo electrónico
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: user.username,
      subject: 'Password Reset',
      text: `Please use the following link to reset your password: ${resetUrl}`
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Email sent' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, err:"no se pudo enviar el correo" });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  console.log(req.params)
  try {
    const resetToken = await ResetToken.findOne({ token, expiresAt: { $gt: Date.now() } });
    if (!resetToken) {
      return res.status(400).json({ success: false, error: 'Invalid or expired token' });
    }

    const user = await User.findById(resetToken.userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    user.password = password;
    await user.save();
    await ResetToken.deleteOne({ _id: resetToken._id });

    res.status(200).json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
