const express = require('express');
const router = express.Router();
const passport = require('passport');

const AuthController = require('../Controllers/AuthController');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/refresh-token', AuthController.refreshToken);

// Routes
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

router.get(
  '/login/microsoft',
  passport.authenticate('microsoft', {
    // Optionally define any authentication parameters here
    // For example, the ones in https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow

    prompt: 'select_account',
  })
);

router.get(
  '/login/microsoft/callback',
  passport.authenticate('microsoft', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    //res.redirect('/');
  }
);

module.exports = router;
