const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { sendActivationEmail } = require('../utils/mailer');
const crypto = require('crypto');

exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const activationToken = crypto.randomBytes(20).toString('hex');
    const user = new User({ firstName, lastName, email, password, activationToken });

    await user.save();

    await sendActivationEmail(email, activationToken);

    res.status(201).json({ message: 'User registered. Please activate your account via email.' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

exports.activateAccount = async (req, res) => {
  const { token } = req.body;

  try {
    const user = await User.findOne({ activationToken: token });
    if (!user) return res.status(400).json({ message: 'Invalid activation token' });

    user.isActive = true;
    user.activationToken = null;
    await user.save();

    res.status(200).json({ message: 'Account activated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error activating account', error: error.message });
  }
};
