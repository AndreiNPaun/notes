const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
    if (err) {
      res.json({
        error: err,
      });
    }

    let user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    user
      .save()
      .then((user) => {
        res.json({
          message: 'User registered.',
        });
      })
      .catch((e) => {
        res.json({
          message: 'An error has occured.',
        });
      });
  });
};

const login = (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  // if email or phone is submited as username it will look for the user record in the db
  User.findOne({ $or: [{ email: username }, { username: username }] }).then(
    (user) => {
      if (user) {
        // compares entered password with the stored encrypted password
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            res.json({
              error: err,
            });
          }

          // if sucessfull it create a token
          if (result) {
            let token = jwt.sign({ name: user.name }, 'secret', {
              expiresIn: '1h',
            });

            let refreshToken = jwt.sign({ name: user.name }, 'refresh', {
              expiresIn: '48h',
            });
            res.json({
              message: 'Login Successful!',
              token,
              refreshToken,
            });
          } else {
            res.json({
              message: 'Wrong password.',
            });
          }
        });
        // if it cannot find a record it will return error
      } else {
        res.json({ message: 'User not found.' });
      }
    }
  );
};

// const refreshToken = (req, res, next) => {
//   const refreshToken = req.body.refreshToken;
//   jwt.verify(refreshToken, 'refresh', (err, decode) => {
//     if (err) {
//       res.status(400).json({
//         err,
//       });
//     } else {
//       let token = jwt.sign({ name: decode.name }, 'token', {
//         expiresIn: '48h',
//       });
//       let refreshToken = req.body.refreshToken;
//       res.status(200).json({
//         message: 'Token refreshed successfully!',
//         token,
//         refreshToken,
//       });
//     }
//   });
// };

module.exports = {
  register,
  login,
  //   refreshToken,
};
