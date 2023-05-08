const express = require('express');
const router = express.Router();
const passport = require('passport');

const AuthController = require('../Controllers/AuthController');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
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
