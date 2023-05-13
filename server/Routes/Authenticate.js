const express = require('express');
const router = express.Router();
const passport = require('passport');
const { body } = require('express-validator');

const User = require('../Models/User');
const bcrypt = require('bcryptjs');

const AuthController = require('../Controllers/AuthController');

router.post(
  '/register',
  [
    body('email', 'Invalid email format.')
      .isEmail()
      .custom(async (email, { req }) => {
        const userData = await User.findOne({ email });
        if (userData) {
          throw new Error('E-mail address already exists.');
        }
      }),
    body('password', 'Invalid password.')
      .isLength({ min: 5 })
      .custom((password, { req }) => {
        if (password !== req.body.confirmPassword) {
          throw new Error('Passwords have to match.');
        }
        return true;
      }),
  ],
  AuthController.register
);
router.post(
  '/login',
  [
    body('email', 'Wrong email.')
      .isEmail()
      .custom(async (email, { req }) => {
        const userData = await User.findOne({ email });
        if (!userData) {
          throw new Error('User not found.');
        }
      }),
    body('password', 'Wrong password.')
      .trim()
      .notEmpty()
      .custom(async (password, { req }) => {
        const userData = await User.findOne({ email: req.body.email });
        const passwordMatch = await bcrypt.compare(password, userData.password);
        if (!passwordMatch) {
          throw new Error('Wrong password.');
        }
      }),
  ],
  AuthController.login
);
router.post('/refresh-token', AuthController.refreshToken);

// Google
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = req.user.token;
    const refreshToken = req.user.refreshToken;
    req.user
      ? res.redirect(
          `http://localhost:3000/login?token=${token}&refreshToken=${refreshToken}`
        )
      : res.redirect('http://localhost:3000/login');
  }
);

module.exports = router;
