const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    console.log({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    // jwt.verify("dfsf", )
    jwt.verify(token, "secret", (error, decoded) => {
      if (error) {
        console.log({ msg: 'Token is not valid' });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.log('something wrong with auth middleware');
    console.log({ msg: 'Server Error' });
  }
};