const jwt = require('jsonwebtoken');
const SECRET_KEY = 'a-sample-key';
const signToken = (payload, options = { expiresIn: '1h' }) => {
  return jwt.sign(payload, SECRET_KEY, options);
};
const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};
module.exports = { signToken, verifyToken };