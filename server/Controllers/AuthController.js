const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
  try {
    const existingEmail = await User.findOne({ email: req.body.email });
    const exisingUsername = await User.findOne({ username: req.body.email });

    if (existingEmail) {
      return res.json({
        error: 'Email already exists',
      });
    }

    if (exisingUsername) {
      return res.json({
        error: 'Username already exists',
      });
    }

    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    await user.save();
    res.json({
      message: 'User registered',
    });
  } catch (err) {
    res.json({
      error: 'An error has occured.',
    });
  }
};

const login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.json({ message: 'User not found.' });
    }

    const passwordMatch = bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.json({ message: 'Wrong password.' });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME }
    );

    const refreshToken = jwt.sign(
      { email: user.email, id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME }
    );

    res.json({ message: 'Login Successful!', token, refreshToken });
  } catch (error) {
    res.json({ error: `An error has occured: ${error}` });
  }
};

const refreshToken = (req, res, next) => {
  try {
    const refreshToken = req.body.refreshToken;
    const verify = jwt.verify(refreshToken, process.env.Refresh_TOKEN_SECRET);
    const token = jwt.sign(
      { email: verify.email, id: verify._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME }
    );
    res.json({
      message: 'Token refreshed successfully',
      token,
      refreshToken,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};

module.exports = {
  register,
  login,
  refreshToken,
};
