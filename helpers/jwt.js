const jwt = require("jsonwebtoken");

const encode = (data) =>
  jwt.sign(data, process.env.JWT_SECRET || "rahasia", { expiresIn: "1h" });

const decode = (token) =>
  jwt.verify(token, process.env.JWT_SECRET || "rahasia");

module.exports = {
  encode,
  decode,
};
