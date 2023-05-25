const express = require('express');
const router = express.Router();
const passport = require('passport');
const { body } = require('express-validator');

const AuthController = require('../Controllers/AuthController');

router.post(
  '/register',
  [
    body('email', 'Invalid email format.').isEmail(),
    body('password', 'Password needs to be at least 5 characters long.')
      .isLength({ min: 5 })
      .custom((password, { req }) => {
        if (password !== req.body.confirmPassword) {
          throw new Error('Passwords do not match.');
        }
        return true;
      }),
  ],
  AuthController.register
);
router.post(
  '/login',
  [
    body('email', 'User not found.').isEmail(),
    body('password', 'Wrong password.').trim().notEmpty(),
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
      ? res
          .status(302)
          .redirect(
            `http://localhost:3000/login?token=${token}&refreshToken=${refreshToken}`
          )
      : res.status(401).redirect('http://localhost:3000/login');
  }
);

module.exports = router;
