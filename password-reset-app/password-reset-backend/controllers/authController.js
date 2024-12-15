const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('../models/User');

// Setup email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Request password reset
exports.requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const token = crypto.randomBytes(20).toString('hex');
        const expiry = Date.now() + 3600000; // 1 hour

        user.resetPasswordToken = token;
        user.resetPasswordExpires = expiry;
        await user.save();

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;
        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL_USER,
            subject: 'Password Reset Request',
            text: `Click this link to reset your password: ${resetUrl}`,
        };

        transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Reset password
exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
