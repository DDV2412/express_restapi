const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const encode = (data) => jwt.sign(data, secretKey, { expiresIn: 60 * 60 });

const decode = (token) => jwt.verify(token, secretKey);

module.exports = {
  encode,
  decode
}