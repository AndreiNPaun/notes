const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    console.log(token);
    req.user = decode;

    next();
  } catch (error) {
    if (error.name == 'TokenExpiredError') {
      res.status(401).json({
        message: 'Token Expired.',
      });
    } else {
      console.log(error);
      res.json({
        message: 'Authentication failed.',
      });
    }
  }
};

module.exports = authenticate;
